/*
* Primary file for the API
*
*
*
*/
//console.log("Welcome");
const http=require('http')

//The server should respond to all request in a string
 var server= http.createServer(function(req, res){
    res.end('Hello World\n');
 })

//Start the server, and have it listened on port 3000
server.listen(3000,function(){
    console.log("The Server Is Listening On Port 3000")
})