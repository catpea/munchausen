#!/usr/bin/env node
import assert from 'assert';
import { pipeline } from 'stream';
import munchhausen from './index.js'
const {cat, grep} = munchhausen;
pipeline(
  cat('package.json'),
  grep('name'),
  err => console.error
).once('readable', function () {
  const actual = this.read().toString();
  const expected = `  "name": "munchhausen",\n`;
  assert.equal(actual,expected);
})
