import { useState } from "react";
import { useStyles } from "../../hooks/useStyles";
import { useLabels } from "../../hooks/useLanguage";
import { useToast } from "../../context/toastContext/toastContext";
import { FirestoreMethods } from "../../services/fireBaseMethods";

export const useSignUpComponentLogic = ({ isSignIn }: { isSignIn: any }) => {
    const styles = useStyles();
    const labels = useLabels();
    const toast = useToast();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const updateUser = (user: string) => {
        setUsername(user);
    };

    const updateEmail = (emailValue: string) => {
        setEmail(emailValue);
    };

    const updateName = (nameValue: string) => {
        setName(nameValue);
    };

    const updateDateOfBirth = (dateValue: string) => {
        setDateOfBirth(dateValue);
    };

    const updatePassword = (pass: string) => {
        setPassword(pass);
    };

    const updateConfirmPassword = (confirmPass: string) => {
        setConfirmPassword(confirmPass);
    };

    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const changeShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const isEmailValid = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSignUp = async () => {
        setErrorMessage("");
        if (username === "" || email === "" || name === "" || dateOfBirth === "" || password === "" || confirmPassword === "") {
            setErrorMessage(labels.completeAllFields);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage(labels.notMatchpass);
            return;
        }
        if (!isEmailValid(email)) {
            setErrorMessage(labels.invalidEmail);
            return;
        }

        try {
            const response = await FirestoreMethods.addStorageFile("users", {
                username,
                email,
                name,
                dateOfBirth,
                password,
            });

            if (response.success) {
                isSignIn();
                toast.showToast(labels.creationUserCorrect);
            } else {
                console.log(response.error);
                toast.showToast(labels.errorCreationUser);
            }
        } catch (error) {
            console.error(error);
            toast.showToast(labels.errorCreationUser);
        }
    };

    return {
        styles,
        labels,
        username,
        updateUser,
        email,
        updateEmail,
        name,
        updateName,
        dateOfBirth,
        updateDateOfBirth,
        password,
        updatePassword,
        confirmPassword,
        updateConfirmPassword,
        showPassword,
        changeShowPassword,
        showConfirmPassword,
        changeShowConfirmPassword,
        errorMessage,
        handleSignUp,
    };
};
