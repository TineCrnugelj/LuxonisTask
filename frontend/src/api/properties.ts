import axios from "axios";

export const getProperties = async (page = 1, items = 8) => {
  const response = await axios.get(`http://localhost:5000/api/properties?page=${page}&items=${items}`);
  return response.data;
}
