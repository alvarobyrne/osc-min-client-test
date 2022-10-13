(
SynthDef.new(\ocean,{
	var sig,mod;
	sig = BrownNoise.ar(0.12!2);
	mod  = SinOsc.kr(0.2,3pi/2).exprange(0.001,1);
	sig = sig *mod;
	sig = sig + (GVerb.ar(sig,200,5)*0.2);
	SendReply.kr(Impulse.kr(20),'/oceanAmp',mod,1);
	Out.ar(0,sig)
}).add
)


x= Synth(\ocean);

# sstop the sound
x.free

~testNetAddr = NetAddr("127.0.0.1", 3333);


(
o = OSCdef.new(\trackOcean,{
	arg msg;
	msg.postln;
	~testNetAddr.sendMsg("envelope2", msg[3]);
},'/oceanAmp');
)

# stop sending without stoping the sound
o.free


