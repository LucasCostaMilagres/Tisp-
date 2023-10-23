import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import "./style.css"

const Card = ({ children, goToLogin }) => {

    const [hasNavigation, setHasNavigation] = useState(false)

    useEffect(() => {
        if (goToLogin !== undefined) {
            setHasNavigation(true)
        }
        else {
            setHasNavigation(false)
        }
    }, [goToLogin])

    return <div className="container">
        <div className="card-container">
            <figure className="logo-container">

                <button onClick={goToLogin} className="voltar" style={hasNavigation ? null : { color: "#FFFFED", cursor: "initial" }}>
                    {hasNavigation ? <span>Voltar</span> : <span></span>}
                </button>

                <img src={logo} className="logo" alt="Logo TISP" />
            </figure>
            <div className="details-container">
                <div className="line" />
            </div>
            <main className="data-container">
                {children}
            </main>
        </div>

    </div>

}

export default Card
