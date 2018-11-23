var express = require("express");
var app = express();
var request = require("request"); //API request
app.set("view engine","ejs");

app.get("/", function(req,res){
    res.render("search");
})
app.get("/results", function(req,res){
    var query = req.query.search; //get request query from form
    var url = "http://www.omdbapi.com/?s="+query +"&&apikey=thewdb";
    request(url, function(error,respond,body){
        if(!error & respond.statusCode == 200){
            var data = JSON.parse(body);// transform string into object
            //res.send(data["Ratings"][0]["Value"]);//getting only value
            res.render("results", {data:data});
        }
    });
    //res.send("Hello");
});

app.listen(process.env.PORT, process.env.ID,function(){
    console.log("Movie Server Started.");
})