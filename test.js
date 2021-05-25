#!/usr/bin/env node
import assert from "assert";
import { pipeline } from "stream";

import munchhausen from "./index.js";

  const { cat, grep, echo } = munchhausen;
  pipeline(...await Promise.all([ cat("package.json"), grep(echo("name"))]), (err) => console.error).once(
    "readable",
    function () {
      const actual = this.read().toString();
      const expected = `  "name": "munchhausen",\n`;
      assert.equal(actual, expected);
    }
  );
