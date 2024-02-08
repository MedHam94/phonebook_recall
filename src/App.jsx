import { useEffect, useState } from "react";
import personServices from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notif from "./components/Notif";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setMessage] = useState(null);

  const generateID = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const cleanForm = () => {
    setNewName("");
    setNewNumber("");
  };
  const submitForm = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const person = {
      name: newName,
      number: newNumber,
      id: `${generateID()}`,
    };
    const regex = /^\d{2,3}-\d{7,8}$/

    if (newName.length < 3) {
      setMessage("Name must be at least three characters long.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    if(!regex.test(newNumber)){
      setMessage('eg. 09-1234556 and 040-22334455 are valid phone numbers')
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return
    }

    if (checkDuplicate(persons)) {
      alert(`${newName} is already existed`);
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number?`
        )
      ) {
        const existingNum = persons.find((el) => el.name === newName);
        const updateNum = { ...existingNum, number: newNumber };

        console.log("existing", existingNum);

        personServices.update(existingNum.id, updateNum).then((res) => {
          personServices
            .getAll()
            .then((result) => {
              console.log("Promise fulfilled");
              setPersons(result.data);
            })
            .catch((err) => console.error(err));
        });
        cleanForm();
      }
    } else {
      personServices
        .createPerson(person)
        .then((result) => {
          console.log(result);
          setPersons((result) => {
            return [...result, person];
          });
          cleanForm();

          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 1500);
        })
        .catch((error) => {
          setMessage(error.response.data.error);
        });
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((el) => el.id === id);
    console.log(personToDelete, persons);
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personServices.deletePerson(id).then((res) => {
        console.log(persons);
        setPersons((result) => {
          return result.filter((el) => el.id !== id);
        });
      });
    }
  };

  useEffect(() => {
    console.log("effect");
    personServices.getAll().then((result) => {
      console.log("Promise fulfilled");
      setPersons(result.data);
    });
  }, []);

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
      <Notif message={errorMessage} />
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

      <Persons persons={filteredList} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
