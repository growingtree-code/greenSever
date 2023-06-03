const express = require("express");
const app = express();
const port = 3000;

app.get("/capital/:country", (req, res) => {
  const { country } = req.params;
  console.log(country);
  if (country == "Korea") {
    res.json({ Seroul: country });
  } else if (country == "Nepal") {
    res.json({ Katmandu: country });
  } else if (country == "Germany") {
    res.json({ Berlin: country });
  } else if (country == "Spain") {
    res.json({ Madrid: country });
  } else {
    res.send("안녕하세요");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
