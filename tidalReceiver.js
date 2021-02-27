const udp = require('dgram');
// const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const inport = "localhost";
const sock = udp.createSocket("udp4", function(msg, rinfo) {
    var error, error1;
    try {
      let msgObj = osc.fromBuffer(msg);
      // console.log(msgObj);
      let rawData = msgObj.elements[0].args;
      const data ={};
      for (let index = 0; index < rawData.length; index+=2) {
        const evenElement = rawData[index];
        if(evenElement.type!=="string"){
          throw new Error("this should be a string");
        }
        const key = evenElement.value;
        const value = rawData[index+1].value;
        // console.log('key: ', key);
        data[key] = value;
      }
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          console.log(key, ': ', element);
          
        }
      }
      // return console.log(rawData);
    } catch (error1) {
      error = error1;
      return console.log("invalid OSC packet");
    }
  });
   
  sock.bind(6666,inport);