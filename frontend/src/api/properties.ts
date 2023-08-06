import axios from "axios";

export const getProperties = async (page = 1) => {
  const response = await axios.get(`http://localhost:5000/properties?page=${page}`);
  return response.data;
}
