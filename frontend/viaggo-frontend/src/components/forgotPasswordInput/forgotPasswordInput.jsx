import "./style.css"

const ForgotPasswordInput = ({ goToLogin }) => {

    return <>
        <header className="titles-container">
            <h1 className="welcome-title">INSIRA SEU E-MAIL</h1>
            <h2 className="title">PARA RECUPERAR SUA SENHA</h2>
        </header>
        <form>
            <section className="login-container2">
                <div className="input-container">
                    <input className="input" type="email" placeholder="E-MAIL" />
                </div>
            </section>
            <div className="button-container2">
                <button onClick={goToLogin} className="button-login">ENVIAR CÓDIGO</button>
            </div>
        </form>
    </>

}

export default ForgotPasswordInput
