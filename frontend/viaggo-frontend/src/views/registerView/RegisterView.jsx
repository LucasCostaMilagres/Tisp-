import { useNavigate } from "react-router"
import Card from "../../components/card/Card"
import RegisterInputs from "../../components/registerInputs/RegisterInputs"
import "./styles.css"

const RegisterView = () => {

    const navigate = useNavigate()

    return <Card goToLogin={() => navigate('/login')}>
        <RegisterInputs
            goToLogin={() => navigate('/login')}
        />
    </Card>
}

export default RegisterView
