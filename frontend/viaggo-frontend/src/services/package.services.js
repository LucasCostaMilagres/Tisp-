import axios from "axios";
const cors = require('cors');

const _baseUrl = "http://localhost:3000";

export const getAllPackages = async () => {
    const _endpoint = "/get-all-packages";

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

export const getPackageById = async (id) => {
    const _endpoint = `/get-package-by-id?id=${id}`;

    try {
        const response = await axios.get(_baseUrl + _endpoint);

        if (response.status === 200) {
            return response.data;
            console.log('ola')
        }
    }

    catch (error) {
        return error.response.data;
    }
}

export const deletePackageById = async (id) => {
    const _endpoint = `/delete-package-by-id?id=${id}`;

    try {
        const response = await axios.delete(_baseUrl + _endpoint);

        if (response.status === 200) {
            return response.data;
            console.log('deletado')
        }
    }

    catch (error) {
        return error.response.data;
    }
}

export const updatePackageById = async (id, newData) => {
    const _endpoint = `/update-package-by-id?id=${id}`;

    try {
        const response = await axios.put(_baseUrl + _endpoint, newData);
        return response
    } catch (error) {
        return error.response;
    }
};

export const getHoleriteByUserIdAndDate = async (userId, date) => {
    const _endpoint = `/get-holerite-by-user-id-and-date?user_id=${userId}&date=${date}`;
    try {
        const response = await axios.get(_baseUrl + _endpoint);
        if (response.status === 200) {
            return response.data; // Retorna o "holerite" encontrado
        }
    } catch (error) {
        return error.response.data; // Retorna a mensagem de erro se houver
    }
}
