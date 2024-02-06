const PersonForm = ({handleNameChange,newName,handleNumberChange,newNumber,submitForm})=>{
    
    return(
        <form>
            <div>
                name: <input type="text" onChange={handleNameChange} value={newName} required  />
            </div>
            <div>
                number: <input type="text" onChange={handleNumberChange} value={newNumber} required  />
            </div>
            <div>
                <button type="submit" onClick={submitForm}>add</button>
            </div>
        </form>
    )
}

export default PersonForm