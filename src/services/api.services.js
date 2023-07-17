import axios from "axios";
// const BASE_URL = "https://ecommerce-back-end-theta.vercel.app/api/";
const BASE_URL = "http://localhost:5500/api/"
// const BASE_URL = "http://192.168.42.31:5500/api/"

export class ApiService {

    static async card(userId) {
        return (await axios.get(`${BASE_URL}getBankCards/${userId}`)).data
    }

    static async transctions(userId) {
        return (await axios.get(`${BASE_URL}getTransactions/${userId}`)).data
    }

    static async notii(userId) {
        return (await axios.get(`${BASE_URL}notifications/${userId}`)).data
    }

    static async deleteNotifications(notificationId) {
        return await axios.delete(`${BASE_URL}notifications/delete/${notificationId}`)
    }

    static async addProfile(userId, value) {
        return await axios.post(`${BASE_URL}addProfile/${userId}`, { value })
    }
    static async getProfile(userId) {
        return await axios.get(`${BASE_URL}getProfile/${userId}`)
    }
    static async updateProfile(userId, value) {
        return await axios.put(`${BASE_URL}updateProfile/${userId}`, { value })
    }
}