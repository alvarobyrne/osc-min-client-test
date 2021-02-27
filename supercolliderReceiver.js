const udp = require('dgram');
// const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const inport = "localhost";
const sock = udp.createSocket("udp4", function(msg, rinfo) {
    var error, error1;
    let rawMessage = osc.fromBuffer(msg);
    console.log('rawMessage: ', rawMessage);
    return;
  });
   
  sock.bind(3333,inport);