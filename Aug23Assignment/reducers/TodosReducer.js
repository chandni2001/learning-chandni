

const initialState = {
  todos: [
      // { name: "default todo1", status: "complete" },
      // { name: "default todo2", status: "incomplete" },
  ],
};

const TodosReducer = (state = initialState, action) => {
  if (action.type === "ADD") {
      let newTodos = [...state.todos, action.todo];
      let newState = { ...state, todos: newTodos };
      return newState;
  }

  if (action.type === "DELETE") {
      let newTodos = state.todos.filter((_, index) => index !== action.index);
      let newState = { ...state, todos: newTodos };
      return newState;
  }

  if (action.type === "EDIT") {
      let updatedTodos = state.todos.map((todo, index) =>
          index === action.index ? action.todo : todo
      );
      let newState = { ...state, todos: updatedTodos };
      return newState; 
  }

  if (action.type === "DELETE_ALL") {
      let newState = { ...state, todos: [] };
      return newState;
  }
  if (action.type === "LOAD_TODOS") {
    let newState = {...state, todos: action.todos};
    return newState;
  }
  return state;
};

export default TodosReducer;