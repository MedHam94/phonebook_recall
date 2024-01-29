import { useEffect, useState } from "react";
import axios from 'axios'
import personServices from './services/persons'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    console.log('effect');
    personServices.getAll()
      .then(result=>{
        console.log('Promise fulfilled');
        setPersons(result.data)
      })
  },[])

  const submitForm = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const person = {
      name: newName,
      number: newNumber
    }

    if (checkDuplicate(persons)) {
      alert(`${newName} is already existed`);
    } else {
        personServices.createPerson(person)
            .then(result =>{
                console.log(result)
                setPersons((result) => {
                    return [...result, { name: newName, number: newNumber }];

                });
                setNewName("");
                setNewNumber("");
            })

    }
  };

  const handleDelete=()=>{

  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const checkDuplicate = (persons) => {
    return persons.some((person) => person.name === newName);
  };

  const filteredList =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(search)
        );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} search={search} />

      <h2>add new</h2>

      <PersonForm
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        submitForm={submitForm}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredList} handleDelete={handleDelete}/>

    </div>
  );
};

export default App;
