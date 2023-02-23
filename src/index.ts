import http from "http";

type ServerResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};
// NodeJs Server
const server = http.createServer();

const doRequest = (_: any, res: ServerResponse) => {
  // NOTE: Content-typeというヘッダー情報に「application.json」という値を設定
  res.writeHead(200, { "Content-Type": "application.json" });
  // NOTE: ボディ部分のコンテンツを書き出し
  res.write(
    JSON.stringify({
      data: "Hello World!",
    })
  );
  res.end();
};

server.on("request", doRequest);
server.listen(8000, () => {
  console.log("Application is running on: http://localhost:8000.");
});




