import { useState, type FormEvent } from "react"
import { useTodos } from "../store/TODo";


function AddTODO() {
    const[value,setValue] = useState("");
    
    const {handleAddToDO} = useTodos();

    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddToDO(value)
        setValue("")
    }
  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter the value"/>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTODO
