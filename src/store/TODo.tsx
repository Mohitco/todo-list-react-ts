import { createContext, useContext, useState, type ReactNode } from "react";

export type TodoProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoContexts = {
    todos: Todo[];
    handleAddToDO: (task: string) => void;
    toggleTodoAsCompleted: (id:string) => void;
    handleDeleteTodo: (id:string) => void;
}

export const TodoContext = createContext<TodoContexts | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(()=>{
        try {
            const newTodos = localStorage.getItem('todos') || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    })
    const handleAddToDO = (task: string) => {
        setTodos((pre) => {
            const newTodo: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...pre
            ]
            localStorage.setItem('todos',JSON.stringify(newTodo));

            return newTodo;
        })
    }

    //mark completed

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((pre) => {
            let newTodos = pre.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            })
             localStorage.setItem('todos',JSON.stringify(newTodos))
            return newTodos
        })
    }

    //delete todos

    const handleDeleteTodo = (id:string) => {
        setTodos((pre)=>{
            let newTodos = pre.filter((filterTodo) => filterTodo.id !== id);
             localStorage.setItem('todos',JSON.stringify(newTodos))
            return newTodos;
        })
    }

    return <TodoContext.Provider value={{ todos, handleAddToDO, toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </TodoContext.Provider>
}


//consumer

export const useTodos = () => {
    const todosConsumer = useContext(TodoContext);
    if (!todosConsumer) throw new Error("Use Todos suing outside provider");
    return todosConsumer
}