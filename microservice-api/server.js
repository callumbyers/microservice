const App = require("./app");
const { app } = App;

const port = 3001;

app.listen(
  {
    port,
  },
  () => console.log(`Server listening on port: ${port}`)
);
