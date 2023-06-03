const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); //cors 모듈 사용 : 공식 홈페이지 참고

app.get("/capital/:country", (req, res) => {
  const { country } = req.params;
  console.log(country, "js");
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
  console.log(`Example app listening on port ${port}`);
});
