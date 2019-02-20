
const express = require('express');

const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017`)
app.use(cors());

app.use(express.json())


const post = require('./posts');

app.get('/post', (req, res)=>{
    post.find()
        .then(
            (result) => res.send({result})
        )
        .catch(err => res.send({err}))
});

app.post('/post', (req, res)=>{
    const newPost = new post({
        title: req.body.title,
        desc: req.body.desc
    });

    newPost.save()
           .then((result)=>{
                res.send({result})
           })
           .catch((err)=>{
                res.status(500).send({err})
           })
})


app.put('/post/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    post.updateOne({_id: id}, {
        $set:{
            title: req.body.title,
            desc: req.body.desc
        }
    })
    .then(result => res.send({result}))
    .catch(err => res.status(500).send({err}))
})

app.delete('/post/:id', (req,res)=>{
    const id = req.params.id;
    post.deleteOne({_id: id})
        .then(
            result => res.send({result})
        )
        .catch(
            err => res.status(500).send({err})
        )
});
app.listen(9000, ()=>{
    console.log("API started at 9000 port")
})