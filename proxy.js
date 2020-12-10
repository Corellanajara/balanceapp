var port = 5050;
var http = require('http'),
    httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var maxCharge = 5,first = 0;
var servers = [
  {name:"165.22.188.157:3000",charge:0},      
]
peticiones = [];
var newServer = {name:"http://178.128.71.20:3000",charge:0};
var server = http.createServer(function(req, res) {      
  console.log(req.connection.remoteAddress);
  var remoteAddress = req.connection.remoteAddress;
  var ip = remoteAddress.split("::ffff:")[1];
  peticiones[ip] = 1 + (peticiones[ip] || 0 );
  console.log("peticiones",peticiones);
  var sorted = servers.sort( (s1,s2)=>{
    if(s1.charge < s2.charge){
      return -1
    }
    return 1;
  })  
  var currentServer = sorted[first].name;  
  sorted[first].charge ++ ;
  if(sorted[first].charge == maxCharge){
    servers.push(newServer)    
  }
  console.log(sorted[first].name);
  proxy.web(req, res, { target: 'http://'+currentServer });  
});
server.listen(port);