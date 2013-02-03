var http = require('http');
var sys = require('sys');
var server = http.createServer(function(req, res) {
    
 if(req.url == '/parcel/1') {
  res.writeHead(200, {
         'Content-Type': 'application/json'
     });
     res.end(JSON.stringify(getTrackInfoJson()));
 } else if(req.url = '/stats/last6'){
  res.writeHead(200, {
          'Content-Type': 'application/json'
     });
     res.end(JSON.stringify(getStatsInfoJson())); 
 }
});
server.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');

function getStatsInfoJson() {
 "statinfo":{
  "type":"bar",
  "category":"parcelslast6",
  "data" : [232, 242, 32, 342, 100, 98]
 }
}

function getTrackInfoJson() {
 return { 
     "trackinfo":{
         "parcelnr":123456,
         "provider":"DHL",
         "trackdetails":{
             "trackdetail":[
                 {
                     "date":"01.01.2010",
                     "info":"Got parcel from Customer"
                 },
                 {
                     "date":"02.01.2010",
                     "info":"Shipped to Target depot"
                 },
                 {
                     "date":"03.01.2010",
                     "info":"Delivered to Customer"
                 }
             ]
         }
     }
 };
}
