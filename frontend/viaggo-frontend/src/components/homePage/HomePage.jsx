import { Box, Icon, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPackages, getHoleriteByUserIdAndDate, deletePackageById, updatePackageById } from "../../services/package.services";
import { getUserById } from "../../services/user.services";
import "./style.css";
import { FaTrash, FaPlaneArrival, FaPlaneDeparture} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { BiSolidPencil, BiLogOut } from 'react-icons/bi';
import { toast } from "react-toastify";
import avatar from "../../assets/avatarIcon.png"
import holeriteIcon from "../../assets/holeriteIcon.png"
import logo from "../../assets/logo.png"
import background from "../../assets/background.png"
// import { getLoggedIn } from "../../services/user.services";

const HomePage = ({goToLogin}) => {
    
    const [packages, setPackages] = useState([]);
    const [profileClicked, setProfileClicked] = useState(false);
    const [holeriteClicked, setHoleriteClicked] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [updateClicked, setUpdateClicked] = useState(false);
    const [itemUpdated, setItemUpdated] = useState(false)
    
    const [name, setName] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');
    const [details, setDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [user, setUser] = useState('');
    const [holerite, setHolerite] = useState('');

    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    const [selectedMonth, setSelectedMonth] = useState("01");

    useEffect(() => {
        const requestData = async () => {
            const response = await getAllPackages();
            setPackages(response);

            // -------- Setando user logado --------
            const userLoggedIn = await getUserById(2);
            setUser(userLoggedIn);
        };

        requestData();
    }, [itemDeleted,itemUpdated]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleClick = async (id) => {
        setProfileClicked(true)
    };
    
    const handleHoleriteSearch = async () => {
        const mesStr = mes.toString();
        const anoStr = ano.toString();

        console.log("Mês:", mesStr);
        console.log("Ano:", anoStr);
        const holeriteSearched = await getHoleriteByUserIdAndDate(user.id,`01-${mesStr}-${anoStr}`);
        setHolerite(holeriteSearched);
    }

    const handleProfile = async () => {
        setProfileClicked(true)
    }

    const handleHolerite = async () => {
        setHoleriteClicked(true)
    }
    
    const close = () => setProfileClicked(false);
    const closeHolerite = () => setHoleriteClicked(false);

    return <div className="container-homepage">

        <div className="quit-icon"
        onClick={goToLogin}
        >
            <BiLogOut></BiLogOut>
        </div>

        <div className="logo-icon">
            <img src={logo} alt="logo" 
            height={200}
            width={200}
            />
        </div>

        <div className="home-welcome">
            <h1 className="text">BEM VINDO AO BAGULHO</h1>
            <h2 className="text" id="text2">ESCOLHA UMA DAS OPÇÕES ABAIXO PARA ACESSAR</h2>
        </div>

        {/* -------------------- TAMO AQUIIIII -------------------- */}
        
        
        <div className="home-cards">
            <div className="item" onClick={handleProfile}>
                <div className="item-topic">
                    <img src={avatar} className="avatar" alt="avatarIcon" height={200} width={200}/>
                    <h1>PERFIL</h1>
                </div>
            </div>
            <div className="item" onClick={handleHolerite}>
                <div className="item-topic">
                    <img src={holeriteIcon} className="holerite" alt="holeriteIcon" height={200} width={200}/>
                    <h1>HOLERITE</h1>
                </div>
            </div>
        </div>
        

        <Modal
            open={profileClicked}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                
                <div className="profile-modal">
                    <div className="profile-pic">
                        <img src={avatar} alt="avatarIcon" height={350} width={350}/>
                    </div>
                    <div className="profile-text">
                        <h1>Dados do Usuário</h1>
                        <h2>Nome:</h2>
                        <p>{user.name}</p>
                        <h2>Email:</h2>
                        <p>{user.email}</p>
                        <h2>CPF:</h2>
                        <p>{user.cpf}</p>
                    </div>
                </div>
            </Box>
        </Modal>

        <Modal
            open={holeriteClicked}
            onClose={closeHolerite}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style_holerite}>
                
                <div className="holerite-modal">
                    <div className="holerite-pic">
                        
                    </div>
                    <h1>Holerites de {user.name}</h1>
                    <div className="holerite-text">
                        <h2>Digite uma data:</h2>
                        <div className="date-selection">
                            <input className="year-input" type="text" placeholder="Digite o ano desejado" onChange={(event)=>{setAno(event.target.value)}}/>
                            <select className="month-selector" onChange={(event) => {setMes(event.target.value)}}>
                                <option value="01">Janeiro</option>
                                <option value="02">Fevereiro</option>
                                <option value="03">Março</option>
                                <option value="04">Abril</option>
                                <option value="05">Maio</option>
                                <option value="06">Junho</option>
                                <option value="07">Julho</option>
                                <option value="08">Agosto</option>
                                <option value="09">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>

                            </select>
                            <button onClick={handleHoleriteSearch} className="enviar-holerite-search">ENVIAR</button>
                        </div>

                        <div className="holerite-text">
                            <div className="salario">
                                <span id="title">Salário: </span>
                                {holerite.salario !== undefined ? <span>{`R$ ${holerite.salario}`}</span> : <span>Não existe salário</span>}
                            </div>
                            <div className="bonus">
                                <span id="title">Bônus: </span>
                                {holerite.bonus !== undefined ? <span>{`R$ ${holerite.bonus}`}</span> : <span>Não existe bônus</span>}
                            </div>
                        </div>
                    </div>
                </div>

            </Box>
        </Modal>

        {/* -------------------------------------------------------- */}

        {/*const handleDelete = async (id) => {
            setPackageClicked(false);
        const response = await deletePackageById(id);
        setItemDeleted(!itemDeleted);
        toast.success(response)
        };

        const handleSubmit = async (event) => {

        event.preventDefault();
        const body = {
            name: name,
            data_ida: dataIda,
            data_volta: dataVolta,
            details: details,
            image_url: imageUrl
        }
        const response = await updatePackageById(packageDetail.id, body);
        console.log(response);
        console.log(body);
        setItemUpdated(!itemUpdated);
        if(response.status === 200){
            toast.success(response.data);
            setUpdateClicked(false);
            close();
        }
        else{
            toast.error(response.data);
        }
    
        };

        {/* <div className="card-topic">
            {
                packages.map(item => {
                    return <div onClick={() => handleClick(item.id)} className="full-card">
                            <div className="package-image">
                                <img className="package-image" src={item.image_url} alt={`Package ${item.name} Image`} width={300} height={300}/>
                            </div>
                        <div className="package-details">
                            <div className="package-name">
                                <span>{item.name}</span>
                            </div>
                            <div className="date" id="date-text">
                                <span><FaPlaneDeparture></FaPlaneDeparture>{item.data_ida}</span>
                                <span><FaPlaneArrival></FaPlaneArrival>{item.data_volta}</span>
                            </div>
                        </div>
                    </div>
                })
            }
        </div> */}
        
        {/* <Modal
            open={updateClicked}
            onClose={closeUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <div className="update-close">
                        <AiOutlineClose
                            onClick={closeUpdate}
                        ></AiOutlineClose>
                    </div>
                <form onSubmit={handleSubmit} className="update-form">
                    <div className="form-item">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="dataIda">Data de Ida:</label>
                        <input
                            type="date"
                            id="dataIda"
                            value={dataIda}
                            onChange={(e) => setDataIda(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="dataVolta">Data de Volta:</label>
                        <input
                            type="date"
                            id="dataVolta"
                            value={dataVolta}
                            onChange={(e) => setDataVolta(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="details">Detalhes:</label>
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="image-url">Url Imagem:</label>
                        <input
                            id="image-url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <button type="submit">Atualizar Pacote</button>
                </form>
            </Box>
        </Modal> */}

        
        
    </div>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style_holerite = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    width: '25%',
    height: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default HomePage
