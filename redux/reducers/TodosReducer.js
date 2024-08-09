// const initialState={
//     todos:[
//         {name:"default todos1", status:"complete"},
//         {name:"default todos2", status:"incomplete"}
//     ],
// };

// const TodosReducer=(state=initialState,action)=>{
//     if(action.type=="ADD"){
//         let newTodos = [...state.todos,action.todo];
//         let newState={...state,todos:newTodos};
//         return newState;
//     }
//     return state;
// }
// export default TodosReducer;


// TodoReducer.js

const initialState = {
    todos: [
      { id: 1, name: "default todos1", status: "complete" },
      { id: 2, name: "default todos2", status: "incomplete" }
    ]
  };
  
  const TodosReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          todos: [
            ...state.todos,
            { id: Date.now(), ...action.todo } // Assign a unique ID
          ]
        };
        
      case "REMOVE":
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload.id)
        };
  
      case "EDIT":
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, ...action.payload.updates }
              : todo
          )
        };
  
      case "REMOVE_ALL":
        return {
          ...state,
          todos: []
        };
  
      default:
        return state;
    }
  };
  
  export default TodosReducer;
  