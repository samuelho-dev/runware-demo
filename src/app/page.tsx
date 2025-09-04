'use client';

import GeneratedContent from '@/components/generated-content';
import ParameterPanel from '@/components/sidebar/parameter-selection';
import {
  IRequestImage,
  IRequestVideo,
  IImage,
  IVideoToImage,
} from '@runware/sdk-js';
import { useState } from 'react';
import { defaultImageParams } from '@/lib/config/image-params';

export default function Home() {
  const [history, setHistory] = useState<(IImage | IVideoToImage)[]>([]);
  const [generatedContent, setGeneratedContent] = useState<
    IImage | IVideoToImage | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationType, setGenerationType] = useState<'image' | 'video'>(
    'image',
  );
  const [parameters, setParameters] = useState<IRequestImage | IRequestVideo>(
    defaultImageParams,
  );

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    console.log({ generationType, parameters });
    try {
      const response = await fetch('/api/runware', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generationType,
          parameters,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const result = await response.json();
      setGeneratedContent(result.data);
      setHistory((prev) => [result.data, ...prev].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex w-full justify-between sm:items-start gap-8">
        <div className="flex-1">
          <GeneratedContent content={generatedContent} type={generationType} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}
        </div>
        <ParameterPanel
          parameters={parameters}
          setParameters={setParameters}
          generationType={generationType}
          setGenerationType={(type) => setGenerationType(type)}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </main>
      {/* History */}
      {history.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <div className="flex gap-4 overflow-x-auto">
            {history.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                {'imageURL' in item && item.imageURL && (
                  <img
                    src={item.imageURL}
                    alt={`Generated ${index}`}
                    className="size-32 object-cover rounded"
                  />
                )}
                {'videoURL' in item && item.videoURL && (
                  <video
                    src={item.videoURL}
                    className="size-32 object-cover rounded"
                    controls
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
