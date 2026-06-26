const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8080;
// REST API
app.get("/api/users", (req, res) => { //api= it is a json data   
    return res.json(users);           // without api= html data
});
// Dynamic Path Parameters
// GET/api/users/:id
// :id -> Variable | Dynamic


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