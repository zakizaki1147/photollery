import React from 'react';
import { Heart, Bookmark, ChevronRight } from 'lucide-react';

const Image = ({ onImageLoad, spans, photos }) => {
  return (
    <>
      {photos.map((photo) => (
        <div
          key={photo.FotoID}
          className="relative group rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-primary"
          style={{ gridRow: `span ${spans[photo.FotoID] || 2}` }}
        >
          <img
            src={`http://localhost:5000${photo.LokasiFile}`}
            alt={photo.JudulFoto}
            onLoad={(e) => onImageLoad(e, photo.FotoID)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 flex items-end group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
          <div className='absolute bottom-0 w-full h-16 flex justify-between items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer'>
            <div className='flex gap-4'>
              <div className='p-2.5 bg-black/50 hover:bg-black/80 text-primary rounded-full transition'>
                <Heart size={20} />
                {/* <Heart size={20} fill='currentColor' /> */}
              </div>
              <div className='p-2.5 bg-black/50 hover:bg-black/80 text-primary rounded-full transition'>
                <Bookmark size={20} />
                {/* <Bookmark size={20} fill='currentColor' /> */}
              </div>
            </div>
            <div className='p-1.5 bg-black/50 hover:bg-black/80 text-primary rounded-full transition'>
              <ChevronRight size={27} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const AlbumCollage = ({ album }) => {
  const photos = album.photos || [];

  return (
    <div className="w-full h-60 relative group rounded-xl overflow-hidden bg-gradient-to-tr from-secondary to-primary flex gap-0.5 border-2 border-primary cursor-pointer">
      <div className="w-2/3 h-full">
        {photos[0] ? (
          <img
            src={`http://localhost:5000${photos[0].LokasiFile}`}
            alt={photos[0].JudulFoto || "No Image"}
            className="w-full h-full object-center object-cover"
          />
        ) : null}
      </div>
      <div className="w-1/3 h-full flex flex-col gap-0.5">
        <div className="w-full h-1/2 bg-white">
          {photos[1] ? (
            <img
              src={`http://localhost:5000${photos[1].LokasiFile}`}
              alt={photos[1].JudulFoto || "No Image"}
              className="w-full h-full object-center object-cover"
            />
          ) : null}
        </div>
        <div className="w-full h-1/2 bg-white">
          {photos[2] ? (
            <img
              src={`http://localhost:5000${photos[2].LokasiFile}`}
              alt={photos[2].JudulFoto || "No Image"}
              className="w-full h-full object-center object-cover"
            />
          ) : null}
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 flex items-end group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
      <div className="absolute bottom-0 w-full h-16 flex justify-end items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer">
        <div className="p-1.5 bg-black/50 hover:bg-black/80 text-primary rounded-full transition">
          <ChevronRight size={27} />
        </div>
      </div>
    </div>
  );
};


export { Image, AlbumCollage }