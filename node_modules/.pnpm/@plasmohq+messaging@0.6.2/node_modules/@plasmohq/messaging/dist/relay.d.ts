import { P as PlasmoMessaging } from './types-a2e5594b.js';

/**
 * Raw relay abstracting window.postMessage
 */
declare const relay: PlasmoMessaging.RelayFx;
declare const sendViaRelay: PlasmoMessaging.SendFx;

export { relay, sendViaRelay };
