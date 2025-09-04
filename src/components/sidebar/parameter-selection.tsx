'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Combobox } from '../ui/combobox';
import { Button } from '../ui/button';
import { IRequestImage, IRequestVideo } from '@runware/sdk-js';
import { imageModels, defaultImageParams } from '@/lib/config/image-params';
import {
  videoModels,
  videoDurations,
  defaultVideoParams,
} from '@/lib/config/video-params';
import { sharedResolutions } from '@/lib/config/resolutions';

interface ParameterPanelProps {
  parameters: IRequestImage | IRequestVideo;
  setParameters: (params: IRequestImage | IRequestVideo) => void;
  generationType: 'image' | 'video';
  setGenerationType: (type: 'image' | 'video') => void;
  onGenerate: () => void;
  isLoading?: boolean;
}

function ParameterPanel({
  parameters,
  setParameters,
  generationType,
  setGenerationType,
  onGenerate,
  isLoading = false,
}: ParameterPanelProps) {
  const currentModels = generationType === 'video' ? videoModels : imageModels;
  const defaultParams =
    generationType === 'video' ? defaultVideoParams : defaultImageParams;

  const currentResolution =
    sharedResolutions.find(
      (res) =>
        res.width === parameters.width && res.height === parameters.height,
    )?.value || sharedResolutions[0].value;

  return (
    <aside className="w-80 space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <label className="text-sm font-medium">Generation Type</label>
        <div className="flex gap-2">
          <Button
            variant={generationType === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setGenerationType('image');
              setParameters({
                ...defaultImageParams,
                positivePrompt: parameters.positivePrompt,
              });
            }}
          >
            Image
          </Button>
          <Button
            variant={generationType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setGenerationType('video');
              setParameters({
                ...defaultVideoParams,
                positivePrompt: parameters.positivePrompt,
              });
            }}
          >
            Video
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Prompt</label>
        <Input
          placeholder="Prompt to generate..."
          value={parameters.positivePrompt}
          onChange={(e) =>
            setParameters({ ...parameters, positivePrompt: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Negative Prompt</label>
        <Input
          placeholder="What to avoid..."
          value={parameters.negativePrompt || ''}
          onChange={(e) =>
            setParameters({ ...parameters, negativePrompt: e.target.value })
          }
        />
      </div>

      <div className="space-y-2 justify-between flex items-center">
        <label className="text-sm font-medium">Model</label>
        <Combobox
          value={String(parameters.model || defaultParams.model)}
          placeholder="Select a model"
          setValue={(value) => setParameters({ ...parameters, model: value })}
          options={currentModels}
        />
      </div>

      <div className="space-y-2 justify-between flex items-center">
        <label className="text-sm font-medium">Resolution</label>
        <Combobox
          value={currentResolution}
          placeholder="Select resolution"
          setValue={(value) => {
            const resolution = sharedResolutions.find(
              (res) => res.value === value,
            );
            if (resolution) {
              setParameters({
                ...parameters,
                width: resolution.width,
                height: resolution.height,
              });
            }
          }}
          options={sharedResolutions.map((res) => ({
            value: res.value,
            label: res.label,
          }))}
        />
      </div>

      {generationType === 'video' && (
        <div className="space-y-2 justify-between flex items-center">
          <label className="text-sm font-medium">Duration</label>
          <Combobox
            value={String(parameters.duration || 5)}
            placeholder="Select duration"
            setValue={(value) =>
              setParameters({ ...parameters, duration: Number(value) })
            }
            options={videoDurations.map((dur) => ({
              value: String(dur.value),
              label: dur.label,
            }))}
          />
        </div>
      )}

      <Button
        className="w-full"
        onClick={onGenerate}
        disabled={isLoading || !parameters.positivePrompt}
      >
        {isLoading
          ? 'Generating...'
          : `Generate ${generationType === 'video' ? 'Video' : 'Image'}`}
      </Button>
    </aside>
  );
}

export default ParameterPanel;
