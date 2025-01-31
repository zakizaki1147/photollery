import React from 'react';
import { Heart, Bookmark, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, src: '/test-photos/unsplash1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/test-photos/unsplash2.jpg', alt: 'Photo 2' },
  { id: 3, src: '/test-photos/unsplash3.jpg', alt: 'Photo 3' },
  { id: 4, src: '/test-photos/unsplash4.jpg', alt: 'Photo 4' },
  { id: 5, src: '/test-photos/unsplash5.jpg', alt: 'Photo 5' },
  { id: 6, src: '/test-photos/unsplash6.jpg', alt: 'Photo 6' },
  { id: 7, src: '/test-photos/unsplash3.jpg', alt: 'Photo 3' },
  { id: 8, src: '/test-photos/unsplash2.jpg', alt: 'Photo 2' },
  { id: 9, src: '/test-photos/unsplash1.jpg', alt: 'Photo 1' },
  { id: 10, src: '/test-photos/unsplash5.jpg', alt: 'Photo 5' },
  { id: 11, src: '/test-photos/unsplash6.jpg', alt: 'Photo 6' },
  { id: 12, src: '/test-photos/unsplash4.jpg', alt: 'Photo 4' },
  { id: 13, src: '/test-photos/unsplash1.jpg', alt: 'Photo 1' },
  { id: 14, src: '/test-photos/unsplash2.jpg', alt: 'Photo 2' },
  { id: 15, src: '/test-photos/unsplash3.jpg', alt: 'Photo 3' },
  { id: 16, src: '/test-photos/unsplash4.jpg', alt: 'Photo 4' },
  { id: 17, src: '/test-photos/unsplash5.jpg', alt: 'Photo 5' },
  { id: 18, src: '/test-photos/unsplash6.jpg', alt: 'Photo 6' },
  { id: 19, src: '/test-photos/unsplash3.jpg', alt: 'Photo 3' },
  { id: 20, src: '/test-photos/unsplash2.jpg', alt: 'Photo 2' },
  { id: 21, src: '/test-photos/unsplash1.jpg', alt: 'Photo 1' },
  { id: 22, src: '/test-photos/unsplash5.jpg', alt: 'Photo 5' },
  { id: 23, src: '/test-photos/unsplash6.jpg', alt: 'Photo 6' },
  { id: 24, src: '/test-photos/unsplash4.jpg', alt: 'Photo 4' },
];

export const Images = ({ onImageLoad, spans }) => {
  return (
    <>
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative group rounded-xl overflow-hidden bg-gray-100"
          style={{ gridRow: `span ${spans[photo.id] || 2}` }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            onLoad={(e) => onImageLoad(e, photo.id)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 flex items-end group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
          <div className='absolute bottom-0 w-full h-16 flex justify-between items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer'>
            <div className='flex gap-4'>
              <div className='p-2 bg-primary/50 hover:bg-primary rounded-full transition'>
                <Heart size={20} color='red' fill='red' />
                {/* <Heart size={20} /> */}
              </div>
              <div className='p-2 bg-primary/50 hover:bg-primary rounded-full transition'>
                <Bookmark size={20} color='orange' fill='orange' />
                {/* <Bookmark size={20} /> */}
              </div>
            </div>
            <div className='p-2 bg-primary/50 hover:bg-primary rounded-full transition'>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};