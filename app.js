const http=require('http');
const fs=require('fs');
const { URLSearchParams }=require('url');

const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/registration')
    .then(function(){
        console.log('DB Connected')
    })
const usersschema=new mongoose.Schema({firstname:String, lastname:String, email:String, password:String});
const Usersmodel=mongoose.model('Users',usersschema);



const server=http.createServer(function(req,res){
    if(req.url==='/'){
        res.writeHead('200',{'Content-Type':'text/html'});
        fs.createReadStream('registration.html').pipe(res);

    }
    else if(req.url==='/signup' &&  req.method==='POST'){
        var rawdata=' ';
        req.on('data',function(data){
            rawdata +=data;

        })
        req.on('end',function(){
            var formdata=new URLSearchParams(rawdata);
            res.writeHead('200',{'Content-Type':'text/html'});
            Usersmodel.create({firstname:formdata.get('firstname'),
                               lastname:formdata.get('lastname'),
                               email:formdata.get('Email'),
                               password:formdata.get('password')
                            })
            res.write('Data saved successfully');
            res.end();
            
            
        })
    }

    
    
})

server.listen('8000',function(){
    console.log('Server started at port http://127.0.0.1:8000');

})

