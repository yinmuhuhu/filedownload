let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')

let dir, arg = process.argv[2] || ''
const port = 9999
// 响应头三件套设置
const Header = {
  "Access-Control-Allow-Origin": "*",    // 支持无限跨域，就是这么任性
  "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",   // 支持请求的方法
  "Access-Control-Allow-Headers":" Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
}

const prod = "\033[31m ♥︎ \033[0m\033[36mby huhu\033[0m"
const prelogo = `
 __              __     __        
|  |.--.--.----.|  |--.|__|.-----.
|  ||  |  |  __||    < |  ||     |
|__||_____|____||__|__||__||__|__|
${prod}
`

const logo = "\033[36m" + prelogo + "\033[0m"


http.createServer(function (req, res) {
  if (req.url === "/favicon.ico") return    // 如果想加载favicon可以干掉
  let pathname = __dirname + url.parse(req.url).pathname
  dir = dir ? dir : pathname 
  pathname = dir ? pathname.replace(dir, dir + arg) : pathname 

  if (pathname.charAt(pathname.length - 1) == "/") pathname += "index.html"   // 默认寻找的文件

  fs.exists(pathname, function (exists) {
    if (exists) {
      fs.readFile(pathname, function (err, data) {
        if (err) console.log(err)  // 返回错误
        // 支持html js css gif jpg png 等流格式
        switch (path.extname(pathname)) {
          case ".html":
            res.writeHead(200, Object.assign({ "Content-Type": "text/html;charset=utf-8", "Content-Length": data.length }, Header))
            break
          case ".js":
            res.writeHead(200, Object.assign({ "Content-Type": "text/javascript;charset=utf-8", "Content-Length": data.length }, Header))
            break
          case ".css":
            res.writeHead(200, Object.assign({ "Content-Type": "text/css;charset=utf-8", "Content-Length": data.length }, Header))
            break
          case ".gif":
            res.writeHead(200, Object.assign({ "Content-Type": "image/gif;charset=utf-8", "Content-Length": data.length }, Header))
            break
          case ".jpg":
            res.writeHead(200, Object.assign({ "Content-Type": "image/jpeg;charset=utf-8", "Content-Length": data.length }, Header))
            break
          case ".png":
            res.writeHead(200, Object.assign({ "Content-Type": "image/png;charset=utf-8", "Content-Length": data.length }, Header))
            break
          default:
            res.writeHead(200, Object.assign({ "Content-Type": "application/octet-stream;charset=utf-8", "Content-Length": data.length }, Header))
        }
        // 返回数据
        res.end(data)
      })
    } else {
      res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" })
      res.end("<h1>404 Not Found</h1>")
    }
  })
}).listen(port)

console.log(logo)
console.log("server running at http://127.0.0.1:" + port + "/")
