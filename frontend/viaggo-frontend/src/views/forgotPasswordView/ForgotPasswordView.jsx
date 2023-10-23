import { useNavigate } from "react-router"
import Card from "../../components/card/Card"
import ForgotPasswordInput from "../../components/forgotPasswordInput/forgotPasswordInput"
import "./styles.css"

const ForgotPasswordView = () => {

    const navigate = useNavigate()

    return <Card goToLogin={() => navigate('/login')}>
        <ForgotPasswordInput
            goToLogin={() => navigate('/code')}
        />
    </Card>
}

export default ForgotPasswordView
