import { useState } from "react";

function StudentObj(){
    let studentInfo = function(name,age){
    this.name= name;
    this.age = age;
    this.showName = function(){
        return this.name;
    }

    this.showAge = function(){
        return this.age;
    }
    }

    let [stName, StudentNameVal] = useState("");
    let [stAge, StudentAgeVal] = useState("");
    let[resultAr, resultVal] = useState([]);

    function stname1(e){
        StudentNameVal(e.target.value);
    }
    function stage1(e){
        StudentAgeVal(e.target.value);
    }

    function Addstudent(name, age){
        let studentOb = new studentInfo(name, age);
        console.log(studentOb);
        let newResult = [...resultAr, studentOb]
        resultVal(newResult);
    }

    function deleteStudent(indexToDelete){
        let newStudent = resultAr.filter(function (val,index){
            if (indexToDelete == index) return false;
            return true;
        });
        resultVal(newStudent);
    }

    function clearAll(){
        resultVal([])
    }
    return (
            <div className="Student">
            <h2>Student Details</h2>
            <input type="text" name="name" value={stName} onChange={stname1} placeholder="Enter Name"/><br></br>
            <input type="text" name="age" value={stAge} onChange={stage1} placeholder="Enter Age"/><br></br>
            <button onClick={function(){
                Addstudent(stName, stAge);
            }}>Addstudent</button><br></br>
            <button onClick={clearAll}>ClearAll</button><br></br>
            {resultAr.map(function (val, index){
                return <div>{val.showName()} Age:{val.showAge()}
                <button onClick={function (){
                    deleteStudent(index);
                }}>Delete</button>
                </div>;
    } )}
            </div>
        );
    }
  


export default StudentObj;