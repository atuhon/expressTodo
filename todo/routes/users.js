/**
 * 登録する
 * それをuser.jsに送る
 * DBに登録する
 * ログインページに遷移しログインしてもらう
 * 入力したidとパスワードを取得。
 * DBと突き合わせてアカウントを特定する。
 * セッションを渡す（そのidとnameをセッションに入れる）
 * セッションを利用して「こんにちは○○さん」を出す
 * エラーの場合はバリデーションをいれる
 * ーーーーーー
 * 表示されるTodoの内容はその人のアカウントの内容のみにする
 * ログアウトボタンを押すとログアウトする
 */

/**
 * 
 * MySQLとセッションを同期させる
 * １．セッションストアを作る→セッション専用テーブルが作成される
 * ２．
 * 
 */
/**
 * なんかmysqlが読み込まれないとき（読み込みが終わらない）
 *   構文が間違っている
 *   var sql="insert into users(name,password) values(?　?)";→? ?の間に,がない
 *   input name=name→名前とプロパティが被っている
 * 　
 *  */ 

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
    var id=req.body["id"];
    var name=req.body["name"];
    req.session.session_cookie_name=[id,name];
    var data={id:req.session.msg};//idをセッションに入れる
    res.render("login",data);
    res.redirect("/");
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
