export const sharedResolutions = [
  // 1:1 Square
  { value: '1024x1024', label: 'Square (1:1)', width: 1024, height: 1024 },

  // 16:9 Landscape (Video)
  { value: '736x544', label: '736x544 (16:9)', width: 736, height: 544 },
  {
    value: '1120x832',
    label: '1120x832 (16:9)',
    width: 1120,
    height: 832,
  },
];

// Default resolution for both image and video
export const defaultResolution = {
  width: 1024,
  height: 1024,
  value: '1024x1024',
};
