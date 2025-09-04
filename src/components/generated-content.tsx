import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import { IImage, IVideoToImage } from '@runware/sdk-js';

interface GeneratedContentProps {
  content: IImage | IVideoToImage | null;
  type?: 'image' | 'video';
}

function GeneratedContent({ content, type = 'image' }: GeneratedContentProps) {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-96 rounded-lg border-2 border-dashed border-white/20">
        <div className="text-center">
          <p className="text-gray-500">No content generated yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Enter a prompt and click generate to start
          </p>
        </div>
      </div>
    );
  }

  if (type === 'video' && 'videoURL' in content && content.videoURL) {
    return (
      <div className="space-y-2">
        <h1>Generated Video</h1>
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            src={content.videoURL}
            controls
            autoPlay
            loop
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }

  if ('imageURL' in content && content.imageURL) {
    return (
      <div className="space-y-2">
        <h1>Generated Image</h1>
        <div className="relative rounded-lg overflow-hidden">
          <AspectRatio ratio={1}>
            <Image
              src={content.imageURL}
              alt="Generated content"
              className="w-full h-full object-cover"
              layout="fill"
            />
          </AspectRatio>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
      <p className="text-gray-500">Unexpected content format</p>
    </div>
  );
}

export default GeneratedContent;
