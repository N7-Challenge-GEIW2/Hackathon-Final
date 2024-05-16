import { a as PortName } from './types-a2e5594b.js';

declare const getPort: (name: PortName) => chrome.runtime.Port;
declare const removePort: (name: PortName) => void;
declare const listen: <ResponseBody = any>(name: PortName, handler: (msg: ResponseBody) => Promise<void> | void, onReconnect?: () => void) => {
    port: chrome.runtime.Port;
    disconnect: () => void;
};

export { getPort, listen, removePort };
