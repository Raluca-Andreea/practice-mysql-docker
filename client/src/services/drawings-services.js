import axios from 'axios'

export default class drawServices {
  constructor () {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true
    })
  }
  

  getAllDrawings = (userId) => this.service.get('getAllDrawings', { params: {id: userId}})
  getOneDrawing = (id) => this.service.get('getOneDrawing', { params: {id: id}})
  buyOneDrawing = (drawing_id, customer_id) => this.service.post('buyOneDrawing', {drawing_id, customer_id})
  showAllBoughtDrawings = (customer_id) => this.service.get('showAllBoughtDrawings', { params: {customer_id: customer_id}})
  handleUpload = (theFile) => this.service.post('uploadFile', theFile)
  postDrawing = (form, user) => this.service.post('postDrawing',{form, user})
  showAllPersonalDrawings = (userId) => this.service.get('getPersonalDrawings', { params: {id: userId}})
}