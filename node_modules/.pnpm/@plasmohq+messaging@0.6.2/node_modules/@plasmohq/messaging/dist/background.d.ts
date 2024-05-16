import { a as PortName } from './types-a2e5594b.js';

declare const getPortMap: () => Map<PortName, chrome.runtime.Port>;
declare const getPort: (name: PortName) => chrome.runtime.Port;

export { getPort, getPortMap };
