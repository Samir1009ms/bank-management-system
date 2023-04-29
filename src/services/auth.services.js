import axios from "axios";
const BASE_URL = "http://localhost:5500/api";

export class AuthService {

  // static async login(data){
  //     return (await axios.post(`${BASE_URL}/login`),data);
  // }

  static async login(email, password) {
    return await axios
      .post(BASE_URL + '/login', { email, password }, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      })
      .then((response) => {
        // console.log("S");
        if (response.data) {
          localStorage.setItem('token', JSON.stringify(response.data));
          // console.log(response);
          const token = response.data
          setTimeout(() => {
            axios.defaults.headers['Authorization'] = `${token}`;
              this.headers(token)
            }, 100);
            // console.log(token);
            // console.log(JSON.parse(response));
        }
        return response.data;
      });


  }

  static async headers(token) {
    axios.defaults.headers['Authorization'] = `${token}`;

    const t = localStorage.getItem("token")    
    console.log(t)
    // console.log(JSON.parse(atob(t.split('.'))))
    const payload = JSON.parse(atob(t.split('.')[1]))
    // const userName = payload.name
   console.log(payload)
    

  }

  register(username, password) {
    return axios.post(BASE_URL + 'register', {
      username,
      password,
    });
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));
  }


}