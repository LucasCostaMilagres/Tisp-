import "./style.css";

const insertCodeInput = ({goToLogin}) => {

  return <>
      <header className="titles-container">
        <h1 className="welcome-title">INSIRA SEU CÓDIGO DE RECUPERAÇÃO</h1>
      </header>
      <form>
        <section className="codigo-container">
          <div className="input-container">
            <input classname="input" type="text" placeholder="CÓDIGO DE CONFIRMAÇÃO"/>
          </div>
        </section>
        <div className="button-container2">
          <button onClick={goToLogin} className="button-codigo">CONFIRMAR</button>
        </div>
      </form>
  </>
}

export default insertCodeInput
