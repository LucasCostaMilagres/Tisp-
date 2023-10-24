import { useEffect, useState } from "react"
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
            <main className="data-container">
                <button onClick={goToLogin} className="voltar" style={hasNavigation ? null : { color: "#FFFFED", cursor: "initial" }}>
                    {hasNavigation ? <span>Voltar</span> : <span></span>}
                </button>
                {children}
            </main>
        </div>

    </div>

}

export default Card
