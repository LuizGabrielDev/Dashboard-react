import axios from "axios";

const api = axios.create({
    baseURL: "https://json-server-kfvl.onrender.com",
});

export default api;
