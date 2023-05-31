import axios from "axios";
// const BASE_URL = "https://ecommerce-back-end-theta.vercel.app/api";
const BASE_URL = 'http://localhost:5500/api'

export class AuthService {

  // static async login(data){
  //     return (await axios.post(`${BASE_URL}/login`),data);
  // }

  // static async login(email, password) {
  //   return await axios
  //     .post(BASE_URL + '/login', { email, password }, {
  //       // headers: {
  //       //   Authorization: `Bearer ${token}`
  //       // }
  //     })
  //     .then((response) => {
  //       // console.log("S");
  //       if (response.data) {
  //         localStorage.setItem('token', JSON.stringify(response.data));
  //         // console.log(response);
  //         const token = response.data
  //         setTimeout(() => {
  //           axios.defaults.headers['Authorization'] = `${token}`;
  //           this.headers(token)
  //         }, 100);
  //         // console.log(token);
  //         // console.log(JSON.parse(response));
  //       }
  //       return response.data;
  //     });


  // }


  static async login(email, password) {
    let data = await axios
      .post(BASE_URL + '/login', { email, password })

    console.log(data.data);

    localStorage.setItem("token", data.data)





  };





  static async headers(token) {
    // axios.defaults.headers['Authorization'] = `${token}`;

    const t = localStorage.getItem("token")
    // console.log(t)
    // console.log(JSON.parse(atob(t.split('.'))))
    const payload = JSON.parse(atob(t.split('.')[1]))
    // const userName = payload.name
    // console.log(payload._id)
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

  static getCurrentUser() {
    return (localStorage.getItem('token'));
  }
  static userId(id) {
    // console.log(id);

    return localStorage.setItem("userId", id)
  }



}