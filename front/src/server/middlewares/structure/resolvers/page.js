import axios from "axios";

export default (req) =>
  axios
    .get("http://localhost:1337/pages")
    .then((res) => res.data)
    .then((data) => data[0])
    .catch(console.error);
