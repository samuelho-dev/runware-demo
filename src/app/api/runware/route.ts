import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { IRequestImage, IRequestVideo } from '@runware/sdk-js';
import { runware } from '@/lib/runware/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { generationType, parameters } = body;

    if (!process.env.RUNWARE_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 },
      );
    }

    if (generationType === 'video') {
      const videoParams: IRequestVideo = {
        positivePrompt: parameters.positivePrompt,
        model: parameters.model,
        duration: parameters.duration || 5,
        width: parameters.width,
        height: parameters.height,
        numberResults: 1,
      };

      const result = await runware.videoInference(videoParams);
      const videoResult = Array.isArray(result) ? result[0] : result;

      return NextResponse.json({
        type: 'video',
        data: videoResult,
      });
    } else {
      const imageParams: IRequestImage = {
        positivePrompt: parameters.positivePrompt,
        negativePrompt: parameters.negativePrompt,
        model: parameters.model,
        width: parameters.width,
        height: parameters.height,
        numberResults: 1,
      };

      if (imageParams.model === 'google:4@1') {
        //no width and height for google:4@1
        delete imageParams.width;
        delete imageParams.height;
      }

      if (imageParams.model === 'bytedance:3@1') {
        //no negative prompt for bytedance:3@1
        delete imageParams.negativePrompt;
      }

      const results = await runware.requestImages(imageParams);

      return NextResponse.json({
        type: 'image',
        data: results ? results[0] : null,
      });
    }
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate content',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
