import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createJsxJsxClosingFragment } from "typescript";
import * as yup from 'yup';
import { TodoContext } from "../contexts/TodoContext";
import { TodoContextType } from "../contexts/TodoContextType";
import { Todo } from "../types/types";

const schema = yup.object().shape({
    title: yup.string().required('Tarefa inválida'),
});


const AddTodo = () => {
    const { addTodo } = useContext<TodoContextType>(TodoContext);
    const [newTodo, setNewTodo] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, } = useForm({
        //    resolver: yupResolver(schema),
    });

    const onInputChange = (e: any) => {
        setNewTodo(e.target.value);
    }

    const addTodoOnList = () => {
        addTodo(newTodo);
        setNewTodo('');
        window.location.href = '/';
    }

    return (
        <>
            <h4>Nova tarefa</h4>
            <div className="uk-margin uk-width-1-1">
                <input
                    type="text"
                    value={newTodo}
                    name="title"
                    id="title"
                    onChange={(e) => onInputChange(e)}
                    placeholder="Nova tarefa..."
                    className="uk-input" />
                <span>
                    <small>
                        <strong className="uk-text-danger">{errors.title?.message}</strong>
                    </small>
                </span>
            </div>
            <div className="uk-width-1-1">
                <button
                    type="button"
                    onClick={(e) => addTodoOnList()}
                    className="uk-button uk-button-primary">Adicionar</button>
            </div>
        </>
    )
}

export default AddTodo;

