import { useState } from "react";
import { useStyles } from "../../hooks/contextHooks";

export const useLoginPageLogic = () => {
    const styles = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = () => {
        setIsSignUp(!isSignUp);
 
        
        window.scrollTo(0, 0);
    }


    return {
        styles,
        isSignUp,
        handleLogin
    }
}