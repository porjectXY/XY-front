import axios from 'axios'

const BASE_URL = 'https://xy-api.onrender.com'

const getUSers = () => axios.get(`${BASE_URL}/users`)
const getPosts = () => axios.get(`${BASE_URL}/posts`)

export {
  getUSers,
  getPosts
}
