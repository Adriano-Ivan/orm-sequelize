const app = require("./app_config/app");
const http = require("http");

const server = http.createServer(app);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
