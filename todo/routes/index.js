/**
 * 
メッセージの追加→OK
メッセージの削除→OK
メッセージの更新→OK

userテーブルの作成→OK
ログイン→
会員登録→OK
id単位で会員を探す


ログインIDとの紐づけ
sessionの準備→多分OK
sessionテーブル内に値を保持する→OK
idをsessionと紐づける
id単位で表示が変わるか確認
Sessionを使用して他の人と内容が被らないようにする
こんにちは○○さん！→ログイン者の名前をページ遷移後も出し続ける
DB→会員テーブル
 */

/**
 * 理解したこと
 * session
 * →一定時間の間は同じIDに対して値が入る
 * 
 */

var express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const conet=require("./db");

const url=require("url");

var router = express.Router();

router.get('/', (req, res) => {
  if(req.session.msg=undefined){
    console.log("セッションなし");
    return res.redirect("/user/login");
  }
  var msg="テスト"

  conet.query(
    'SELECT * FROM todolist',
    (error, results) => {
      console.log(results);
      res.render('index.ejs',{
        title:results,
        name:msg
      });

    }
  );
});
router.post("/insert",(req,res)=>{


  const msg=req.body.name;

  req.session.named="fffffffff";
  req.session.id="fffffffff";
  req.session.ids="fffffffff";
  req.session.loginId="fffffffff";
  if(msg===""){
    return res.redirect("/");
  };

  const sql='insert into todolist(todo) values (?)';
  const query=conet.query(sql,[msg]); 
res.redirect("/");

/* GET home page. */
});

router.post("/delete",(req,res)=>{
  const del='delete from todolist where id=?'
  const id=req.body.id
  console.log("idを出せ",id);
  const query=conet.query(del,[id]);
  res.redirect("/");
});
router.post("/update",(req,res)=>{
  console.log("idの値",req.body.id,"中身",req.body.update)
  req.session.destroy();
  const data=req.body.update
  const id=req.body.id
const sql="update todolist set todo=? where id=?"//余分な,を付けない
conet.query(sql,[data,id]);//2つ以上は配列型にする

    res.redirect("/");
});
router.get("/edit",(req,res)=>{//getでidを送るとパラメータとして出てくる
  const urls=url.parse(req.url,true);
  const urlParts=urls.query
  console.log("editidの値",urlParts.id);
  const param=urlParts.id;
  res.render("edit.ejs",{
    id:param
  });

})
module.exports = router;

