# munchhausen
Wrap operating system commands with duplex streams.

Named after [Baron Munchausen](https://en.wikipedia.org/wiki/Baron_Munchausen) who pulled him self out of a lake by his own hair.
![muenchhausen.jpg](muenchhausen.jpg)

## Usage

```JavaScript
import { pipeline } from 'stream';
import munchhausen from 'munchhausen';
const {cat, grep} = munchhausen;
pipeline(
  cat('package.json'),
  grep('name'),
  err => console.error
).once('readable', function () {
  console.log( this.read().toString()) //  "name": "bashscript",\n
})

```

## Credit
[Artwork](https://en.wikipedia.org/wiki/File:Muenchhausen_Herrfurth_7_500x789.jpg) Public Domain
