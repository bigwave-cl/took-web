import * as onLine from './on.line.js';
import * as local from './local.js';
import * as config from '../config.js';

const askInterface = config.PROD ? local : onLine;

export default askInterface;