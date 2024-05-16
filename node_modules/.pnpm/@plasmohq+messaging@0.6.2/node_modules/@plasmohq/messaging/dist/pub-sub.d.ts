type PubSubMessage = {
    from?: number;
    to?: number;
    payload: any;
};
declare const getHubMap: () => Map<number, chrome.runtime.Port>;
declare const startHub: () => void;
declare const broadcast: (pubSubMessage: PubSubMessage) => void;
declare const connectToHub: (extensionId: string) => chrome.runtime.Port;

export { PubSubMessage, broadcast, connectToHub, getHubMap, startHub };
