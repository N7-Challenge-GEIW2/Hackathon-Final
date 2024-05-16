import { P as PlasmoMessaging, M as MessageName } from './types-a2e5594b.js';

/**
 * Used in any extension context to listen and send messages to background.
 */
declare const useMessage: <RequestBody, ResponseBody>(handler: PlasmoMessaging.Handler<string, RequestBody, ResponseBody>) => {
    data: RequestBody;
};
declare const usePort: PlasmoMessaging.PortHook;
/**
 * TODO: Perhaps add a way to detect if this hook is being used inside CS?
 */
declare function useMessageRelay<RequestBody = any>(req: PlasmoMessaging.Request<MessageName, RequestBody>): void;
declare const useRelay: PlasmoMessaging.RelayFx;

export { useMessage, useMessageRelay, usePort, useRelay };
