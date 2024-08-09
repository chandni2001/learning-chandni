// const addAction =(todo)=>({type:"ADD",todo:todo});

// export {addAction};


// todoactions.js

const addAction = (todo) => ({
    type: "ADD",
    todo
  });
  
  const removeAction = (id) => ({
    type: "REMOVE",
    payload: { id }
  });
  
  const editAction = (id, updates) => ({
    type: "EDIT",
    payload: { id, updates }
  });
  
  const removeAllAction = () => ({
    type: "REMOVE_ALL"
  });
  
  export { addAction, removeAction, editAction, removeAllAction };
  