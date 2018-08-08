var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var todoRoutes = require("./routes/todos")

app.use(bodyParser.json({ type:'application/json; charset=utf-8'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.use("/api/todos", todoRoutes);

app.get("/", function(req, res){
    res.sendFile("index.html");
})




app.listen(process.env.PORT, function(){
    console.log("app is running on port " + process.env.PORT)
})  