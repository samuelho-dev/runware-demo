import { IRequestVideo } from '@runware/sdk-js';

// Available video generation models
export const videoModels = [
  { value: 'bytedance:1@1', label: 'Seedance 1.0 Lite' },
  { value: 'bytedance:2@1', label: 'Seedance 1.0 Pro' },
];

// Default parameters for video generation
export const defaultVideoParams: IRequestVideo = {
  positivePrompt: '',
  negativePrompt: '',
  model: 'runware:3@1',
  width: 1024,
  height: 704,
  duration: 5,
  numberResults: 1,
};

// Duration options for video generation
export const videoDurations = [
  { value: 5, label: '5 seconds' },
  { value: 8, label: '8 seconds' },
];
