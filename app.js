const express=require('express');
const app=express();
const mongoose=require('mongoose');

const PORT=5000;
const {MONGOURI} =require('./keys');



mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connect yeah!!");
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting....");
})

require('./models/user')
require('./models/post')
app.use(express.json());
app.use(require('./route/auth'));
app.use(require('./route/post'));

// 551Z2eBRIZu63p71



app.listen(PORT,()=>{
     console.log("Server Starting on Port No "+PORT);
})