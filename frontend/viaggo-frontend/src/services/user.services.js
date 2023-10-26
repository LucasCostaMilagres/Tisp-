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

export const updateAvatarById = async (id, userData) => {
    const _endpoint = `${_baseUrl}/update-avatar-by-id?id=${id}`
    try {
      const response = await axios.put(_endpoint, userData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };

// Alterar aquii --------------------

// Método para fazer logoff de todos os usuários
export const logoff = async () => {
    const _endpoint = "/logoff";
    try {
        const response = await axios.post(_baseUrl + _endpoint);
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        return error.response.data;
    }
}

// Função para obter o usuário logado
export const getLoggedInUser = async () => {
    const _endpoint = "/get-loggedin";
    try {
        const response = await axios.get(_baseUrl + _endpoint);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
}

// Função para atualizar o avatar_url do usuário
export const updateImageUrl = async (userId, avatarUrl) => {
    const _endpoint = `/update-avatar-url`;
    const requestData = {
        id: userId,
        avatar_url: avatarUrl,
    };

    try {
        const response = await axios.put(_baseUrl + _endpoint, requestData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
};


export const loggedIn = async () =>{
    return
}
