import axios from 'axios'

export default class prodServices {
  constructor () {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true
    })
  }
  

  createListing = (title, description, user) => this.service.post('createListing', {title, description, user})
  showAllListings = (id) => this.service.get('showAllListings', { params: {customer_id: id}})
}