'use strict';

var co = require('co');
var OSS = require('./client');

var client = new OSS({
	bucket: 'g-s',
  region: 'oss-cn-qingdao',
  accessKeyId: 'LTAIwAaRS92o6O2J',
  accessKeySecret: 'xR0MIpmfef8MIRTbnmnkPQhCNc5dxM'
});

//console.log(client);

//client.test();

var position;

co(function* () {
	try{
		var result = yield client.head('oss.log');
		
	//console.log(result);
	position = result.res.headers['x-oss-next-append-position'];
	console.log(position);
	} catch(e){
		console.log('没有这个文件');
	}
	
	if(position){
		
	}else {
		position = 0;
	}
	console.log(position);
	try{
	var result = yield client.addpend('oss.log', 'oss-cn-qingdao');
	} catch(e){
		console.log(e);
	}
	
	if(result.status==200){
		console.log(result.position);
		console.log('上传成功！');
	}else{
		console.log('上传失败！');
	}
});

co(function* () {
	
});