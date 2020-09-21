var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const commandLineArgs = require('command-line-args')

//commandline argument provides API Manager URL
const optionDefinitions = [
  { name: 'url', alias: 'u', type: String }
]
const options = commandLineArgs(optionDefinitions)

require('body-parser-xml')(bodyParser);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

if(options.url == undefined){
  console.log("Please provide a value for the API manager url")
  return;
}

var app = express();

var port = process.env.PORT || 60301,
    ip   = process.env.IP   || '0.0.0.0';

app.use(bodyParser.xml());

var server = app.listen(port, ip, function () {
  console.log('listening on port ' + port );
});

//Personal access token delete API call
var deleteToken = function(token_id){
  var uri = options.url + '/admin/api/personal/access_tokens/'+token_id+".json";
  console.log(uri);
  axios.delete(uri, {
   data: {
    access_token: token_id
   }
  }).then(response => {
    console.log(JSON.stringify(response.data)); 
  }
  )
}

app.get('/', function(req, res){
  //incoming get requests to be handled here
});

//inbound webhooks from API manager
app.post('/', function(req, res){
   res.set('Content-Type', 'application/json');
   var token_value = req.body.event.object[0].application[0].extra_fields[0].token_value[0]
   if(token_value == null || token_value == "")
	return;
  deleteToken(token_value);
});

module.exports = app;
