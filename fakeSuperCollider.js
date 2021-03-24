const dgram = require('dgram');
const udp = dgram.createSocket("udp4");
const osc = require('osc-min');
const outport = 3333;
var prevTime = Date.now();
let degreeCounter=0;
console.log('prevTime: ', prevTime);
const degrees = [0, 1, 2, 3, 4, 4, 5, 5, 5, 5, 4, 2, 3, 2, 3, 1];
let sendHeartbeat = function () {
    var buf;
    var time = Date.now();
    const possibleSounds = ['arpy', 'bd', 'hh'];
    const randomIndex = possibleSounds.length * Math.random()|0;
    const sound = possibleSounds[randomIndex];
    console.log('sound: ', sound);
    const degree = degrees[degreeCounter++%degrees.length];
    var oscPacket = {
        oscType: "message",
        timetag: time-prevTime,
        address: "/hh",
        args: [
            {
                type: "string",
                value: "instrument"
            },
            {
                type: "string",
                value: sound
            },
            {
                type: "string",
                value: "dur"
            },
            {
                type: "float",
                value: Math.random()
            },
            {
                type: "string",
                value: 'degree'
            },
            {
                type:'integer',
                value:degree
            }
        ]
    }
    prevTime=time;
    console.log('oscPacket: ', oscPacket);
    buf = osc.toBuffer(oscPacket);
    return udp.send(buf, 0, buf.length, outport, "localhost");
};

setInterval(sendHeartbeat, 1000);