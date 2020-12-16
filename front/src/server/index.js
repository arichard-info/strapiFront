import express from "express";
import blockRegistry from "@/components/Blocks/Blocks.registry";
import templateRegistry from "@/components/Templates/Templates.registry";
import axios from "axios";

const port = 5000;

const app = express();

app.get("*", async (req, res, next) => {
  const structure = await axios
    .get("http://localhost:1337/pages")
    .then((res) => res.json())
    .then((data) => data[0])
    .catch(console.error);

  if (!structure) {
    res.status = 404;
    return next();
  }

  // If format = json return data directly
  if (req.query && req.query.json && req.query.json === "true") {
    res.json(structure);
    return next();
  }

  let html = "Hello World !";

  structure._template = await templateRegistry["page"];

  if (structure.content && structure.content.length) {
    structure.content = await Promise.all(
      structure.content.map(async (block) => {
        return { ...block, _component: await blockRegistry[block.__component] };
      })
    );
  }

  res.send(html);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
