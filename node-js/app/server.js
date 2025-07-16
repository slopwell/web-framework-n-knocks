const http = require("http");
const parseRequest = require("./api/utils/request-parser.js");
const route = require("./api/route.js");

const server = http.createServer(async (req, res) => {
  const simpleRequest = parseRequest(req);
  const output = await route(simpleRequest);

  console.log(`Output: ${JSON.stringify(output)}`);

  // レスポンスオブジェクトが返された場合、HTTPレスポンスとして送信
  if (output) {
    res.writeHead(output.statusCode, output.headers);
    res.end(output.body);
    return;
  }
  // デフォルトの404レスポンス
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
