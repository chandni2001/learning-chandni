import {createStore, combineReducers} from "redux";
import CounterReducer from "../reducers/CountReducers";
import TodosReducer from "../reducers/TodosReducer";
let store = createStore(
    combineReducers({
        count:CounterReducer,todos:TodosReducer
    })
);
export default store;
