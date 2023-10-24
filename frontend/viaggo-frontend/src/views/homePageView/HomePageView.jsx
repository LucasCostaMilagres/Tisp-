import { useNavigate } from "react-router"
import HomePage from "../../components/homePage/HomePage"
import NavBar from "../../components/navBar/NavBar"

const HomePageView = () => {

    const navigate = useNavigate()

    return <div>
        {/* <NavBar
            goToHome={() => navigate('/home')}
            goToLogin={() => navigate("/login")}
        /> */}

        <HomePage 
            goToLogin={() => navigate('/login')}
        />
    </div>
}

export default HomePageView
