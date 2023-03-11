const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("config"); // 取得config資料

const connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("[MySQL connect!]");
  }
});

router.get("/todo", (req, res, next) => {
  connection.query("select * from todolist", (err, result) => {
    if (err) {
      res.status(500).json({ message: "query error!" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/todo", (req, res, next) => {
  const todo = req.body;
  connection.query(
    `insert into todolist set title="${todo.title}", status=0`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "insert error, please check." });
      } else {
        res.status(201).json({ message: "insert successfully" });
      }
    }
  );
});

// patch: 部分更新 / put: 全部更新
// 這裡指改變status，name不會做更新
router.patch("/todo/:id", (req, res, next) => {
  const todoid = req.params.id;
  const updateTodo = req.body;
  connection.query(
    `UPDATE todolist SET status=${updateTodo.status} WHERE id = "${todoid}"`, // 切記要加""，不然會failed
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "update failed!" });
      } else {
        res.status(201).json({ message: "okay" });
      }
    }
  );
});

router.delete("/todo/:id", (req, res, next) => {
  const todoID = req.params.id;
  connection.query(
    `DELETE from todolist where id = "${todoID}"`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "delete failed" });
      } else {
        res.status(204).json({ message: "ok" });
      }
    }
  );
});

module.exports = router;
