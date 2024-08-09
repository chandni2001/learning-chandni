import {useDispatch, useSelector} from "react-redux";
const ReduxCounter = ()=>{
    const dispatch = useDispatch();
    const returnVal = useSelector((state)=>{
        console.log(state);
        return state.count;
    });

    const increase =()=>{
        dispatch({type:"INCREASE",step:5});
    };
    const decrease =()=>{
        dispatch({type:"DECREASE",step:3});
    };

    return (
        <div>
            <h3>{returnVal.count}</h3>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
};
export default ReduxCounter;