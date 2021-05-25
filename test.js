#!/usr/bin/env node
import assert from "assert";
import { pipeline } from "stream";

import munchhausen from "./index.js";
import promised from "./promised.js";

  const { cat, grep, dirname, readlink, which } = munchhausen;
  pipeline(cat("package.json"), grep("name"), (err) => console.error).once(
    "readable",
    function () {
      const actual = this.read().toString();
      const expected = `  "name": "munchhausen",\n`;
      assert.equal(actual, expected);
    }
  );
  const license = await promised(cat("LICENSE"));
  assert.equal(license.length, 35227);
  //console.log(license.length);
