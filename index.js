const udp = require('dgram');
// const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const inport = "localhost";
const sock = udp.createSocket("udp4", function(msg, rinfo) {
    var error, error1;
    try {
      let msgObj = osc.fromBuffer(msg);
      console.log(msgObj);
      let data = msgObj.elements.args;
      return console.log(data);
    } catch (error1) {
      error = error1;
      return console.log("invalid OSC packet");
    }
  });
   
  sock.bind(6666,inport);