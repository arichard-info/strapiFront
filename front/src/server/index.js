import express from "express";
import router from "./router";

const port = 5000;

const app = express();

app.use(router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
