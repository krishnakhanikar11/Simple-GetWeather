

const express = require("express");
const https = require("https");
const bodyParser  = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=652ace8bf14cc4de10fe048816817834&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const img_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temp of "+ cityName + " is " + temperature + " degree.</h2>");
            res.write("<p>The Weather is currently " + description + "</p>");
            res.write("<img src ="+img_url+">");
            res.send()
        })

    })
    

})

app.listen(3000,function(){
    console.log("the server is running");
})