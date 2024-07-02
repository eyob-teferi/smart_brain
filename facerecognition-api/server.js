const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');


const db = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: '',
      password: '',
      database: 'face_recognition',
    },
  })

  

const app=express();

app.use(express.json());
app.use(cors());



app.get('/',(req,res)=>{

    res.json('success');
})


app.post('/signin',(req,res)=>{
    db.select('hash','email')
    .from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isValid=bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            db.select('*')
            .from('users')
            .where('email','=',req.body.email)
            .then(user=>{
                res.json(user[0]);
            })

            .catch(err=>{
                res.status(400).json('unable to get user')
            })
        }else{
            res.status(400).json('Wrong Crediantials')
        }
    })
    .catch(err=>{
        res.status(400).json('Wrong Crediantials')
    })
})

app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;

    var hash = bcrypt.hashSync(password);

    db.transaction((trx)=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then((loginemail)=>{
            console.log(loginemail);
            trx.insert({
                name:name,
                email:loginemail[0].email,
                joined:new Date()
            })
            .into('users')
            .returning('*')
            .then((user)=>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>{
        res.status(400).send('error while registering')
    })
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;

    db('users').select('*').from('users').where({
        id:id
    })
    .then(user=>{
        if(user.length > 0){
            res.json(user[0]);
        }else{
            res.status(404).send('NOT FOUND')
        }
    })
    .catch(err=>{
        res.status(400).send('error while retrivieng')
    })
})

app.put('/images',(req,res)=>{
    const {id}=req.body;

    db('users')
    .where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries=>{
        res.json(enteries[0]);
    })
    .catch(err=>{
        res.status(400).send('error updating enteries')
    })
})




app.listen(3000,()=>{
    console.log('app is working')
})