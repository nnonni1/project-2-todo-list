import React from 'react';

export default function Todo(props) {

 const {_id , title , isCompleted} = props.task

return(
 <div className="todo">
<input type="checkbox" defaultChecked={isCompleted} onClick={
    ()=>{
        props.toggleTodo(_id,!isCompleted)
  
    }
}/>
<span style={{textDecoration:isCompleted? 'line-through':"none"}}>TITLE: {title}  </span>
<button onClick={()=>{
    props.deleteTodo(_id)
}}>x</button>

 </div>



)

}