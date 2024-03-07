import { LoginComponent } from "../../components/loginComponent/LoginComponent";
import { SignUpComponent } from "../../components/signUpComponent/SignUpComponent";
import { useLoginPageLogic } from "./useLoginPageLogic";

export function LoginPage() {
    const { styles, isSignUp, handleLogin } = useLoginPageLogic();

    return (
        <div className={`w-full ${isSignUp ? '' : 'h-screen'} flex justify-center`} style={{ backgroundColor: styles.colors["blue-100"] }}>
            {isSignUp ? <SignUpComponent isSignIn={handleLogin} /> : <LoginComponent isSignUp={handleLogin} />}
        </div>
    );
}
