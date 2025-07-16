const http = require("http");
const url = require("url");
const route = require("./api/route.js");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  console.log(`Received ${method} request for ${path}`);

  const output = await route(path, method, req, res);

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
