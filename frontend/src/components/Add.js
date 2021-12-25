import React , {useState} from 'react';

export default function Add(props) {
const [newTitle, setNewTitle] = useState('')

const createNewTodo = () => {
console.log('createNewTodo from Add');
 // {"title":"task 1","isCompleted":false}
props.createFunc({title:newTitle, isCompleted:false});
 };

return(
 <div className="add">
<input type="text" placeholder='write new title here ...'
onChange={(e)=>{
    setNewTitle(e.target.value)

}} />
<button onClick={createNewTodo}>Creat New Todo </button>
  
 </div>



)

}