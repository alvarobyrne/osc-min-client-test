const udp = require('dgram');
// const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const host = "localhost";
const sock = udp.createSocket("udp4", function(msg, rinfo) {
    var error, error1;
    let rawMessage = osc.fromBuffer(msg);
    console.log('rawMessage: ', rawMessage);
    const elements = rawMessage.elements;
    console.log('elements: ', elements);
    const args = rawMessage.elements[0].args;
    console.log('args: ', args);
    return;
  });
console.log('vcv-rack');
  sock.bind(7000,host);