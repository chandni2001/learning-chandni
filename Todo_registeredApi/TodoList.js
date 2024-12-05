import TodoItem from "./TodoItem";

function TodoList({ todos, DeleteTodo }) {
    return (
        <>
            {todos.map((val) => (
                <TodoItem 
                    key={val._id}
                    val={val}
                    DeleteTodo={DeleteTodo} 
                />
            ))}
        </>
    );
}

export default TodoList;
