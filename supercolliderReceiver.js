/**
 * see envelope-send.scd
 */
const udp = require("dgram");
// const udp = dgram.createSocket("udp4");
const osc = require("osc-min");
const inport = "localhost";
const sock = udp.createSocket("udp4", function (msg, receivingInfo) {
  // console.log("receivingInfo: ", receivingInfo);
  let rawMessage = osc.fromBuffer(msg);
  // console.log("msg: ", msg);
  /**
   * If the messages are sent as in `envelope-send.sc` file, hte following is the shape of the object received
   * In supercollider ~testNetAddr.sendMsg("envelope", msg[3])
   * shape of rawMeassage = {
   *  address:'envelope',
   *  args:[
   *   {
   *    type:'float'
   *    value: <Buffer ... >
   *   }
   *  ],
   *  oscType:'message'
   * }
   */
  console.log("rawMessage: ", rawMessage.args[0].value);
  // console.log("rawMessage: ", rawMessage);
  value = rawMessage.args[0].value;
});

sock.bind(3333, inport);
