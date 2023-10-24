import axios from "axios";

const _baseUrl = "http://localhost:5000";   //colocar a sua porta do localhost aqui

export const getUserById = async (userId) => {
    const _endpoint = `/get-user-by-id?id=${userId}`; // Passa o ID como um parâmetro de consulta na URL
    try {
        const response = await axios.get(_baseUrl + _endpoint);
        if (response.status === 200) {
            return response.data; // Retorna os dados do usuário encontrado
        }
    } catch (error) {
        return error.response.data; // Retorna a mensagem de erro se houver
    }
}

export const login = async (data) => {
    const _endpoint = "/login";
    try {
        const response = await axios.post(_baseUrl + _endpoint, data)
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return error.response.data;
    }
}

export const registerUser = async (data) => {
    const _endpoint = "/create-user";
    try {
        const response = await axios.post(_baseUrl + _endpoint, data)
        if (response.status === 200) {
            return true;
        }
    }
    catch (error) {
        return error.response.data;
    }
}

export const verifyMfa = async (login) => {
    const _endpoint = `/verify-mfa?login=${login}`;
    try {
        const response = await axios.get(_baseUrl + _endpoint);

        if (response.status === 200) {
            return response.data;
        }

    }
    catch (error) {
        return error.response.data;
    }
}

export const generateCode = async (body) => {
    const _endpoint = "/generate-code";
    try {
        const response = await axios.post(_baseUrl + _endpoint, body);

        return response;
    }
    catch (error) {
        return error.response;
    }
}

export const authCode = async (body) => {
    const _endpoint = "/auth-code";
    try {
        const response = await axios.post(_baseUrl + _endpoint, body);

        return response;
    }
    catch (error) {
        return error.response;
    }
}

// Alterar aquii --------------------

export const loggedIn = async () =>{
    return
}
