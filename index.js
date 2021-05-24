import childProcess from 'duplex-child-process';
export default new Proxy({}, { get: function get(target, name) { if (typeof name == 'string') return (...args) => childProcess.spawn(name, args); } });
