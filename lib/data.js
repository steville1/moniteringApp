var fs = require('fs');
var path = require('path');

//container for the module to be exported
var lib={};

//Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//write data to a file

lib.create = function(dir,file,data,callback){
fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescriptor){
	if(!err && fileDescriptor){
	    //Convert data to string
	    var stringData=JSON.stringify(data);
	    //Write to file and close it
    fs.writeFile(fileDescriptor,stringData,function(err){
        if(!err){
            callback(false);
        }else{
        callback('Error Closing new file');
        }
    });
	}else{
	callback('Could not create new file, it may already exist');
	}
	});
	};
module.exports=lib;