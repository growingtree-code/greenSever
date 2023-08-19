const express = require("express");
const pool = require("./database");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); //cors 모듈 사용 : 공식 홈페이지 참고
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("To do list!!!");
});

/**데이터 저장*/
app.post("/create", async (req, res) => {
  try {
    let { content } = req.body; // body에서 할일 내용을 입력받아옴
    console.log(content);
    const conn = await pool.getConnection(); // pool에서 커넥션을 가져오기
    let sql = "insert into todotable (content) values(?)"; // db에 content를 넣는 쿼리문 작성;
    let data = [content]; // data에 content 담기
    console.log(data);
    const [rows] = await pool.query(sql, data); //쿼리문 실행 및 rows에 담기
    res.status(200).json({ result: rows }); // json형식으로 rows 전달
    conn.release(); // 커넥션을 다시 pool로 반환
  } catch (error) {
    console.log(error); // 에러잡기
  }
});

app.get("/list", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const sql = "select * from todotable";
    const [rows] = await pool.query(sql);
    res.status(200).json({ result: rows });
    conn.release();
  } catch (error) {
    console.log("에러", error);
  }
});

app.get("/capital/:country", (req, res) => {
  const { country } = req.params;
  // console.log(country, "js"); // ex)test시 해당 라인 주석처리할것 http://localhost:3000/capital/Nepal
  if (country == "Korea") {
    res.json({ country: "Seoul" });
  } else if (country == "Nepal") {
    res.json({ country: "Katmandu" });
  } else if (country == "Germany") {
    res.json({ country: "Berlin" });
  } else if (country == "Spain") {
    res.json({ country: "Madrid" });
  } else {
    res.json({ country: "알 수 없음" });
  }
});

app.listen(port, () => {
  console.log(`connected! Example app listening on port ${port}`);
});
