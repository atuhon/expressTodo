



var express = require("express");
var connect= require("./db");
const session=require("express-session");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
        res.render("login");
      }
    );
  router.post("/login",(req,res)=>{
    var password=req.body["password"];
    var name=req.body["name"];
    const sql="select * from users";

    const isId=connect.query(sql,(err,row,field)=>{
      console.log(field);
      row.forEach(element => {
       console.log(element.name);
       
       if(element.name===name && element.password===password){
        console.log("フィルターできているか",element.name);//フィルターされた値が入る
        req.session.name=element.name;
        req.session.loginid=element.id;
        
        console.log("idの確認",element.id);
        res.redirect("/");//renderの手前に置く
        res.render("login");
        req.session.name=element.name;
        console.log("通った");

        

       }

        
      });
    });
 





  })
router.get("/regi",function (req,res,next){
res.render("regi");

});
router.post("/register",function(req,res){



  var sql="insert into users(name,password) values(?,?)";
  var name=req.body.regiName;
  var password=req.body.regipassword;
  // req.session.session_cookie_name=[name,password];
  var insert=connect.query(sql,[name,password]);

  console.log(insert);
   res.redirect("/user");

})
/**
 * 
 */


module.exports = router;
