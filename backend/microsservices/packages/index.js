const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());

app.use(cors());

//DATA
const holerites = [
    {
        user_id: 1,
        date: '01-03-2023',
        salario: 2309,
        comissao: 300,
        beneficios: 200,
        horas_extras: 290,
        plano_saude: 178,
        inss: 1200,
        irff: 450
    },
    {
        user_id: 1,
        date: '01-04-2023',
        salario: 2400,
        comissao: 250,
        beneficios: 200,
        horas_extras: 290,
        plano_saude: 178,
        inss: 1200,
        irff: 450
    },
    {
        user_id: 2,
        date: '01-05-2023',
        salario: 2450,
        comissao: 400,
        beneficios: 200,
        horas_extras: 290,
        plano_saude: 0,
        inss: 1200,
        irff: 450
    },
    {
        user_id: 2,
        date: '01-06-2023',
        salario: 2670,
        comissao: 500,
        beneficios: 200,
        horas_extras: 290,
        plano_saude: 178,
        inss: 1200,
        irff: 450
    },
    
];


//GET ALL HOLERITES
app.get("/get-all-holerites", (req, res) => {
    res.json(holerites);
})

//GET HOLERITE BY USER_ID
app.get("/get-holerite-by-user-id", (req, res) => {
    holerite.forEach(value => {
        if (parseInt(req.query.user_id) === value.user_id) {
            res.json(value);
            return;
        }
    })
    res.status(400).send("Holerite inválido")
})

// GET HOLERITE BY USER_ID AND DATE
app.get("/get-holerite-by-user-id-and-date", (req, res) => {
    const userId = parseInt(req.query.user_id);
    const dateToFind = req.query.date;

    const holeriteToFind = holerites.find((value) => {
        return userId === value.user_id && dateToFind === value.date;
    });

    if (holeriteToFind) {
        res.json(holeriteToFind);
    } else {
        res.status(400).send("Holerite inválido");
    }
});



//CREATE HOLERITE
app.post("/create-holerite-by-user-id-and-date", (req, res) => {
    holerites.forEach(value => {
        if (req.body.user_id === value.user_id && req.body.date === value.date) {
            res.status(400).send("Holerite já cadastrado");
            return;
        }
    })
    
    if (req.body.date === "" || req.body.date === undefined || req.body.salario === "" || req.body.salario === undefined || req.body.comissao === "" || req.body.comissao === undefined || req.body.beneficios === "" || req.body.beneficios === undefined || req.body.horas_extras === "" || req.body.horas_extras === undefined || req.body.plano_saude === "" || req.body.plano_saude === undefined || req.body.inss === "" || req.body.inss === undefined || req.body.irff === "" || req.body.irff === undefined) {
        res.status(400).send("Preencha os campos corretamente");
        return;
    }
    const newHolerite = {
        user_id: req.body.user_id,
        date: req.body.date,
        salario: req.body.salario,
        comissao: req.body.comissao,
        beneficios: req.body.beneficios,
        horas_extras: req.body.horas_extras,
        plano_saude: req.body.plano_saude,
        inss: req.body.inss,
        irff: req.body.irff

    };
    holerites.push(newHolerite);
    res.status(200).json(newHolerite);
})

//DELETE HOLERITE BY ID AND DATE
app.delete("/delete-holerite-by-user-id-and-date", (req, res) => {
    const userId = parseInt(req.query.user_id);
    const dateToDelete = req.query.date;

    const indexToDelete = holerites.findIndex((value) => {
        return userId === value.user_id && dateToDelete === value.date;
    });

    if (indexToDelete !== -1) {
        holerites.splice(indexToDelete, 1);
        res.status(200).send("Deletado com sucesso!");
    } else {
        res.status(400).send("Combinação de ID de usuário e data inválida");
    }
});

//UPDATE HOLERITE BY ID AND DATE
app.put("/update-holerite-by-user-id-and-date", (req, res) => {
    if (req.body.date === "" || req.body.date === undefined || req.body.salario === "" || req.body.salario === undefined || req.body.comissao === "" || req.body.comissao === undefined || req.body.beneficios === "" || req.body.beneficios === undefined || req.body.horas_extras === "" || req.body.horas_extras === undefined || req.body.plano_saude === "" || req.body.plano_saude === undefined || req.body.inss === "" || req.body.inss === undefined || req.body.irff === "" || req.body.irff === undefined) {
        res.status(400).send("Não é possível alterar o holerite");
        return;
    }

    const userId = parseInt(req.body.user_id);
    const dateToUpdate = req.body.date;

    let updated = false;

    holerites.forEach((value) => {
        if (userId === value.user_id && dateToUpdate === value.date) {
            value.salario = req.body.salario;
            value.comissao = req.body.comissao;
            value.beneficios = req.body.beneficios;
            value.horas_extras = req.body.horas_extras;
            value.plano_saude = req.body.plano_saude;
            value.inss = req.body.inss;
            value.irff = req.body.irff;
            updated = true;
        }
    });

    if (updated) {
        res.status(200).send("Atualizado com sucesso!");
    } else {
        res.status(400).send("Combinação de ID de usuário e data inválida");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
