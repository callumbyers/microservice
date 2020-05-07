const Koa = require("koa");
const routes = require("./routes/routes");
const bodyParser = require("koa-bodyparser");
const cors = require("cors");

const app = new Koa();
const { router } = routes;

app.use(router.routes());
app.use(cors());
app.use(bodyParser());

module.exports = {
  app,
};
