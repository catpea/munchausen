import dcp from "duplex-child-process";

function solve (stream){
  return new Promise(function(resolve, reject) {
    stream.once('readable', function(){ resolve(this.read().toString().replace(/\n$/,'')) }) //TODO: it is not very nice to eat newlines.
  });
}

export default new Proxy({},{ get: (target, name) => (...args) => {
  return new Promise(async function(resolve, reject) {
    // TODO: clean up this ugly code.
    const resolved = [];
    for (const arg of args) {
      let candidate = null;
      if(arg.then){
        candidate = await arg;
      }else{
        candidate = arg;
      }
      if(candidate.allowHalfOpen){
        candidate = await solve(candidate);
      }
      resolved.push(candidate)
    }
    resolve( dcp.spawn(name, resolved) );

  });
}});
