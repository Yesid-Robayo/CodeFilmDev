import { useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useLabels, useLoadingContext, useStyles, useToast } from "../../hooks/contextHooks";

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
    const { startLoading, stopLoading } = useLoadingContext();
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
        startLoading();
        setErrorMessage("");
        if (username === "" || email === "" || name === "" || dateOfBirth === "" || password === "" || confirmPassword === "") {
            setErrorMessage(labels.completeAllFields);
            stopLoading(); // Asegúrate de detener la carga si hay un error.
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage(labels.notMatchpass);
            stopLoading();
            return;
        }
        if (!isEmailValid(email)) {
            setErrorMessage(labels.invalidEmail);
            stopLoading();
            return;
        }
    
        try {
            // Comprobar si el nombre de usuario ya existe
            let userResponse = await FirestoreMethods.searchStorageFile("users", "username", username);
            if (userResponse.success && userResponse.data.length > 0) {
                setErrorMessage(labels.alReadyExistUserName);
                stopLoading();
                return;
            }
    
            // Comprobar si el correo electrónico ya existe
            let emailResponse = await FirestoreMethods.searchStorageFile("users", "email", email);
            if (emailResponse.success && emailResponse.data.length > 0) {
                setErrorMessage(labels.alReadyExistEmail);
                stopLoading();
                return;
            }
    
            // Si pasa las comprobaciones, proceder a registrar el usuario
            const response = await FirestoreMethods.addStorageFile("users", {
                username,
                email,
                name,
                dateOfBirth,
                password, // Asegúrate de manejar adecuadamente las contraseñas, preferiblemente no almacenando contraseñas en texto plano.
            });
    
            if (response.success) {
                isSignIn(); // Asegúrate de que esta función maneje correctamente la sesión del usuario.
                toast.showToast(labels.creationUserCorrect);
            } else {
                console.log(response.error);
                toast.showToast(labels.errorCreationUser);
            }
        } catch (error) {
            console.error(error);
            toast.showToast(labels.errorCreationUser);
        } finally {
            stopLoading();
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
