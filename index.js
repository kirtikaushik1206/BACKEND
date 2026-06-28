const express = require('express'); // Learning Express REST APIs
const fs= require('fs');
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8080;


//Middleware- Plugin (inserts form data into body);
app.use(express.urlencoded({extended:false}));


// REST API
app.get("/api/users", (req, res) => { //api= it is a json data   
    return res.json(users);           // without api= html data
});
// Dynamic Path Parameters
// GET/api/users/:id
// :id -> Variable | Dynamic
app.post("/api/users", (req,res)=>{
    const body = req.body;

    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        return res.json({status:"success"  , id: users.length+1});
    });


}
);

app
.route ("/api/users/:id")
.get((req,res)=>{
    const id= Number(req.params.id) ; // since id is string we will change it to number})
    const user = users.find((user)=> user.id==id) ;
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