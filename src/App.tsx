import AddTODO from "./components/AddTODO"
import Navbar from "./components/Navbar"
import Todo from "./components/Todo"

function App() {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
      <AddTODO/>
      <Todo/>
    </main>
  )
}

export default App
