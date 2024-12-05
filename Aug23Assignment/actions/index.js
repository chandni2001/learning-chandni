export const addTodo = (text) => ({
    type: 'ADD_TASK',
    payload: {
      id: new Date().getTime(),
      text: text,
    }
  });
  
  export const deleteTodo = (id) => ({
    type: 'DELETE_TASK',
    payload: id,
  });
  