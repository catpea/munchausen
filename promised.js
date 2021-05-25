export default function(stream){
  return new Promise(function(resolve, reject) {
    stream.once('readable', function(){ resolve(this.read().toString()) })
  });
}
