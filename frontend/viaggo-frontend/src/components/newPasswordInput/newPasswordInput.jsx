import "./style.css";

const newPasswordInput = ({goToLogin}) => {

  return <>
      <header className="titles-container">
        <h1 className="welcome-title">INSIRA SUA NOVA SENHA</h1>
      </header>
      <form>
        <section className="senha-container">
          <div className="input-container">
            <input classname="input" type="password" placeholder="NOVA SENHA"/>
            <input classname="input" type="password" placeholder="CONFIRMAR NOVA SENHA"/>
          </div>
        </section>
        <div className="button-container2">
          <button onClick={goToLogin} className="button-senha">ALTERAR SENHA</button>
        </div>
      </form>
  </>
}

export default newPasswordInput