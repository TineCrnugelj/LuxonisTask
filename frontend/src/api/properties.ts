import axios from "axios";

export function getProperties() {
  return axios
    .get('http://localhost:5000/properties')
    .then(res => res.data);
}
