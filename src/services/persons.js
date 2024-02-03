import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createPerson = newObj => {
    return axios.post(baseUrl, newObj)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)

}

const update = (id,obj)=>{
    return axios.put(`${baseUrl}/${id}`,obj)
}

const services = {
    getAll,
    createPerson,
    deletePerson,
    update
}
export default services