const pool = require("../../db");
const queries = require("../student/queries");

const getStudents = (req, res) => {
  //   console.log("get students");
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
};

const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmail, [email], (error, results) => {
    if (results.rows.length) {
      res.send("すでにユーザーが存在します。");
    }

    pool.query(
      queries.addStudents,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("ユーザー作成に成功しました。");
        console.log("ユーザーが作成されました");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      return res.send("その生徒はDBに存在しません");
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      return res.status(200).send("削除に成功しました");
    });
  });
};

const updateStudents = (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      return res.send("その生徒はDBに存在しません");
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      return res.status(200).send("更新に成功しました");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudents,
  removeStudent,
  updateStudents,
};
