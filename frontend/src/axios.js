import Axios from 'axios'


const BASE_URL="http://127.0.0.1:5000"

export const request= Axios.create({
 baseURL: BASE_URL
})
