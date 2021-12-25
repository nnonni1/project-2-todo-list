 import React, { useEffect} from 'react'
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Todo from './components/Todo';
import Add from './components/Add';

export default function App() {

const [tasks, setTasks] = useState([]);

useEffect(()=> {

  getData()
},[] )

const getData = () => {
   axios
  .get('http://localhost:5000/tasks')
  .then((response) =>{
  // console.log('RESPONSE: ', response);
   console.log('DATA: ', response.data);
   setTasks(response.data)
  })
  .catch((err) =>{
  console.log("ERR: ", err);

   });

  };


const postNewTodo= (body)=> {
 // {"title":"task 1","isCompleted":false}

  axios
  .post('http://localhost:5000/tasks',body)
  .then((response) =>{
  // console.log('RESPONSE: ', response);
   console.log('DATA: ', response.data);
   //setTasks(response.data)
   getData()
  })
  .catch((err) =>{
  console.log("ERR: ", err);
  

});

};
 
const deleteTodo= (id)=> {
  // {"title":"task 1","isCompleted":false}
 
   axios
   //نستخدم الشرطة فوق "حرف ذ"عشان يكون اد متغير
   .delete(`http://localhost:5000/tasks/${id}`)
   .then((response) =>{
   // console.log('RESPONSE: ', response);
    console.log('DATA: ', response.data);
    //setTasks(response.data)
    getData()
   })
   .catch((err) =>{
   console.log("ERR: ", err);
   
 
 });
 
 };
  
 

  const mapOverTasks = tasks.map((taskObj, i) => ( 
  <Todo key={i} task={taskObj} deleteTodo={deleteTodo} />  
  

  ));


return (
<div className="app">

  <h2>TO DO List</h2>
  <Add createFunc={postNewTodo}/>
  <button onClick={getData}>Get Task </button>
  {mapOverTasks}


</div>

);

}