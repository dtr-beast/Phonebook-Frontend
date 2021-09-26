import axios from "axios";

const URL = '/api/persons'

function getAll() {
    return axios
        .get(`${URL}`)
        .then(r => r.data)
}

function createPerson(newPerson: {name: string, number: string}) {
    return axios
        .post(URL, newPerson)
        .then(r => r.data)
}

function updatePerson(newPerson: {id: string}) {
    return axios
        .put(`${URL}/${newPerson.id}`, newPerson)
        .then(r => r.data)
}

function deletePerson(id: string) {
    return axios
        .delete(`${URL}/${id}`)
}

const phonebookService = {getAll, createPerson, deletePerson, updatePerson}

export default phonebookService
