var port = 5050;
var http = require('http'),
    httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var maxCharge = 5,first = 0;
var servers = [
  {name:"100.200.100.56",charge:0},      
]
var newServer = {name:"100.200.100.25",charge:0};
var server = http.createServer(function(req, res) {      
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
  roundRobin = !roundRobin;  
});
server.listen(port);