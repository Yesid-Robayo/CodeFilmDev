import { useState } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { useStyles } from "../hooks/useStyles";
import { SignUpComponent } from "../components/SignUpComponent";

export function LoginPage() {
    const styles = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = () => {
        setIsSignUp(!isSignUp);
 
        window.scrollTo(0, 0);
    }

    return (
        <div className={`w-full ${isSignUp?'':'h-screen'} flex justify-center`} style={{ backgroundColor: styles.colors["blue-100"] }}>
            {isSignUp ? <SignUpComponent isSignIn={handleLogin} /> : <LoginComponent isSignUp={handleLogin} />}
        </div>
    );
}
