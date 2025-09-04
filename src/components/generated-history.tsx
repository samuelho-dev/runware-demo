import React from 'react';

interface GeneratedHistoryProps {
  history: any[];
}

function GeneratedHistory({ history }: GeneratedHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Recent Generations</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {history.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item?.imageURL && (
              <img 
                src={item.imageURL} 
                alt={`History ${index}`}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            )}
            {item?.videoURL && (
              <video 
                src={item.videoURL} 
                className="w-24 h-24 object-cover rounded-lg border"
                muted
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedHistory;