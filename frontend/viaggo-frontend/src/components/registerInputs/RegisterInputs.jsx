import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/user.services";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const RegisterInputs = ({ goToLogin }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [typePasswordInput, setTypePasswordInput] = useState("password");
    const [click, setClick] = useState(false);

    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [focus, setFocus] = useState(false)
    const [placeholder, setPlaceholder] = useState('SENHA')

    const handleRegister = async (event) => {
        event.preventDefault();

        const credenciais = {
            name: nameInput,
            email: emailInput,
            cpf: cpfInput,
            password: passwordInput
        }

        const createUser = await registerUser(credenciais);
        if (createUser === true) {
            goToLogin(true)
            toast.success('Usuário criado com sucesso!')
        }
        else {  
            toast.error(createUser)
        }
    }

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }
    
    useEffect(() => {
        if (isPasswordVisible)
            setTypePasswordInput("text");
        else
            setTypePasswordInput("password");
    }, [isPasswordVisible])

    return <>
        <header className="titles-container">
            <h1 className="title">REALIZE SEU CADASTRO</h1>
        </header>
        <form>
            <section className="login-container">
                <div className="input-container">
                    <input className="input" type="nome" placeholder="NOME" onChange={(e) => setNameInput(e.target.value)} />
                    <input className="input" type="email" placeholder="E-MAIL" onChange={(e) => setEmailInput(e.target.value)} />
                    <input className="input" type="cpf" placeholder="CPF" onChange={(e) => setCpfInput(e.target.value)} />
                    <div className="password-input-container">
                        <input
                            className="input"
                            type={typePasswordInput}
                            onMouseEnter={() => {
                                setFocus(true)
                                setPlaceholder('Necessário: letra maiúscula, minúscula, número, +7 caracteres')
                            }}
                            onMouseLeave={() => {
                                setFocus(false)
                                setPlaceholder('SENHA')
                            }}
                            placeholder={placeholder}
                            style={focus ? { fontSize: '1rem' } : null}
                            onChange={(e) => setPasswordInput(e.target.value)} />
                        <div onClick={handlePasswordVisibility}>
                            {
                                isPasswordVisible ?
                                    <Visibility className="icon" />
                                    :
                                    <VisibilityOff className="icon" />
                            }
                        </div>
                    </div>
                </div>
            </section>
            <div className="button-container3">
                <button onClick={(event) => handleRegister(event)} className="button-login">CADASTRAR</button>
            </div>
        </form>
    </>
}

export default RegisterInputs
