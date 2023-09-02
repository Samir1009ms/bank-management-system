import axios from "axios";
import moment from "moment";
// const BASE_URL = "http://localhost:5500/api"
// const BASE_URL = "http://192.168.42.148:5500/api"
const BASE_URL = 'https://bank-management-back-end.vercel.app/api'

export class ApiService {

    static async card(userId) {
        return (await axios.get(`${BASE_URL}/getBankCards/${userId}`)).data
    }

    static async transctions(userId) {
        return (await axios.get(`${BASE_URL}/getTransactions/${userId}`)).data
    }

    static async notii(userId) {
        return (await axios.get(`${BASE_URL}/notifications/${userId}`)).data
    }

    static async deleteNotifications(notificationId) {
        return await axios.delete(`${BASE_URL}/notifications/delete/${notificationId}`)
    }

    static async addProfile(userId, value) {
        return await axios.post(`${BASE_URL}/addProfile/${userId}`, { value })
    }
    static async getProfile(userId) {
        return await axios.get(`${BASE_URL}/getProfile/${userId}`)
    }
    static async updateProfile(userId, value) {
        return await axios.put(`${BASE_URL}/updateProfile/${userId}`, { value })
    }

    static async cardDetails(id) {
        return await axios.get(`${BASE_URL}/getCardDetails/${id}`)
    }

    static async getTransactionsDetails(number) {
        return await axios.get(`${BASE_URL}/getTransactionsDetails/${number}`)
    }

    static async transferMoney(tra) {
        return await axios.post(`${BASE_URL}/transferMoney`, {
            senderCardNumber: tra.senderCardNumber,
            receiverCardNumber: tra.receiverCardNumber,
            amount: tra.amount
        })
    }

    static async blockedCard(userId, id, blocked) {
        return await axios.put(`http://localhost:5500/api/blockCard/${userId}/card/${id}`, { blocked: blocked })
    }

    static async addCard(userId, card) {
        return await axios.post(`${BASE_URL}/addBankCard/${userId}`, {
            cardNumber: card.cardNumber,
            cardDate: moment(card.cardDate).format('MM/yyyy'),
            cardCvv: card.cardCvv,
            cardName: card.cardName,
            cardType: card.cardType,

        })
    }

    static async confirmPassword(email, password, nPassword) {
        return await axios.post(`${BASE_URL}/login`, { email, password, nPassword })
    }
}