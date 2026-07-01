const express = require("express"); // Learning Express REST APIs
const mongoose= require("mongoose"); // step 1
const app = express();
const PORT = 8080;
// Connection 
  mongoose.connect ('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(()=>     console.log("MongoDB connected"))                      // step 2 
  .catch( (err)  => console.log("Mongo Error", err));
//schema (step 3)
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
const User = mongoose.model (' user ' , userSchema); // step 4


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
app.post("/api/users", async (req, res) => {
    const body = req.body;
    
    if (!body || !body.last_name || !body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required..." });
    }

    
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });

        console.log ("result" , result);

        return res.status(201).json({ msg: 'success'});

        
});

app.patch ("/api/users/:id" , async(req , res)=>{
  await User.findByIdAndUpdate(req.params.id , { lastName: "Changed"});
  return res.json ({ status : "Success"});
})






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 