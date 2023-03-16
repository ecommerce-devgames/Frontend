import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3001',  
});

instance.interceptors.response.use (response => response.data);

export default instance;

//Luego en lugar de importar axios importamos la instancia import instance from «../../api/instance» y los pedidos los hacemos a /api/user/...