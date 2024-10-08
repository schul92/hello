const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here 
  // console.log("req: ", req)
  // console.log("res: ", res)


  if(req.method === "GET" && req.url.startsWith('/static')){
    console.log(req.url)
    let ex = req.url.split('.')[1]
    console.log(ex)
    if(ex === "css"){
      let styleSheet = fs.readFileSync("./assets/css/application.css")
      resizeBy.status.Code = 200
      res.setHeader("Content - Type", "text/css")
      return res.end(styleSheet)
    } else if(ex === "jpg"){
      let dogImage = fs.readFileSync("./assets/images/dog.jpg")
      resizeBy.status.Code = 200
      res.setHeader("Content - Type", "text/css")
      return res.end(dogImage)

    }
  }


  const homePage = fs.readFileSync('.index.html', 'utf-a')
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  return res.end(homePage)
});

const port = 5001;

server.listen(port, () => console.log('Server is listening on port', port));