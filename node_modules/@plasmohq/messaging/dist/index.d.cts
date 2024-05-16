import { P as PlasmoMessaging, M as MessageName } from './types-a2e5594b.js';
export { c as MessagesMetadata, O as OriginContext, a as PortName, b as PortsMetadata } from './types-a2e5594b.js';

/**
 * Send to Background Service Workers from Content Scripts or Extension pages.
 * `extensionId` is required to send a message from a Content Script in the main world
 */
declare const sendToBackground: PlasmoMessaging.SendFx<MessageName>;
/**
 * Send to Content Scripts from Extension pages or Background Service Workers.
 * Default to active tab if no tabId is provided in the request
 */
declare const sendToContentScript: PlasmoMessaging.SendFx;
/**
 * @deprecated Renamed to `sendToContentScript`
 */
declare const sendToActiveContentScript: PlasmoMessaging.SendFx<string>;
/**
 * Any request sent to this relay get send to background, then emitted back as a response
 */
declare const relayMessage: PlasmoMessaging.MessageRelayFx;
/**
 * @deprecated Migrated to `relayMessage`
 */
declare const relay: PlasmoMessaging.MessageRelayFx;
declare const sendToBackgroundViaRelay: PlasmoMessaging.SendFx<MessageName>;
/**
 * @deprecated Migrated to `sendToBackgroundViaRelay`
 */
declare const sendViaRelay: PlasmoMessaging.SendFx<never>;

export { MessageName, PlasmoMessaging, relay, relayMessage, sendToActiveContentScript, sendToBackground, sendToBackgroundViaRelay, sendToContentScript, sendViaRelay };
