import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll =()=>{
    return axios.get(baseUrl)
}

const createPerson = newObj =>{
    return axios.post(baseUrl, newObj)
}

const deletePerson = (id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll:getAll,
    createPerson:createPerson,
    deletePerson:deletePerson
    }