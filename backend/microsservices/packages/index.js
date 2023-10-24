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
        bonus: 300
    },
    {
        user_id: 1,
        date: '01-04-2023',
        salario: 2400,
        bonus: 250
    },
    {
        user_id: 1,
        date: '01-05-2023',
        salario: 2450,
        bonus: 400
    },
    {
        user_id: 1,
        date: '01-06-2023',
        salario: 2670,
        bonus: 500
    },
    
];


//GET ALL
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

// //CREATE PACKAGE
// app.post("/create-package", (req, res) => {
//     if (req.body.name === "" || req.body.name === undefined) {
//         res.status(400).send("Nome inválido");
//         return;
//     }
//     if (req.body.data_ida === "" || req.body.data_ida === undefined) {
//         res.status(400).send("Data Ida inválida");
//         return;
//     }
//     if (req.body.data_volta === "" || req.body.data_volta === undefined) {
//         res.status(400).send("Data Volta inválida");
//         return;
//     }
//     if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
//         res.status(400).send("Data Inicial deve ser anterior a Data Volta");
//         return;
//     }

//     const newPackage = {
//         id: packages[packages.length - 1].id + 1,
//         name: req.body.name,
//         data_ida: req.body.data_ida,
//         data_volta: req.body.data_volta,
//         details: req.body.details,
//         image_url: req.body.image_url
//     };
//     packages.push(newPackage);
//     res.json(newPackage);
// })

// //DELETE PACKAGE BY ID
// app.delete("/delete-package-by-id", (req, res) => {
//     packages.forEach((value, index) => {
//         if (parseInt(req.query.id) === value.id) {
//             packages.splice(index, 1);
//             res.status(200).send("Deletado com sucesso!");
//             return;
//         }
//     })
//     res.status(400).send("ID inválido");
// })

// //UPDATE PACKAGE BY ID
// app.put("/update-package-by-id", (req, res) => {
//     if (req.query.id === undefined || req.query.id === null) {
//         res.status(400).send("Nenhum ID selecionado");
//         return;
//     }
//     packages.forEach((value) => {
//         if (parseInt(req.query.id) === value.id) {
//             if (req.body.name === undefined || req.body.name === "" || req.body.data_ida === undefined || req.body.data_ida == ""
//                 || req.body.data_volta === undefined || req.body.data_volta == "" || req.body.details === undefined || req.body.details === "") {
//                 res.status(400).send("Não é possível alterar o pacote");
//                 return;
//             }

//             if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
//                 res.status(400).send("Data Inicial deve ser anterior a Data Volta")
//                 return;
//             }

//             value.name = req.body.name;
//             value.data_ida = req.body.data_ida;
//             value.data_volta = req.body.data_volta;
//             value.details = req.body.details;
//             value.image_url = req.body.image_url;
//             res.status(200).send("Atualizado com sucesso!");
//         }
//     })
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
