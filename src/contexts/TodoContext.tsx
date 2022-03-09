import { title } from "process";
import { createContext, useEffect, useState } from "react";
import { Todo } from "../models/Todo";
import { get, save } from "../services/TodoService";
import { TodoContextType } from "./TodoContextType";

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    removeTodo: () => { },
    toggle: () => { }
});

const TodoProvider = (props: any) => {
    const [todos, setTodos] = useState<Todo[]>(get);

    const addTodo = (title: string) => {
        const todo: Todo = { id: todos.length + 1, title: title, done: false };
        setTodos([...todos, todo]); //percorre a lista e acrescenta mais 1 objeto.
    }

    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        setTodos(todos.filter((_, i) => i !== index)); // lista todos os TODOS que seja diferença do indexOf do TODO removido.
    }

    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
    }

    useEffect(() => {
        save(todos);
    }, [todos]); // ele fica monitorando o objeto 'todos', sempre quando ele for alterado, ele chama a função save.

    return (
        <TodoContext.Provider value={{todos, addTodo, removeTodo, toggle}}> 
            {props.children} 
        </TodoContext.Provider>
    );
}

export default TodoProvider;