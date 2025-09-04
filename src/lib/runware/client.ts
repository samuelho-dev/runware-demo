import { Runware } from '@runware/sdk-js';

export const runware = new Runware({
  apiKey: process.env.RUNWARE_API_KEY!,
  shouldReconnect: true,
  globalMaxRetries: 3,
});
