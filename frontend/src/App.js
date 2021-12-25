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

 const deleteTasks= (id)=> {
  // {"title":"task 1","isCompleted":false}
 
   axios
   //نستخدم الشرطة فوق "حرف ذ"عشان يكون اد متغير
   .delete('http://localhost:5000/tasks/')
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
  
 
const toggleTodo= (id,newStatus)=> {
  // {"title":"task 1","isCompleted":false} 
  axios
  //نستخدم الشرطة فوق "حرف ذ"عشان يكون اد متغير
  .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
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

 const filterData = (status) => {
  axios
 .get(`http://localhost:5000/filter?isCompleted=${status}`)
 .then((response) =>{
 // console.log('RESPONSE: ', response);
  console.log('DATA: ', response.data);
  setTasks(response.data)
 })
 .catch((err) =>{
 console.log("ERR: ", err);

  });

 };



  const mapOverTasks = tasks.map((taskObj, i) => ( 
  <Todo key={taskObj._id}
   task={taskObj} 
  deleteTodo={deleteTodo}
  toggleTodo={toggleTodo} />  
  

  ));


return (
<div className="app">
 
 <img src="https://h.top4top.io/p_2185l91a31.jpg" alt="TO do list" width="500" height="200"/>

  <br/>
  <button className="style" onClick={getData}>Get Task </button>
  <button className="style" onClick={deleteTasks}>Delet All task comleted </button>
  <button className="style" onClick={()=>{
    filterData(true)}}>Get Done </button>
  <button className="style" onClick={()=>{
    filterData(false)}}>Get Pending </button>

  <Add createFunc={postNewTodo}/>
  {mapOverTasks}


</div>

);

}