import { useState, useEffect } from "react";
import axios from "axios";

function Fakestore(){
    let initialValue =[];
    let [value,setValue]=useState(initialValue);

    useEffect(function(){
        
        getDetails();
    },[]);

    function getDetails(){
        axios.get("https://fakestoreapi.com/products")
    .then(function(response){
        console.log(response.data)
        setValue(response.data);
    })

    
    .catch(function(error){
        console.log(error);
    });
}
    return(
        <div className="FakeStore">
            <h1>Fake Store Details</h1>
        {value.map(function(val,index){
            return <div>
            <b>Title:</b>{val.title}
            <div>
            <b>Price:</b> {val.price}
            </div>
            <div>
            <b>Description:</b> {val.description}
            </div>
            <div>
            <b>Category:</b>{val.category}
            </div>
            <div>
            <b>Image:</b><img src={val.image} />
            </div><br/>
            
            </div>

                
        })}
        </div>
    

    )
}

export default Fakestore;