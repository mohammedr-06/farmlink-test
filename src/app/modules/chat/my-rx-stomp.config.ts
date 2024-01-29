import { RxStompConfig } from '@stomp/rx-stomp';
import { environment} from '../../../environments/environment';
const token =  localStorage.getItem('access-token');
export const myRxStompConfig: RxStompConfig = {
  // Which server?
  //brokerURL:  'ws:62.252.239.190:9012/chat',
  brokerURL:  environment?.chatURL,
 // brokerURL:  'wss:5254-157-32-35-14.in.ngrok.io/chat',
//https://97a7-157-32-35-14.in.ngrok.io
  // Headers
  // Typical keys: login, passcode, host
  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
