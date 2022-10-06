import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);
export default eventEmitter;
