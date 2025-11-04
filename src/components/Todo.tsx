import { useTodos } from "../store/TODo"
import { useSearchParams } from "react-router-dom";

function Todo() {
    const {todos,toggleTodoAsCompleted,handleDeleteTodo} = useTodos();
    const [searchParams] = useSearchParams();

    let todosData = searchParams.get('todos');
    
    let filterData = todos;

    if(todosData === 'active'){
        filterData = filterData.filter((task) => !task.completed)
    }
    else if(todosData === 'completed'){
        filterData = filterData.filter((task) => task.completed)
    }
    else{
        filterData= todos
    }

  return (
    <ul className="main-task">
      {
        filterData.map((todo) => {
            return <li key={todo.id}>
                <input type="checkbox" id={`todo-${todo.id}`} checked = {todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)}/>
                <label htmlFor="">{todo.task}</label>
                {
                    todo.completed && (
                        <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    )
                }
            </li>
        })
      }
    </ul>
  )
}

export default Todo
