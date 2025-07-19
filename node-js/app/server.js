const http = require("http");
const parseRequest = require("./utils/request-parser.js");
const route = require("./api/route.js");

const readPostBody = (req) => {
  if (req.method !== "POST") {
    return Promise.resolve({});
  }
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body)); // Parse JSON string to object
      } catch (error) {
        reject(new Error("Invalid JSON format"));
      }
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
};

const server = http.createServer(async (req, res) => {
  const postBody = await readPostBody(req);

  const simpleRequest = parseRequest(req, postBody);

  const output = await route(simpleRequest).catch((error) => {
    console.error("[server] Error in route:", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
    return null;
  });

  console.log(`Output: ${JSON.stringify(output)}`);

  // レスポンスが既に送信されている場合は何もしない
  if (res.headersSent) {
    return;
  }

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
