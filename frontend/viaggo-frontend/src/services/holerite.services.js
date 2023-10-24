import axios from "axios";
const cors = require('cors');

const _baseUrl = "http://localhost:3002";

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