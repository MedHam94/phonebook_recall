const Persons = ({persons,handleDelete}) =>{

    
    return (
        <ul>
            {persons.map((person,id)=>{
               return <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> </li>
            })}
        </ul>
    )
}

export default Persons