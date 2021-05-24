#!/usr/bin/env node
import assert from 'assert';
import { pipeline } from 'stream';
import munchausen from './index.js'
const {cat, grep} = munchausen;
pipeline(
  cat('package.json'),
  grep('name'),
  err => console.error
).once('readable', function () {
  const actual = this.read().toString();
  const expected = `  "name": "munchausen",\n`;
  assert.equal(actual,expected);
})
