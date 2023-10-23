const express = require("express");
const cors = require("cors");
const moment = require("moment/moment");
const app = express();
const port = 5000;
app.use(express.json());

app.use(cors());
app.options('*', cors());

moment.locale('br');

//DATA
const users = [
    {
        id: 1,
        name: "Davi",
        email: "dav@gmail.com",
        cpf: "11122233344",
        password: "batata123",
        mfa: true
    },
    {
        id: 2,
        name: "Gabriel",
        email: "gab@gmail.com",
        cpf: "55566677789",
        password: "baaasada",
        mfa: false
    },
    {
        id: 3,
        name: "Felipe",
        email: "lip@gmail.com",
        cpf: "52100029312",
        password: "arregacamoleza",
        mfa: false
    }
];

const mfa_user = [
    {
        user_id: 1,
        code: 123456,
        expiration_date: moment("2023-07-19T23:59:59"),
        used: true,
    },
    {
        user_id: 1,
        code: 123123,
        expiration_date: moment("2025-08-19T23:59:59"),
        used: false,
    }
];

//HANDLERS
const handlePassword = (input) => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    if (input.match(lowerCaseLetters) && input.match(upperCase) && input.match(numbers) && input.length >= 8)
        return false
    return true
}

//GET ALL
app.get("/get-all-users", (req, res) => {
    res.json(users);
});

//GET USER BY ID
app.get("/get-user-by-id", (req, res) => {
    users.forEach(value => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            return;
        }
    })
    res.status(400).send("ID inválido")
});

//CREATE USER
app.post("/create-user", (req, res) => {
    if (req.body.name === "" || req.body.name === undefined) {
        res.status(400).send("Nome inválido");
        return;
    }
    if (req.body.email === "" || req.body.email === undefined) {
        res.status(400).send("Email inválido");
        return;
    }
    if (req.body.cpf === "" || req.body.cpf === undefined || req.body.cpf.length !== 11) {
        res.status(400).send("CPF inválido");
        return;
    }
    if (req.body.password === "" || req.body.password === undefined || handlePassword(req.body.password)) {
        res.status(400).send("Senha inválida");
        return;
    }
    users.forEach(value => {
        if (req.body.email === value.email && req.body.cpf === value.cpf) {
            res.status(400).send("Email e CPF já cadastrados");
            return;
        }
        if (req.body.email === value.email) {
            res.status(400).send("Email já cadastrado");
            return;
        }
        if (req.body.cpf === value.cpf) {
            res.status(400).send("CPF já cadastrado");
            return;
        }
    })
    const newUser = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        password: req.body.password
    };
    users.push(newUser);
    res.json(newUser);
});

//DELETE USER BY ID
app.delete("/delete-user-by-id", (req, res) => {
    users.forEach((value, index) => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            users.splice(index, 1);
            return;
        }
    })
    res.status(400).send("ID inválido");
});

//UPDATE USER BY ID -> CPF e ID não mudam
app.put("/update-user-by-id", (req, res) => {
    users.forEach((value) => {
        if (parseInt(req.query.id) === value.id) {
            if (req.body.email === undefined || req.body.email == ""
                || req.body.password === undefined || req.body.password == "") {
                res.status(400).send("Não é possível alterar o cadastro");
                return;
            }

            value.email = req.body.email;
            value.password = req.body.password;
            res.json(value);
        }
    })
});

//LOGIN
app.post("/login", (req, res) => {
    for (let user of users) {
        if ((req.body.login === user.email || req.body.login === user.cpf) && req.body.password === user.password) {
            res.send("Bem vindo ao Viaggo");
            return;
        }
    }
    // users.forEach(value => {
    //     if ((req.body.login === value.email || req.body.login === value.cpf) && req.body.password === value.password) {
    //         res.send("Bem vindo ao Viaggo");
    //         return;
    //     }
    // })
    res.status(400).send("Preencha os campos corretamente");
});

//GET ALL MFA-USER
app.get("/get-mfa-user", (req, res) => {
    res.json(mfa_user);
});

//VERIFY IF HAS MFA
app.get("/verify-mfa", (req, res) => {

    if (req.query.login === '' || req.query.login === null) {
        res.status(400).send("E-mail inválido");
        return;
    }

    const search = users.find(user => (user.email === req.query.login || user.cpf === req.query.login) && user.mfa);

    if (!search) {
        res.status(400).send(false);
        return;
    };

    res.status(200).send(true);
});

//GENERATING MFA CODE
app.post("/generate-code", (req, res) => {
    var minm = 100000;
    var maxm = 999999;
    const number = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    if (req.body.login === '' || req.body.login === null) {
        res.status(400).send("E-mail inválido");
        return;
    }

    const verifyValidUser = users.find(user => user.email === req.body.login || user.cpf === req.body.login);

    if (!verifyValidUser) {
        res.status(400).send("ID não existe");
        return;
    }

    const verifyHasMfa = users.find(user => user.mfa && user.id === verifyValidUser.id);

    if (!verifyHasMfa) {
        res.status(400).send("Não há dupla autenticação para este usuário");
        return;
    }

    const newMfaCode = {
        user_id: verifyValidUser.id,
        code: number,
        expiration_date: moment().add(5, 'minutes').subtract(3, 'hours'),
        used: false,
    };

    mfa_user.push(newMfaCode);

    res.status(200).send("Código gerado com sucesso!");
});

//AUTHENTICATION CODE
app.options("/auth-code", cors())
app.post("/auth-code", (req, res) => {
    console.log(req.body)
    if (req.body.code === '' || req.body.code === null) {
        console.log(res)
        res.status(400).send("Código inválido");
        return;
    }

    const dateNow = moment().subtract(3, 'hours');

    const verifyCode = mfa_user.find(mfa => mfa.code === parseInt(req.body.code) && dateNow <= mfa.expiration_date && !mfa.used);

    if (!verifyCode) {
        res.status(400).send("Código inválido");
        return;
    }

    verifyCode.used = true;

    res.status(200).send("Autenticação feita com sucesso!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
