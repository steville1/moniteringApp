/*
* Primary file for the API
*
*
*
*/
//console.log("Welcome");
const http=require('http');
const url=require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var fs = require('fs');
var config=require('./config');
var _data = require('./lib/data')

//Testing
/**_data.create('test','newFile',{'foo':'bar'},function(err){

	console.log('this was the error', err);
});
**/
/**_data.read('test','newFile1',function(err, data){
	console.log('this was the error', err,'this was the data', data);
});
**/
/**_data.update('test','newFile',{'fizz':'Dong'}, function(err){
    console.log('this was the error', err);
});
**/
_data.delete('test','newFile', function(err){
	console.log('This was the error', err);
});

//The server should respond to all request in a string
 var server= http.createServer(function(req, res){
     //Get The Url And Passed It
    var parsedUrl=url.parse(req.url, true);
    //Get The Path
    var path=parsedUrl.pathname;
    var trimmedPath=path.replace(/^\/+|\/+$/g,'');
    //Get the query string
    var queryStringObject=parsedUrl.query;

    //Get The Http Method
    var method=req.method.toLowerCase();
    var headers=req.headers;
    //Get the payload if any
    var decoder=new StringDecoder('utf-8');
    var buffer='';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
 /**   req.on('end', function(){
        buffer += decoder.end();
        res.end('Hello World\n');
        //Log The Request Path
      //Choose the handler this request should go to
        });
**/
  
        var choosenHandler = typeof(router[trimmedPath])!== 'undefined' ? router[trimmedPath]:handlers.notFound;

        var data= {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer

        };

        //Route the request to the handler specified in the router
        choosenHandler(data, function(statusCode, payload){
            //Use the status code called back by the handler
            statusCode = typeof(statusCode)=='number' ? statusCode : 200;
            //Use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};
            //Convert the payload to a string
            var payloadString = JSON.stringify(payload);
            //Return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
  });
});
    //Send The Response
   // console.log("Request Recieved With This Header" + headers);
   

//Start the server, and have it listened on port 3000
server.listen(config.port,function(){
    console.log("The Server Is Listening On Port "+config.port+" in "+config.envName+" now");
});
var handlers={};
handlers.hello = function(data, callback){
	//CallBack a http status code, and a payload object
	callback(200,{'name':'Welcome'});
};

//Sample Handler
/**handlers.sample = function(data, callback){
	//CallBack a http status code, and a payload object
	callback(406,{'name':'sample handler'});
};
**/

/**handlers.ping = function(data, callback){
	callback(200);
};
**/


//Not Found Handler
handlers.notFound = function(data, callback){
	callback(404);
};

//Define a request router
var router={
    //ping:handlers.ping
	//sample:handlers.sample
    hello:handlers.hello
}
 

