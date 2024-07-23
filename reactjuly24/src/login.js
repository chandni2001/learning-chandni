import { useParams } from "react-router-dom";
function Login(){
    let param = useParams();
    console.log(param);
    
    function doLogin(){
        alert("Wow, now i can login also");
    }
    return (
        <div className="Login">
            <h1>{param.title}</h1>
            <h2>{param.tokenId}</h2>
            <input type="Text" name="username" />
            <input type="password" name="password" />
            <button onClick={doLogin}>Login Now!</button>

        </div>

    );
}

export default Login;