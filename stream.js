import dcp from "duplex-child-process";
export default new Proxy({},{ get: (target, name) => (...args) => dcp.spawn(name, args)});
