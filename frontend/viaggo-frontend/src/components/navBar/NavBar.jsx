import logo from "../../assets/logo.png"
import { AccountCircle } from "@mui/icons-material";
import "./style.css"

const NavBar = ({ goToHome, goToLogin }) => {
    return <div className="container-navbar">
        <nav className="navbar">
            <a onClick={goToHome}>
                <img src={logo} className="logo-navbar" alt="Logo ViagGo" />
            </a>
            <div className="main-items">
                <a className="item">
                    Ofertas
                </a>
                <a className="item">
                    Minhas Viagens
                </a>
            </div>
            <div className="user-quit-items">
                <AccountCircle className="icon-user" />
                <a className="item">
                    Nome Usuário
                </a>
                <a className="item" onClick={goToLogin}>
                    Sair
                </a>
            </div>
        </nav>
        <div className="orange-line" />
    </div>
}

export default NavBar
