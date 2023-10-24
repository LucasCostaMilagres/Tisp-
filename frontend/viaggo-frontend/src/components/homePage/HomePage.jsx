import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPackages, getPackageById, deletePackageById, updatePackageById } from "../../services/package.services";
import "./style.css";
import { FaTrash, FaPlaneArrival, FaPlaneDeparture} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { BiSolidPencil, BiLogOut } from 'react-icons/bi';
import { toast } from "react-toastify";
import avatar from "../../assets/avatarIcon.png"
import holerite from "../../assets/holeriteIcon.png"
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

    useEffect(() => {
        const requestData = async () => {
            const response = await getAllPackages();
            setPackages(response);
        };

        requestData();
    }, [itemDeleted,itemUpdated]);


    const handleClick = async (id) => {
        // const response = await getPackageById(id);
        // setPackagDetail(response);
        setProfileClicked(true)
    };
    
    
    // const handleDelete = async (id) => {
    //     setPackageClicked(false);
    //     const response = await deletePackageById(id);
    //     setItemDeleted(!itemDeleted);
    //     toast.success(response)
    // };

    // const handleSubmit = async (event) => {

    //     event.preventDefault();
    //     const body = {
    //         name: name,
    //         data_ida: dataIda,
    //         data_volta: dataVolta,
    //         details: details,
    //         image_url: imageUrl
    //     }
    //     const response = await updatePackageById(packageDetail.id, body);
    //     console.log(response);
    //     console.log(body);
    //     setItemUpdated(!itemUpdated);
    //     if(response.status === 200){
    //         toast.success(response.data);
    //         setUpdateClicked(false);
    //         close();
    //     }
    //     else{
    //         toast.error(response.data);
    //     }
        
    // };

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
                    <img src={holerite} className="holerite" alt="holeriteIcon" height={200} width={200}/>
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
                        <p>Felipe Matos Silvieri</p>
                        <h2>Email:</h2>
                        <p>felipesilvieri@yahoo.com</p>
                        <h2>CPF:</h2>
                        <p>521.240.288-39</p>
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
            <Box sx={style}>
                
                <div className="holerite-modal">
                    <h1>Holerite</h1>
                </div>

            </Box>
        </Modal>

        {/* -------------------------------------------------------- */}

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
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default HomePage
