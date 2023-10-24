import axios from "axios";
const cors = require('cors');

const _baseUrl = "http://localhost:3000";

export const getAllHolerites = async () => {
  const _endpoint = "/get-all-holerites";

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

export const createHolerite = async (data) => {
    const _endpoint = "/create-holerite";
    try {
      const response = await axios.post(_baseUrl + _endpoint, data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
