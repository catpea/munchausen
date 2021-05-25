import dcp from "duplex-child-process";
import promised from "../promised.js";
export default new Proxy({},{ get: (target, name) => (...args) => promised(dcp.spawn(name, args))});
