const dgram = require('dgram');
const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const outport = 6666;
var prevTime = Date.now();
console.log('prevTime: ', prevTime);
sendHeartbeat = function () {
    var buf;
    var time = Date.now();
    const possibleSounds = ['arpy', 'bd', 'hh'];
    const randomIndex = possibleSounds.length * Math.random()|0;
    const sound = possibleSounds[randomIndex];
    console.log('sound: ', sound);
    var oscPacket = {
        oscType: "bundle",
        timetag: time-prevTime,
        elements: {
            address: "/heartbeat",
            args: [
                {
                    type: "string",
                    value: "s"
                },
                {
                    type: "string",
                    value: sound
                },
                {
                    type: "string",
                    value: "cps"
                },
                {
                    type: "float",
                    value: 0.5625
                }
            ]
        }
    }
    prevTime=time;
    console.log('oscPacket: ', oscPacket);
    buf = osc.toBuffer(oscPacket);
    return udp.send(buf, 0, buf.length, outport, "localhost");
};

setInterval(sendHeartbeat, 1000);