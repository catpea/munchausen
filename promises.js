// import dcp from "duplex-child-process";
// export default new Proxy({},{ get: (target, name) => (...args) => {
//   return new Promise(async function(resolve, reject) {
//     args = await Promise.all(args);
//     resolve( dcp.spawn(name, args) );
//   });
// }});




import dcp from "duplex-child-process";

function solve (stream){
  return new Promise(function(resolve, reject) {
    stream.once('readable', function(){ resolve(this.read().toString()) })
  });
}

export default new Proxy({},{ get: (target, name) => (...args) => {
  return new Promise(async function(resolve, reject) {

    //args = await Promise.all( args ); // process arguments prior to executing command.

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


      //console.log(typeof candidate,  candidate);
      resolved.push(candidate)

    }

    resolve( dcp.spawn(name, resolved) );

  });
}});
