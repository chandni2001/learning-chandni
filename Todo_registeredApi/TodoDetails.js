import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './css/TodoDetails.css'; // Adjust the path if necessary

function TodoDetails() {
    const [todoData, setTodoData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/todo/${id}`)
            .then(response => {
                setTodoData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="todo-details-container">
            <div>Title: {todoData.name}</div>
            <div>Status: {todoData.status}</div>
            <div>Todo ID: {todoData._id}</div>
            <div>Description: {todoData.description}</div>
            <Link to={`edit`}>Edit Todo</Link>
        </div>
    );
}

export default TodoDetails;
