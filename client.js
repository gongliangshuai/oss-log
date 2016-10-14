'use strict';

var OSS = require('ali-oss');
var urlencode = require('urlencode');

module.exports = Client;

function Client(options, ctx) {
  return OSS(options, ctx);
}

var proto = OSS.prototype;

proto.addpend = function* addpend(name, content, position, options) {
	
  options = options || {};
  if(position === undefined){
	try{
	  var result = yield this.head(name);
	  position = result.res.headers['x-oss-next-append-position'];
	} catch(e){
	  position = 0;
	}
  }
  var url = name + '?append&position=' + position;

  options.headers = options.headers || {};
  this._convertMetaToHeaders(options.meta, options.headers);

  var params = this._objectRequestParams('POST', url, options);

  params.mime = 'text/plain';
  params.content = content;
  
  var reqParams = this.createRequest(params);
  
  var result = yield this.urllib.request(urlencode.decode(reqParams.url), reqParams.params);
  //console.log(result.res.status);
  var ret = {
    name: url,
    url: this._objectUrl(url),
    res: result.res,
	status: result.res.statusCode,
	position: result.res.headers['x-oss-next-append-position']
	
  };

  if (options.headers && options.headers['x-oss-callback']) {
    ret.data = JSON.parse(result.data.toString());
  }

  return ret;
};

proto.test = function test(){
	console.log('test');
}