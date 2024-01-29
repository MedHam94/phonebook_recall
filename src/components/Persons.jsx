const Persons = ({persons,handleDelete}) =>{
    return (
        <ul>
            {persons.map((person)=>{
               return <li key={person.name}>{person.name} {person.number} <button onClick={handleDelete}>delete</button> </li>
            })}
        </ul>
    )
}

export default Persons