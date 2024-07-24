import { useState } from "react";
import axios from "axios";

function Githubproblem() {
    let [name, setName] = useState("");
    let [nameData, setNameData] = useState(null);

    function changeName(e) {
        setName(e.target.value);
    }

    function showProfile() {
        let url = `https://api.github.com/users/${name}`;
        axios
            .get(url)
            .then(function (response) {
                console.log(response.data);
                setNameData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="Github">
            <h1>Git Hub Profile</h1>
            <input type="text" name="name" onChange={changeName} value={name} placeholder="Enter a name" className="input-field"/><br></br>
            <button onClick={showProfile} className="show-button">Show profile</button>
            {nameData && (
                <div >
                    <p><b>Id:</b> {nameData.id}</p>
                    <p><b>Avatar:</b> <img src={nameData.avatar_url}  /></p>
                </div>
            )}
        </div>
    );
}

export default Githubproblem;
