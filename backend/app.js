const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended : false}));


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin" , "*");
  res.setHeader("Access-Control-Allow-Headers" , "Origin , X-Requested-With , Content-Type , Accept");
  res.setHeader("Access-Control-Allow-Methods" , "GET, POST, PATCH, DELETE, OPTIONS");

  next();
});


app.post ("api/posts" , (req, res, next) =>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message : 'Post Added Succesfully'
  });
})


app.use('/api/posts',(req, res, next) => {
  const posts = [
    {id : 'id1' , title : " First server side post" ,content : "This is comefrom server"},
    {id : 'id2' , title : " second server side post" ,content : "This is comefrom server"}

  ];
  res.status(200).json({
    message : 'Post Fetched Succesfully mean stack project',
    posts : posts
  });


})


module.exports = app;
