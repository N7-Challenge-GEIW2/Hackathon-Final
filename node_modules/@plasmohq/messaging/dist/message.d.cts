import { P as PlasmoMessaging } from './types-a2e5594b.js';

declare const listen: <RequestBody, ResponseBody>(handler: PlasmoMessaging.Handler<string, RequestBody, ResponseBody>) => () => void;

export { listen };
