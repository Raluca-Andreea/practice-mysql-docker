import axios from 'axios'

export default class authServices {
  constructor () {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true
    })
  }
  

  signup = (username, email, password, city, age) => this.service.post('signup', {username, email, password, city, age})

  login = (username, password) => this.service.post('login', {username, password})
  logout = () => this.service.post('logout')

}