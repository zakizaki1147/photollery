import React, { useState } from 'react';
import { Images } from '../base-components/Images';

export const MansoryLayout = () => {
  const [spans, setSpans] = useState({});
  
  const onImageLoad = (event, id) => {
    const img = event.target;
    const height = img.naturalHeight;
    const width = img.naturalWidth;
    
    const rowSpan = Math.ceil((height / width * 10) / 10);
    setSpans(prev => ({ ...prev, [id]: rowSpan }));
  };

  return (
    <>
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-4 grid-auto-rows-[10px]"
      >
        <Images onImageLoad={onImageLoad} spans={spans} />
      </div>
    </>
  );
};