//NODE_ENV=staging node index.js

//Containers for all the environments
var environments = {


};
//Staging default environments

environments.staging ={
	'port' : 2003,
	'envName' : 'staging'

};

//Production environments
environments.production ={
	'port' : 5000,
	'envName' : 'staging'

};

//Determine which environment was passed as a command line arguement
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase():'';

//Check that the current environment is one of the environments above, if not, default to staging
var environmentsToExport =typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironments] : environments.staging;

//Export the module
module.exports = environmentsToExport;