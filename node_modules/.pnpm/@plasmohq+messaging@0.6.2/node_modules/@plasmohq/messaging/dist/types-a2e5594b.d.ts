interface MessagesMetadata {
}
interface PortsMetadata {
}
type MessageName = keyof MessagesMetadata;
type PortName = keyof PortsMetadata;
type InternalSignal = "__PLASMO_MESSAGING_PING__";
declare namespace PlasmoMessaging {
    type Request<TName = any, TBody = any> = {
        name: TName;
        extensionId?: string;
        port?: chrome.runtime.Port;
        sender?: chrome.runtime.MessageSender;
        body?: TBody;
        tabId?: number;
        relayId?: string;
        targetOrigin?: string;
    };
    type RelayMessage<TName = any, TBody = any> = Request<TName, TBody> & {
        /**
         * Used to resolve corresponding window.postMessage messages
         */
        instanceId: string;
        relayed: boolean;
    };
    type InternalRequest = {
        __PLASMO_INTERNAL_SIGNAL__: InternalSignal;
    };
    type Response<TBody = any> = {
        send: (body: TBody) => void;
    };
    type InternalHandler = (request: InternalRequest) => void;
    type Handler<RequestName = string, RequestBody = any, ResponseBody = any> = (request: Request<RequestName, RequestBody>, response: Response<ResponseBody>) => void | Promise<void> | boolean;
    type PortHandler<RequestBody = any, ResponseBody = any> = Handler<PortName, RequestBody, ResponseBody>;
    type MessageHandler<RequestBody = any, ResponseBody = any> = Handler<MessageName, RequestBody, ResponseBody>;
    interface SendFx<TName = string> {
        <RequestBody = any, ResponseBody = any>(request: Request<TName, RequestBody>, messagePort?: Pick<MessagePort, "addEventListener" | "removeEventListener" | "postMessage"> | Window): Promise<ResponseBody>;
    }
    interface RelayFx {
        <RelayName = any, RequestBody = any, ResponseBody = any>(request: Request<RelayName, RequestBody>, onMessage?: (request: Request<RelayName, RequestBody>) => Promise<ResponseBody>, messagePort?: Pick<MessagePort, "addEventListener" | "removeEventListener" | "postMessage"> | Window): () => void;
    }
    interface MessageRelayFx {
        <RequestBody = any>(request: Request<MessageName, RequestBody>): () => void;
    }
    interface PortHook {
        <TRequestBody = Record<string, any>, TResponseBody = any>(name: PortName): {
            data?: TResponseBody;
            send: (payload: TRequestBody) => void;
            listen: <T = TResponseBody>(handler: (msg: T) => void) => {
                port: chrome.runtime.Port;
                disconnect: () => void;
            };
        };
    }
}
type OriginContext = "background" | "extension-page" | "sandbox-page" | "content-script" | "window";

export { MessageName as M, OriginContext as O, PlasmoMessaging as P, PortName as a, PortsMetadata as b, MessagesMetadata as c };
