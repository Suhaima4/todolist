import React ,{useEffect, useState} from "react";
import{ BsFillTrashFill,BsCircleFill,BsFillCheckCircleFill} from "react-icons/bs"
import Create from'./Create'

import axios from "axios";

function Home(){

 const [todos,setTodos] = useState([])
 useEffect(()=>{
    axios.get('http://localhost:5000/get')
    .then(result =>setTodos(result.data))
    .catch(err => console.log(err))
 },[])



 const handleEdit = (id) =>{
    axios.put('http://localhost:5000/update/'+id)
    .then(result => {
       window.location.reload()
    })
    .catch(err => console.log(err))
}


const handleDelete = (id) =>{
    axios.delete('http://localhost:5000/delete/'+id)
    .then(result => {
       window.location.reload()
    })
    .catch(err => console.log(err))
}


    return(
        <div className="home">
            <h2> Todo List</h2>
            <Create/>
            <br/>
            {
                todos.length === 0
                ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo =>(
                 <div  key={todo._id} className='task'>
                    <div className='checkbox' onClick={() =>handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill className ='icon'></BsFillCheckCircleFill>
                        :
                        <BsCircleFill className ='icon'/>
                        }
                       <p className = {todo.done ? "linethrough" : ""}> {todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className = "icon"  onClick={() => handleDelete(todo._id)}/></span>
                            </div>
                            </div>
                ))
            }
        </div>
    )

}
export default Home