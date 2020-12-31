import axios from "axios";

export default (req) => {
  return axios
    .get(`http://localhost:1337/pages?fullslug=${req.baseUrl}`)
    .then((res) => res.data)
    .then((data) => data[0])
    .catch(console.error);
};
