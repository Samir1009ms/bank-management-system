import axios from "axios";
const BASE_URL = 'http://localhost:5500/api'
// const BASE_URL = 'https://bank-management-back-end.vercel.app/api'
// const BASE_URL = "http://192.168.42.148:5500/api"

export class AuthService {

  static async login(email, password) {
    let data = await axios.post(BASE_URL + '/login', { email, password })
    localStorage.setItem("token", data.data)
  };

  static async headers() {
    // axios.defaults.headers['Authorization'] = `${token}`;
    const t = localStorage.getItem("token")
    const payload = JSON.parse(atob(t.split('.')[1]))
    // const userName = payload.name
    localStorage.setItem("user", JSON.stringify(payload))
    setTimeout(() => {
    }, 300);

    this.userId(payload._id);
    return payload
  }

  static async register(name, email, password) {
    return await axios.post(BASE_URL + '/register', {
      name,
      email,
      password,
    });
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem("userId")
  }

  // ! user login olub olmamasini yoxluyur
  // static getCurrentUser() {
  //   return (localStorage.getItem('token'));
  // }

  static async getCurrentUser() {
    let token = localStorage.getItem('token')
    return await axios.get(BASE_URL + "/isLoggedIn", {
      headers: {
        authorization: token
      }
    });
  }

  static userId(id) {
    return localStorage.setItem("userId", id)
  }
}