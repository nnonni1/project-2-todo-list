const express=require('express')
const app=express()
const db=require('./db')
const Todo=require('./todo')
const cors= require('cors')
const User= require('./user')



//console.log(Todo);
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{

    res.json('GET/is Working')
})

  //الكويري بارمز ,نحط اسم الرابط واستفهام بعدين الشرط
  //  filter?isComplete=true || filter?isComplete=false
app.get('/filter',(req,res)=>{
    console.log(req.query);
 Todo.find({isCompleted: req.query.isCompleted },(err,data)=>{
if(err){
 console.log('ERR',err);
}else{
  console.log(data);
  res.json(data)
}

})

})


app.delete('/tasks',(req,res)=>{
    console.log(req.query);
 Todo.deleteMany({ isCompleted: true },(err,deleteObj)=>{

if(err){
    console.log('ERROR: ',err)
}else{
    console.log(deleteObj)

   deleteObj.deletedCount === 0 
   ? res.status(404).json("There are not comleted todo found ")
   : res.json("Delete all copmleted todo seccessfully") 
   

}

})

})


//الابديت الثانية

app.put('/tasks/:id/:isCompleted',(req,res)=>{
      console.log(' 124 :',req.params);
Todo.updateOne(
   { _id: req.params.id},
  {isCompleted: req.params.isCompleted},
  (err, updateObj)=>{         
  if(err){ 
    res.status(400).json(err)
   }else{
      console.log(updateObj);
      updateObj.modifiedCount === 1
    ? res.json("Update one todo seccessfully") 
   : res.status(404).json("This todo is not found ");
       }
        });
       }); 
      





app.get('/tasks',(req,res)=>{

Todo.find({},(err,data)=>{
 
 if(err){
     console.log('ERROR: ',err)
 }else{
     res.json(data);
 }
  });
});


app.post('/tasks',(req,res)=>{
Todo.create(req.body,(err,newTask)=>{
     
if(err){
     console.log('ERROR: ',err)
}else{
     res.status(201).json(newTask);
 }
  });
 });

 
 app.post('/user/register',(req,res)=>{
  User.create(req.body,(err,newUser)=>{
       
  if(err){
       console.log('ERROR: ',err)
       res.status(400).json({message:'this email alrady taken'})
  }else{
       res.status(201).json(newUser);
   }
    });
   });
  

   app.post('/user/login',(req,res)=>{
    User.find({email:req.body.email},(err, arrUserFound)=>{
         
    if(err){
         console.log('ERROR: ',err)
    }else{
      //console.log(data);

      if(arrUserFound.length === 1){
        //we found the user
      if(req.body.password=== arrUserFound[0].password){
        res.status(200)
        .json({
          message:"login Seccssfuly",
          username: arrUserFound[0].username,
        });
        } else{
          res.status(400).json({message:"Wrong password"})}
   }else{
        res.status(404).json({
          message:"The email entered is not registerd"
      })
      }
     } // res.json(data);
     
      });
     });
   


 app.delete('/tasks/:id',(req,res)=>{
    console.log('37:',req.params.id)

 Todo.deleteOne({_id: req.params.id},(err,deleteObj)=>{
         
    if(err){
         console.log('ERROR: ',err)
    }else{
        deleteObj.deletedCount === 1
        ? res.json('delete this todo seccessfully') 
        :res.status(404).json("This todo is not found ")
     }
      });
     });
    

app.put('/tasks/:id',(req,res)=>{
      //  console.log(' 33:',req.params.id)
    
 Todo.updateOne(
     {_id: req.params.id},
    {title: req.body.newTitle},
    (err, updateObj)=>{         
    if(err){ 
      console.log("ERROR: ",err);
      res.status(400).json(err)
     }else{
        console.log(updateObj);
        updateObj.modifiedCount === 1
      ? res.json("Update one todo seccessfully") 
     : res.status(404).json("This todo is not found ");
         }
          });
         });
        

 

app.listen(5000,()=>{
    console.log('server is Working');
})

