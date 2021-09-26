import React, {useEffect, useState} from 'react'
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import phonebookService from "./services/phonebook";


function App() {
    const [persons, setPersons] = useState<PersonParam[]>([])

    // TODO: Make a useEffect() for visiblePersons too
    useEffect(() => {
        phonebookService.getAll().then(
            r => {
                setPersons(r)
                setVisiblePersons(r)
            }
        )
    }, [])


    const [visiblePersons, setVisiblePersons] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    function handleNewName(ev: React.ChangeEvent<HTMLInputElement>) {
        setNewName(ev.target.value)
    }

    function handleNewNumber(ev: React.ChangeEvent<HTMLInputElement>) {
        setNewNumber(ev.target.value)
    }

    function handleSearch(ev: React.ChangeEvent<HTMLInputElement>) {
        setSearch(ev.target.value)
        const searchVal = ev.target.value.toLowerCase()
        setVisiblePersons(() => {
            return persons.filter((value => value.name.toLowerCase().includes(searchVal)))
        })
    }

    function addNewName(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        const newPerson = {name: newName, number: newNumber}
        // TODO: Find a more performant and better method
        const resultPerson = persons.find(value => value.name === newPerson.name)
        if (resultPerson) {
            const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
            if (confirmed) {
                phonebookService
                    .updatePerson({...newPerson, id: resultPerson.id})
                    .then(updatedPerson => {
                        console.log(updatedPerson)

                        const newPersonList = persons.filter((person) => person.id !== resultPerson.id)

                        newPersonList.push(updatedPerson)
                        setPersons(newPersonList)
                        setVisiblePersons(newPersonList)
                        alert(`Phonebook entry: ${newName} Successfully Updated!`)
                    })
            } else {
                alert(`Request Cancelled!`)
            }
        } else {
            phonebookService
                .createPerson(newPerson)
                .then(returnedPerson => {
                    // @ts-ignore
                    const newPersonList = persons.concat(returnedPerson)
                    setPersons(newPersonList)
                    setVisiblePersons(newPersonList)
                })
        }
        setNewName('')
        setNewNumber('')
    }

    // TODO: Improve
    function deleteName(id: string, name: string, number: string) {
        const confirmed = window.confirm(`Delete ${name} (${number})?`).valueOf()
        if (confirmed) {
            phonebookService
                .deletePerson(id)
                .then((res) => {
                    console.log(res.statusText)
                    if (res.status === 204) {
                        // TODO: Fix this, find a better way to delete
                        const newPersons = persons.filter((person) => person.id !== id)
                        console.log(newPersons)
                        setPersons(newPersons)
                        // TODO: Also, set this according to the search query as well
                        setVisiblePersons(newPersons)
                    }
                })
        } else {
            alert(`Delete Request Cancelled`)
        }
    }
    return (
        <>
            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearch}/>

            <h2>Add New </h2>
            <PersonForm onSubmit={addNewName} onNameChange={handleNewName} nameValue={newName}
                        onNumberChange={handleNewNumber} numValue={newNumber}/>

            <h2>Numbers</h2>
            <Persons persons={visiblePersons} onClick={deleteName}/>
        </>
    )
}


export default App

export interface PersonParam {
    id: string;
    name: string,
    number: string,
}
