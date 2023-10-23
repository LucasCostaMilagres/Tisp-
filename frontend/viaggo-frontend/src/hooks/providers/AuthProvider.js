import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { generateCode, login, verifyMfa } from "../../services/user.services";

const defaultContext = {
    canLogin: null,
    loginUsed: "",
    auth: (data) => { },
    goToHome: () => { },
    goToForgotPassword: () => { },
    goToRegister: () => { }
};

export const AuthContext = createContext(defaultContext);

export const AuthProvider = ({ children }) => {
    const [canLogin, setCanLogin] = useState(null);
    const [loginUsed, setLoginUsed] = useState("");

    const navigate = useNavigate();

    const handleMfa = async (login) => {
        navigate("/mfa");
        await generateCode({ login });
    }

    const auth = async (data) => {
        setCanLogin(null);

        const request = await login(data);

        const hasMfa = await verifyMfa(data.login);

        setLoginUsed(data.login);

        if (request === true) {
            if (hasMfa === true) {
                handleMfa(data.login);
            }
            else {
                navigate("/home");
            }
        }

        setCanLogin(request);
    };

    const goToForgotPassword = () => navigate("/forgotPassword");

    const goToRegister = () => navigate("/register");

    const goToHome = () => navigate("/home");

    return <AuthContext.Provider value={{ canLogin, loginUsed, auth, goToHome, goToForgotPassword, goToRegister }}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};
