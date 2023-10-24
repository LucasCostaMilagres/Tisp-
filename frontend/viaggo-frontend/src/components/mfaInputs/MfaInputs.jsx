import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/providers/AuthProvider";
import { authCode, generateCode } from "../../services/user.services";
import "./style.css";

const MfaInputs = () => {

    const [number, setNumber] = useState(0);
    const [timer, setTimer] = useState(null);

    const { loginUsed, goToHome } = useAuth();

    const handleGenerateCode = async (event) => {
        event.preventDefault();

        const body = {
            login: loginUsed
        }

        const request = await generateCode(body);

        if (request.status === 200) {
            toast.success(request.data);
        }

        else {
            toast.error(request.data);
        }
    }

    const handleConfirmCode = async (event) => {
        event.preventDefault();

        const body = {
            code: number
        }

        const request = await authCode(body);

        if (request.status === 200) {
            goToHome();
        }

        else {
            toast.error(request.data);
        }
    }

    useEffect(() => {
        const fiveMinutes = 300000;

        const time = async () => {
            setTimeout(() => {
                setTimer(true);
            }, fiveMinutes);
        }

        time();

        console.log("Para saber qual token utilizar, rode: ")
        console.log("(GET) 'http://localhost:5000/get-mfa-user' - sem query/body")
    }, []);

    return <>
        <header className="titles-container">
            <h1 className="welcome-title">DUPLA AUTENTICAÇÃO</h1>
            <h2 className="title">INSIRA O CÓDIGO PARA PROSSEGUIR</h2>
            <p className="info">(Para saber o código, abra o console)</p>
        </header>
        <form>
            <section className="login-container2">
                <div className="input-container2">
                    <input className="input" onChange={(e) => setNumber(e.target.value)} inputMode="numeric" maxLength={6} />
                </div>
                {
                    timer && <div>
                        <button onClick={handleGenerateCode} className="button-generate-code">GERAR OUTRO CÓDIGO</button>
                    </div>
                }

            </section>
            <div className="button-container2">
                <button className="button-login" onClick={handleConfirmCode}>CONFIRMAR</button>
            </div>
        </form>
    </>
}

export default MfaInputs;
