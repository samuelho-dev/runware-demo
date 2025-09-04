import { IRequestImage } from '@runware/sdk-js';

// Image generation models
export const imageModels = [
  { value: 'google:4@1', label: 'google:4@1' },
  { value: 'bytedance:3@1', label: 'bytedance:3@1' },
];

// Default parameters for image generation
export const defaultImageParams: IRequestImage = {
  positivePrompt: '',
  negativePrompt: '',
  model: 'google:4@1',
  width: 1024,
  height: 1024,
  numberResults: 1,
};
