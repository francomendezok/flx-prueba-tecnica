import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const BASE_URL = 'http://localhost:4000/users' //  se podria usar una variable de entorno en un archivo .env con NODE // 

const getUsers = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/${userId}`)
  return response.data
}

const createUser = async (userData) => {
  const newUser = { ...userData, id: uuidv4() } // uso uuid para generar el ID unico //   
  const response = await axios.post(BASE_URL, newUser)
  return response.data
}

const updateUser = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}/${userId}`, userData)
  return response.data
}

export { getUsers, deleteUser, createUser, updateUser }
