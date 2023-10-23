import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPackages, getPackageById, deletePackageById, updatePackageById } from "../../services/package.services";
import "./style.css";
import { FaTrash, FaPlaneArrival, FaPlaneDeparture} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { BiSolidPencil } from 'react-icons/bi';
import { toast } from "react-toastify";

const HomePage = () => {
    
    const [packages, setPackages] = useState([]);
    const [packageClicked, setPackageClicked] = useState(false);
    const [packageDetail, setPackageDetail] = useState([]);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [updateClicked, setUpdateClicked] = useState(false);
    const [itemUpdated, setItemUpdated] = useState(false)
    
    const [name, setName] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');
    const [details, setDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        const requestData = async () => {
            const response = await getAllPackages();
            setPackages(response);
        };

        requestData();
    }, [itemDeleted,itemUpdated]);


    const handleClick = async (id) => {
        const response = await getPackageById(id);
        setPackageDetail(response);
        setPackageClicked(true)
    };
    
    
    const handleDelete = async (id) => {
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
    
    const close = () => setPackageClicked(false);
    const closeUpdate = () => setUpdateClicked(false);

    return <div className="container-homepage">
        <div className="card-topic">
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
        </div>
        <Modal
            open={packageClicked}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                
                <div className="package-detail-close-delete">
                    <AiOutlineClose
                        onClick={close}
                    ></AiOutlineClose>
                    <BiSolidPencil
                        onClick={() => setUpdateClicked(true)}
                    >
                    </BiSolidPencil>
                    <FaTrash
                        onClick={() => handleDelete(packageDetail.id)}
                    ></FaTrash>
                </div>
                
                <div className="package-detail-text">
                    <h1>Detalhes do Pacote</h1>
                    <h3>{packageDetail.name}</h3>
                    <p>Data Ida: {packageDetail.data_ida}</p>
                    <p>Data Volta: {packageDetail.data_volta}</p>
                    <p>Detalhes Local: {packageDetail.details}</p>
                </div>
            </Box>
        </Modal>
        
        <Modal
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
        </Modal>
        
    </div>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default HomePage
