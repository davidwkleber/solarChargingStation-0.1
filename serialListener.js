
module.exports = serialListener;

var app = require('./app');
var portConfig = require('./portConfig.json');

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
// var SerialPort = require("serialport").SerialPort

console.log('ports '+ portConfig.stepper.port +" "+ portConfig.windSpeed.port + " " + portConfig.measurement.port);

 

	DIserialPort = new SerialPort(portConfig.measurement.port, {
		baudrate: portConfig.measurement.baudrate,
		
		parser: serialport.parsers.readline("EOL"),
	}, function (err) {
		if (err) console.log('Eroror opening measurement  port: ' +  portConfig.measurement.port);
	});





function sleep(time, callback) {
// serialListener.prototype.sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
};



var socketServer;
var socketio = require('socket.io');
socketServer = socketio.listen(app, true);

function serialListener()
{	//
	//
	//http://www.barryvandam.com/node-js-communicating-with-arduino/ 
	//copied from the server.js file
	var receivedData = "";
    var sendData = "";
	var delimiter = "\n";
	
 console.log('serialListenerInit called ');

var io = require('socket.io').listen(1337);


console.log('serialListener: setup connection now');

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
	io.on('sliderval', function(data) {
		console.log('DataInput : '+data);
	});
		io.on('updateData', function(data) {
		console.log('DataInput UPDATE: '+data);
	});
		io.emit('updateData', {
			dataSource: "somethig",
			dataInputData: "something else \n"
		});

 	
 
   DIserialPort.on("open", function () {
		console.log('serialListener.DIserialPort.on Open ' + portConfig.measurement.port);

        sleep(2000, function() {
		});
		//asserting();
	});
 


	
  }; 
 
 var sendData = '';
 var receivedData = '';
 var chunksIn = 0;
 
    DIserialPort.on('data', function(data) {
				console.log('DataInput : '+data);

		chunksIn = chunksIn+1;
        receivedData += data.toString();

			var jsonOpened = receivedData.indexOf('{');
			var jsonClosed = receivedData.indexOf('}', jsonOpened);

		if( jsonClosed !== -1 && jsonOpened !== -1 ) {
			if ( jsonClosed > jsonOpened ) {
				sendData = receivedData.substring(jsonOpened, jsonClosed+1);
				receivedData = receivedData.substring(jsonClosed+2, receivedData.length);'';
				chunksIn = 0;
			}
		 }
         // send the incoming data to browser with websockets.
		if (sendData.length > 0 ) {
			var now = new Date();
			var formatNow = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+'\:'+now.getHours()+'\:'+now.getMinutes()+'\:'+now.getSeconds()+'\:'+now.getMilliseconds();
		

	
		
			// console.log('SEND update data : '+sendData);
			var sendJSON = '{\n  \"date\": \"'+formatNow+'\",';
			sendJSON += sendData.substring(1, sendData.length-3);
			sendJSON += "}";
			
			// console.log( "serialListener send JSON : \n"+sendJSON);	

			io.emit('updateData', sendJSON);

			sendJSON = "";
			sendData = "";
			// console.log("in SerialListener: the wind speed: "+windSpeedValue);
			// console.log("in SerialListener: the pitch angle: "+pitchAngleValue);
			// console.log("in SerialListener: the dummy load: "+dummyLoadValue);


		};
	}); 
 
 
 

};


serialListener.doSomething = function() {
	console.log('serialListener.doSomething here');
};

serialListener.write = function( id, value ) {

     sleep(200, function() {
    }); 
	
	console.log('serialListener write value: '+value);
	if( id === 'w' ) {
		WSserialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results from windSpeed ' + results);
		});
	} else if (id === 'PA') {
		console.log('PAserialListener.write '+value);

		PAserialPort.write(value, function(err, results) {
			console.log('PitchAngle ' + err);
			console.log('PitchAngle ' + results);
		});
	} else if (id === 'DL') {
		console.log('DLserialListener.write '+value);

		DLserialPort.write(value, function(err, results) {
			console.log('loadController ' + err);
			console.log('loadController ' + results);
		});
	} else if (id === 'DI') {
		console.log('DIserialListener.write '+value);

		DIserialPort.write(value, function(err, results) {
			console.log('DI_err ' + err);
			console.log('DI_results ' + results);
		});
	} else {
		console.log('bad id '+id);
	};
	

};

function asserting() {
  console.log('asserting');
	DIserialPort.set({rts:true, dtr:true}, function(err, something) {
	  console.log('DLserialPort asserted');
		setTimeout(clear, 250);
	});
}

function clear() {
	console.log('clearing');
	DIserialPort.set({rts:false, dtr:false}, function(err, something) {
	  console.log('DLserialPort clear');
		setTimeout(done, 50);
	});
}

function done() {
	console.log("DLserialPort done resetting");
}

