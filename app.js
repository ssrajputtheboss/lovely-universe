import Datas from './mongo.js';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
let __dirname = path.resolve(path.dirname(''));
const connection_url = 'mongodb url here';

const app = express();
//
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.static(path.join(__dirname, 'public')));

//db config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

/*//for adding data
app.get('/adddata',(req,res)=>{
    res.send(`
    <h1> Add New Data! </h1>
    <form action="/datas" method="post">
        name:<input type="text" name="name" required/><br>
        imgurl:<input type="text" name="imgurl" required/><br>
        about:<input type="text" name="about" required/><br>
        <input type="submit" value="Submit"/>
    </form>
    `)
});*/


app.get('/cards',(req,res)=>{
    Datas.find((err,data)=>{
        if(err)
            res.status(500).send(err);
        else{
            let cards = [];
            data.forEach((x)=>{
                cards.push({
                    name:x.name,
                    imgurl:x.imgurl,
                    about:x.about
                });
            })
            res.status(200).send({cards:cards});
        }
    })
})

app.post('/datas',(req,res)=>{
    const data = req.body;
    console.log(data);
    Datas.create(data , (err,data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    })
})

app.get('/home',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/',(req,res)=>{
    res.redirect('/home')
})

app.listen(4000||process.env.PORT);
