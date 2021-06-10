/*
* Primary file for the API
*
*
*
*/
//console.log("Welcome");
const http=require('http');
const url=require('url');

//The server should respond to all request in a string
 var server= http.createServer(function(req, res){
     //Get The Url And Passed It
    var parsedUrl=url.parse(req.url, true);
    //Get The Path
    var path=parsedUrl.pathname;
    var trimmedpath=path.replace(/^\/+|\/+$/g,'');
    //Send The Response
    res.end('Hello World\n');
    //Log The Request Path
    console.log('Request Recieved In This Part',+ trimmedpath);
 })

//Start the server, and have it listened on port 3000
server.listen(3002,function(){
    console.log("The Server Is Listening On Port 3000")
});
