import React, { useState } from "react";
import { useLabels } from "../hooks/useLanguage";
import { useStyles } from "../hooks/useStyles";
import IonIcon from "@reacticons/ionicons";
import { FirestoreMethods } from "../services/fireBaseMethods";
import { useToast } from "../context/toastContext/toastContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../redux/authReducer";
export const LoginComponent = ({ isSignUp }: { isSignUp: any }) => {
    const styles = useStyles();
    const labels = useLabels();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    return (
        <div className="w-1/2 h-1/2  animate-enterFromLeft my-24  pb-5 border-2 justify-center items-center  rounded-3xl bg-white"  >
            <h3 className=" text-xl font-semibold border-b-2 pb-3 text-center mt-5" style={{ fontFamily: styles.fonts.primary, color: styles.colors["blue-500"] }}>{labels.logIn}</h3>
            <div className="flex-row text-center justify-center items-center  w-full mt-2 sm:mt-4" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.user}</h4>
                <input
                    type="text"
                    placeholder={labels.user}
                    className="border-2 w-48 rounded-lg p-2 "
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div className="flex-row text-center justify-center items-center  w-full mt-3" style={{ fontFamily: styles.fonts.text }}>
                <h4 className="mb-2">{labels.pass}</h4>
                <div className="relative w-48 mx-auto">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder={labels.pass}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="border-2 w-48 rounded-lg p-2 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-1 flex items-center px-3 bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <IonIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
                    </button>
                </div>
            </div>
            <p className="text-red-500 animate-enterFromBack h-5 text-sm text-center  mt-2">{errorMessage}</p>
            <div className="sm:flex sm:mt-5 flex-row text-center justify-center items-center  w-full mt-2" style={{ fontFamily: styles.fonts.text }}>
                <button className="block sm:inline-block mx-auto sm:mx-0  text-white  p-3 rounded-full" style={{ backgroundColor: styles.colors["blue-500"] }} onClick={handleLogin}>
                    {labels.logIn}
                </button>
                <h4 onClick={isSignUp} className="sm:ml-5 mt-3 text-sm  cursor-pointer inline-block border-b-2 px-2 pb-1" >{labels.singUpHere}</h4>
            </div>
        </div>
    );
}
