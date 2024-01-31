const PersonForm = ({handleNameChange,newName,handleNumberChange,newNumber,submitForm})=>{
    
    return(
        <form>
            <div>
                name: <input type="text" onChange={handleNameChange} value={newName} />
            </div>
            <div>
                number: <input type="text" onChange={handleNumberChange} value={newNumber} />
            </div>
            <div>
                <button type="submit" onClick={submitForm}>add</button>
            </div>
        </form>
    )
}

export default PersonForm