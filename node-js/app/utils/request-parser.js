const parseRequest = (req, postBody) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const queryParams = {};
  for (const [key, value] of url.searchParams) {
    queryParams[key] = value;
  }

  const [api, ...resource] = url.pathname.split("/").filter((it) => it !== "");

  const output = {
    method: req.method,
    href: url.href,
    hostname: url.hostname,
    port: url.port,

    headers: req.headers,
    body: postBody,

    path: url.pathname,
    pathList: resource,
    query: queryParams,
    searchParams: url.searchParams,
  };

  console.log("[parseRequest] output:", output);

  return output;
};

module.exports = parseRequest;
