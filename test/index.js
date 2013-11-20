var assert = require("assert");
var through = require("through");
var http = require("http");

var PutJson = require("../index");

describe("put-json tests", function(){
  it("should put json to server", function(done){

    var server = http.createServer(function (req, res) {
      assert.equal(req.method, "PUT", "request method should be PUT");
      
      req.pipe(through(function (buf) {
        
        // echo request back to response
        this.queue(String(buf));
      })).pipe(res);
    });

    server.listen(3001, function(){
      var putBody = {test: true};

      PutJson("http://localhost:3001", putBody, function(err, res) {
        
        assert(res.body == JSON.stringify(putBody), "put body from response should match posted")
        server.close()
        done(err);
      });
    });
  });
});