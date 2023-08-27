import axios from "axios";

/**
 * Use .evn for URLs
 */
export const getProperties = async (page = 1) => {
  const response = await axios.get(`http://localhost:5000/api/properties?page=${page}`);
  return response.data;
}
