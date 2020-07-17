var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');

//Admin Portal URL
const apiUrl = ""
//Access Token with RW access to the Account Management API
const accessToken = ""

require('body-parser-xml')(bodyParser);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

if(apiUrl == "" || accessToken == ""){
  console.log("Please provide a value for apiUrl and accessToken")
  return;
}

var app = express();

var port = process.env.PORT || 60301,
    ip   = process.env.IP   || '0.0.0.0';

app.use(bodyParser.xml());

var server = app.listen(port, ip, function () {
  console.log('listening on port ' + port );
});

var deleteToken = function(token_id){
  var uri = apiUrl + '/admin/api/personal/access_tokens/'+token_id+".json";
  console.log(uri);
  axios.delete(uri, {
   data: {
    access_token: accessToken
   }
  }).then(response => {
    console.log(JSON.stringify(response.data)); 
  }
  )
}

app.get('/', function(req, res){
  //incoming get requests to be handled here
});

app.post('/', function(req, res){
   res.set('Content-Type', 'application/json');
   var token_name = req.body.event.object[0].application[0].extra_fields[0].token_name[0]
   if(token_name == null || token_name == "")
	return;
     var uri = apiUrl + '/admin/api/personal/access_tokens.json?name='+token_name;
     axios.get(uri, {
      data: {
       access_token: accessToken
      }
     }).then(response => {
       var tokens = response.data.access_tokens
       if(tokens.length == 0){
         console.log("no tokens found")
	 return;
       }
       tokens.forEach(function(token){
	 var token_id = token.access_token.id
         deleteToken(token_id);
      })}
     )
   res.sendStatus(200)
   console.log(JSON.stringify(token_name))
});

module.exports = app;
