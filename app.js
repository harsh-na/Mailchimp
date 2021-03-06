//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));//it specifies static files so that css and other things can get included
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){

const firstName=req.body.fName;
const lastName=req.body.lName;
const email=req.body.email;

const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};
const jsonData=JSON.stringify(data);

const url="https://us14.api.mailchimp.com/3.0/lists/928312dc55";

const options={
    method:"POST",
    auth:"harshit:871544c25d5d05e1f0242ba26659bcd3-us14"
}

const request= https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();
});



app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000");
});


// api key
// 6ee95e9d9602b4a2d939f31ae6fd6963-us14
//List id
//416ca1fd9a


// api key 
// 871544c25d5d05e1f0242ba26659bcd3-us14
// audience id
// 928312dc55