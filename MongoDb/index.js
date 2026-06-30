const express = require("express"); // Learning Express REST APIs
const fs= require('fs');
const mongoose= require("mongoose");
const app = express();
const PORT = 8080;
// Connection 
  mongoose.connect ('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(()=>     console.log("MongoDB connected"))
  .catch( (err)  => console.log("Mongo Error", err));
//schema
const userSchema = new mongoose.Schema({

firstName : {
    type: String,
    required: true,

},
  lastName: {
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  jobTitle :{
    type: String
  },
  gender:{
    type: String,
  },
});
const User = mongoose.model (' user ' , userSchema);


//Middleware- Plugin (inserts form data into body);
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
   req.myUserNme = "kirtikaushik.dev";
    next();
});
app.use ((req,res, next) =>{
    console.log ("Hello from Middleware 2" , req.myUserName);
    next();

});

// REST API
app.get("/api/users", (req, res) => { 
   res.setHeader("X-MyName" , "Kirti Kaushik")  ; // Custum Header                                 
    // Always add X to custum headers
                                         //api= it is a json data   
    return res.json(users);           // without api= html data
});
// Dynamic Path Parameters
// GET/api/users/:id
// :id -> Variable | Dynamic
app.post("/api/users", async (req,res)=>{
    const body = req.body;
    if(!body  ||!body.last_name ||   !body.first_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg: "All feilds are req..."});
    }

  
    });





app
.route ("/api/users/:id")
.get((req,res)=>{
    const id= Number(req.params.id) ; // since id is string we will change it to number})
    const user = users.find((user)=> user.id==id) ;
    if(!user) return res.status(404).json({ error:"user not found"});
    return res.json(user);
})
.patch((req,res)=> {
    // Edit user with id
    return res.json( {status: "pending"});

})
.delete((req,res)=> {
    //Delete user
     return res.json( {status: "pending"});
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 