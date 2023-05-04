import axios from "axios";
const BASE_URL = "https://ecommerce-back-end-theta.vercel.app/api/";


export class ApiService {

    static async card(userId) {
        return (await axios.get(`${BASE_URL}getBankCards/${userId}`)).data
    }

}