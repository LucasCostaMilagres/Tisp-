const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());

app.use(cors());

//DATA
const packages = [
    {
        id: 1,
        name: "Paris",
        data_ida: "2023-05-30",
        data_volta: "2023-06-05",
        details: "muito foda",
        image_url: "https://images.pexels.com/photos/8433681/pexels-photo-8433681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 2,
        name: "Rio de Janeiro",
        data_ida: "2023-06-03",
        data_volta: "2023-06-14",
        details: "muito roubo",
        image_url:"https://images.unsplash.com/photo-1613390250147-171878866f04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80"
    },
    {
        id: 3,
        name: "Angola",
        data_ida: "2023-08-16",
        data_volta: "2023-08-22",
        details: "não gostei, asmei",
        image_url:"https://images.unsplash.com/photo-1630343350724-2eafe052719f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
    },
    {
        id: 4,
        name: "Nova Iorque",
        data_ida: "2023-08-16",
        data_volta: "2023-08-22",
        details: "Concrete Jungles where dreams are made of...",
        image_url:"https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=395&q=80"
    }
];

//HANDLERS
const handleValidDates = (initialDate, endDate) => {
    const dateInitial = new Date(initialDate);
    const dateEnd = new Date(endDate);
    return dateInitial < dateEnd ? false : true;
}

//GET ALL
app.get("/get-all-packages", (req, res) => {
    res.json(packages);
})

//GET PACKAGE BY ID
app.get("/get-package-by-id", (req, res) => {
    packages.forEach(value => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            return;
        }
    })
    res.status(400).send("Pacote inválido")
})

//CREATE PACKAGE
app.post("/create-package", (req, res) => {
    if (req.body.name === "" || req.body.name === undefined) {
        res.status(400).send("Nome inválido");
        return;
    }
    if (req.body.data_ida === "" || req.body.data_ida === undefined) {
        res.status(400).send("Data Ida inválida");
        return;
    }
    if (req.body.data_volta === "" || req.body.data_volta === undefined) {
        res.status(400).send("Data Volta inválida");
        return;
    }
    if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
        res.status(400).send("Data Inicial deve ser anterior a Data Volta");
        return;
    }

    const newPackage = {
        id: packages[packages.length - 1].id + 1,
        name: req.body.name,
        data_ida: req.body.data_ida,
        data_volta: req.body.data_volta,
        details: req.body.details,
        image_url: req.body.image_url
    };
    packages.push(newPackage);
    res.json(newPackage);
})

//DELETE PACKAGE BY ID
app.delete("/delete-package-by-id", (req, res) => {
    packages.forEach((value, index) => {
        if (parseInt(req.query.id) === value.id) {
            packages.splice(index, 1);
            res.status(200).send("Deletado com sucesso!");
            return;
        }
    })
    res.status(400).send("ID inválido");
})

//UPDATE PACKAGE BY ID
app.put("/update-package-by-id", (req, res) => {
    if (req.query.id === undefined || req.query.id === null) {
        res.status(400).send("Nenhum ID selecionado");
        return;
    }
    packages.forEach((value) => {
        if (parseInt(req.query.id) === value.id) {
            if (req.body.name === undefined || req.body.name === "" || req.body.data_ida === undefined || req.body.data_ida == ""
                || req.body.data_volta === undefined || req.body.data_volta == "" || req.body.details === undefined || req.body.details === "") {
                res.status(400).send("Não é possível alterar o pacote");
                return;
            }

            if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
                res.status(400).send("Data Inicial deve ser anterior a Data Volta")
                return;
            }

            value.name = req.body.name;
            value.data_ida = req.body.data_ida;
            value.data_volta = req.body.data_volta;
            value.details = req.body.details;
            value.image_url = req.body.image_url;
            res.status(200).send("Atualizado com sucesso!");
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
