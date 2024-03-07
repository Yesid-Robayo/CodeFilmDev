import { useState } from "react";
import { FirestoreMethods } from "../../services/fireBaseMethods";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../../redux/reducers/authReducer";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";

export const useLoginComponentLogic = () => {
    const styles = useStyles();
    const labels = useLabels();
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

   
    const updateUser = (user: string) => {
        setUser(user);
    }
    const updatePass = (pass: string) => {
        setPass(pass);
    }
    const  changeShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleLogin = async () => {
        setErrorMessage("");
        if (user === "" || pass === "") {
            setErrorMessage("Por favor ingresa usuario y contraseña.");
            return;
        }
        try {
            const searchResult = await FirestoreMethods.searchStorageFile("users", "username", user);

            if (searchResult.success && searchResult.data.length > 0) {

                const userData = searchResult.data[0].data;

                if (userData.password === pass) {
                    dispatch(authReducer.actions.login(userData));
                    navigate("/home")
                    toast.showToast(labels.logInCorrect);
                } else {
                    setErrorMessage(labels.passIsError)
                }
            } else {
                setErrorMessage(labels.userNotEncounter)
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(labels.errorTryAgain);
        }
    };

    return {
        styles,
        labels,
        user,
        updatePass,
        pass,
        updateUser,
        showPassword,
        changeShowPassword,
        errorMessage,
        handleLogin,
    };
};
