var express = require("express");
var connect = require("./db");
const session = require("express-session");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("login");
});
router.post("/login", (req, res) => {
  var password = req.body["password"];
  var name = req.body["name"];
  const sql = "select * from users";

  const isId = connect.query(sql, (err, row, field) => {
    console.log("rowの値", row);
    // console.log(name);

    const usr = row.find(
      (element) => element.name === name && element.password === password
    );

    /**
     * forEach出なくfindを使用する理由
     * forEach→条件に一致するすべての値を取得する
     * find→条件に一致する最初の値を取得すると終了する。
     * trueに関しては１つのみのためforEachでもエラーにならないが、
     * falseの場合は複数の値を返してしまい、resも複数返してしまうためエラーになる。
     */

    if (usr != undefined) {
      // console.log("フィルターできているか",usr.name);//フィルターされた値が入る
      req.session.name = usr.name;
      req.session.loginid = usr.id;

      console.log("idの確認", usr.id);
      req.session.name = usr.name;
      console.log("通った");
      res.redirect("/");
    } else if (usr === undefined) {
      console.log("通るのか？");

      return res.redirect("/user");
    }
  });
});

router.get("/regi", function (req, res, next) {
  res.render("regi");
});
router.post("/register", function (req, res) {
  var name = req.body.regiName;
  var password = req.body.regipassword;

  var sql = "insert into users(name,password) values(?,?)";

  req.session.session_cookie_name = [name, password];
  if(name==="" || password==""){
    return res.redirect("/user/regi");
  }//ここはバリデーションで実装
  var insert = connect.query(sql, [name, password], (e,reslt) => {
    if(e){//エラー処理、

 
    console.log("登録されない");
    console.log("内容確認", e);
 return res.redirect("/user/regi");
}



 return  res.redirect("/user");
// return  res.redirect("/user");


  // return;
});
});
/**
 *
 */

module.exports = router;
