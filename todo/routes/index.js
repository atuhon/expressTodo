/**
 * 
メッセージの追加→OK
メッセージの削除→OK
メッセージの更新→OK

userテーブルの作成→OK
ログイン→OK
会員登録→OK
nameとpassword単位で会員を探す→OK


・ログインIDとの紐づけ

sessionの準備→OK
sessionテーブル内に値を保持する→OK
nameとpasswordをDBから抽出してくる→OK
それを入力値と比較してtrueならTodoの画面に遷移falseなら再びlogin画面への処理とバリデーション
todolistの欄にuserIdカラムを追加する→OK
todo登録の際はuserIdにuserテーブルのidが登録されるよう修正する。→OK
idを取得してそのidと一致する名前をこんにちは○○さん！で出す→ログイン者の名前をページ遷移後も出し続ける→OK
Sessionを使用して他の人と内容が被っていないか確認→OK
バリデーションを使って名前（それかメアドに変更し）の重複登録を禁止する。入力されていない項目のエラー発出
更新後→「更新しました」のポップアップ
削除後→「削除しました」のポップアップ
消化率の表示
メッセージボード

ログアウトボタンの実装
　sessionの削除
　ログイン画面に戻る
　



DB
 
新規カラム追加
→alter table add テーブル名 型


/**
 * 理解したこと
 * session
 * →一定時間の間は同じIDに対して値が入る
 * ログアウト時にsessionを切る
 * →session.destory()
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

var express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const conet=require("./db");

const url=require("url");

var router = express.Router();

router.get('/', (req, res) => {
  let loginId=req.session.loginid
  const sql='SELECT * FROM todolist where user_id= ?';
  const select=conet.query(sql,loginId);
  console.log(select.sql);
  const newSQL=select.sql;
  conet.query(newSQL,(error, results) => {
      console.log(results);
      res.render('index.ejs',{
        title:results,
        loginName:req.session.name
      });

    }
  );
 });
router.post("/insert",(req,res)=>{


  const msg=req.body.name;

  if(msg===""){
    return res.redirect("/");
  };
  let loginId=req.session.loginid
  const sql='insert into todolist(todo,user_id) values (?,?)';
  console.log(sql);
  const query=conet.query(sql,[msg,loginId]); 
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

});
router.post("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/user");
  // let sessionId=req.session.loginid;
  // const sessionName=req.session.name;




})
module.exports = router;

