import axios from "axios";
const addAction = (todo) => ({ type: "ADD", todo: todo });
const deleteAction = (index) => ({ type: "DELETE", index });
const editAction = (index, todo) => ({ type: "EDIT", index, todo });
const deleteAllAction = () => ({ type: "DELETE_ALL" });
const  asyncAddAction = (todo) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: "ADD", todo: todo});
        }, 4000);
    };
};
const loadInitialTodo = () =>{
    return (dispatch) => {
        axios.get("/todos")
        .then((res) => {
            console.log(res.data);
            return dispatch({type: 'LOAD_TODOS',todos:res.data})
        })
    }
}
export { addAction, deleteAction, editAction, deleteAllAction, asyncAddAction, loadInitialTodo };