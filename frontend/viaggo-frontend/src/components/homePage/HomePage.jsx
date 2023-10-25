import { Box, Icon, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getHoleriteByUserIdAndDate, createHolerite } from "../../services/holerite.services";
import { getUserById } from "../../services/user.services";
import "./style.css";
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidPencil, BiLogOut, BiSolidAddToQueue } from 'react-icons/bi';
import { toast } from "react-toastify";
import avatar from "../../assets/avatarIcon.png"
import holeriteIcon from "../../assets/holeriteIcon.png"
import logo from "../../assets/logo.png"
// import { getLoggedIn } from "../../services/user.services";

const HomePage = ({goToLogin}) => {
    
    const [profileClicked, setProfileClicked] = useState(false);
    const [holeriteClicked, setHoleriteClicked] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);
    const [updateClicked, setUpdateClicked] = useState(false);
    const [createClicked, setCreateClicked] = useState(false);
    const [itemUpdated, setItemUpdated] = useState(false)

    const [user, setUser] = useState('');
    const [holerite, setHolerite] = useState('');
    
    const [mes, setMes] = useState('01');
    const [ano, setAno] = useState('');

    const [mesCreate, setMesCreate] = useState('01');
    const [AnoCreate, setAnoCreate] = useState('');
    const [salario, setSalario] = useState('');
    const [comissao, setComissao] = useState('');
    const [beneficios, setBeneficios] = useState('');
    const [horasExtras, setHorasExtras] = useState('');
    const [planoSaude, setPlanoSaude] = useState('');
    const [inss, setInss] = useState('');
    const [irff, setIrff] = useState('');
    
    const [selectedMonth, setSelectedMonth] = useState("01");

    useEffect(() => {
        const requestData = async () => {
            // const response = await getAllPackages();
            // setPackages(response);

            // -------- Setando user logado --------
            const userLoggedIn = await getUserById(1);
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
    
    const handleAddHolerite = async () => {  
        const date = `01-${mesCreate}-${AnoCreate}`
        const data = {
            user_id: user.id,
            date: date,
            salario: salario,
            comissao: comissao,
            beneficios: beneficios,
            horas_extras: horasExtras,
            plano_saude: planoSaude,
            inss: inss,
            irff: irff
        }

        await createHolerite(data)

        setSalario('');
        setComissao('');
        setBeneficios('');
        setHorasExtras('');
        setPlanoSaude('');
        setInss('');
        setIrff('');

        setCreateClicked(false);
    }

    const closeUpdate = () => {
        setUpdateClicked(false);
    }

    const closeCreate = () => {
        setCreateClicked(false);
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
                    <div className="holerite-buttons">
                        {/* <BiSolidPencil className="update" onClick={() => setUpdateClicked(true)}></BiSolidPencil> */}
                        <BiSolidAddToQueue className="insert" onClick={() => setCreateClicked(true)} title="Insira Ou Atualize Um Holerite"></BiSolidAddToQueue>
                        <AiOutlineClose className="close" onClick={closeHolerite} title="Fechar"></AiOutlineClose>
                    </div>
                    <h1 className="holerite-title">Holerites de {user.name}</h1>
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
                                <span id="title">Salário Base: </span>
                                {holerite.salario !== undefined ? <span>{`R$ ${holerite.salario}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="bonus">
                                <span id="title">Comissão: </span>
                                {holerite.comissao !== undefined ? <span>{`R$ ${holerite.comissao}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="beneficios">
                                <span id="title">Benefícios: </span>
                                {holerite.beneficios !== undefined ? <span>{`R$ ${holerite.beneficios}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="horas-extras">
                                <span id="title">Horas Extras: </span>
                                {holerite.horas_extras !== undefined ? <span>{`R$ ${holerite.horas_extras}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="plano-saude">
                                <span id="title">Plano de Saúde: </span>
                                {holerite.plano_saude !== undefined ? <span>{`R$ ${holerite.plano_saude}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="inss">
                                <span id="title">INSS: </span>
                                {holerite.inss !== undefined ? <span>{`R$ ${holerite.inss}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="irff">
                                <span id="title">IRFF: </span>
                                {holerite.irff !== undefined ? <span>{`R$ ${holerite.irff}`}</span> : <span>R$ 0</span>}
                            </div>
                            <div className="total">
                                <span id="title">Total: </span>
                                {(parseFloat(holerite.salario) + parseFloat(holerite.comissao) + parseFloat(holerite.beneficios) + parseFloat(holerite.horas_extras) + parseFloat(holerite.plano_saude) + parseFloat(holerite.inss) + parseFloat(holerite.irff)) !== NaN ? <span>{`R$ ${parseFloat(holerite.salario) + parseFloat(holerite.comissao) + parseFloat(holerite.beneficios) + parseFloat(holerite.horas_extras) + parseFloat(holerite.plano_saude) + parseFloat(holerite.inss) + parseFloat(holerite.irff)}`}</span> : <span>R$ 0</span>}
                            </div>
                        </div>
                    </div>
                </div>

            </Box>
        </Modal>

        {/* <Modal
            open={updateClicked}
            onClose={closeUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                
                <div className="update-holerite">
                    <h1>UPDATE</h1>
                </div>
            </Box>
        </Modal> */}

        <Modal
            open={createClicked}
            onClose={closeCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleUpdate}>
                
                <div className="create-holerite">
                    <h1 className="insert-title">Inserir Novo Holerite</h1>
                    <input className="year-input" type="text" placeholder="Digite o ano desejado" onChange={(event)=>{setAnoCreate(event.target.value)}}/>
                    <select className="month-selector" onChange={(event) => {setMesCreate(event.target.value)}}>
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
                    <h2>Digite os valores (em reais):</h2>
                    <div className="insert-data-inputs">
                        <input type="text" className="create-input" placeholder="Salário Base" onChange={(e) => {setSalario(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="Comissão" onChange={(e) => {setComissao(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="Benefícios" onChange={(e) => {setBeneficios(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="Horas Extras" onChange={(e) => {setHorasExtras(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="Plano de Saúde" onChange={(e) => {setPlanoSaude(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="INSS" onChange={(e) => {setInss(e.target.value)}}/>
                        <input type="text" className="create-input" placeholder="IRFF" onChange={(e) => {setIrff(e.target.value)}}/>
                    </div>
                    <div className="insert-button-pos">
                        <button onClick={handleAddHolerite} className="insert-button">INSERIR</button></div>
                </div>
            </Box>
        </Modal>
   
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
    height: '80%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleUpdate = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    width: '30%',
    height: '85%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default HomePage
