const { log } = require('console');
const { render } = require('ejs');
var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/',function(req,res,next){
  fs.readdir('./files',function(err,data){
    console.log(data);
    res.render('index',{title:'Express',data:data})
  })
})
router.post('/create',function( req,res, next){
  fs.writeFile(`./files/${req.body.filename}`,"",function(err,data){
    console.log(data);
    res.redirect('/')
  })
})
router.get('/:name',function(req,res,next){
  console.log(req.params.name);
  fs.readdir('./files',function(err,data){
   fs.readFile(`./files/${req.params.name}`,"utf-8",function(err,filedata){

     res.render('file',{title:'Express',data:data,filedata:filedata,filename:req.params.name})
   })
  })
})
router.get('/dlt/:naam',function(req, res, next){
  fs.unlink(`./files/${req.params.naam}`,function(err){
    res.redirect('/')
  })
})
router.post('/save/:naam',function(req, res, next){
  console.log(req.body.text);
  fs.writeFile(`./files/${req.params.naam}`,req.body.text,function(err, data){
    res.redirect(`/${req.params.naam}`)
  })
})
module.exports = router; 























// router.get('/', function (req, res, next) {
//   fs.readdir("./files", (err, data) => {
//     console.log(data);
//     res.render('index', { title: 'Express', data: data });
//   })
// });
// router.post('/create',function(req, res , next){
//   fs.writeFile(`./files/${req.body.filename}`,"",function(err,data){
//     res.redirect('/')
//   })
// })
