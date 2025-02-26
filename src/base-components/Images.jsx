import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Image = ({ onImageLoad, spans, photos, onClick }) => {
  return (
    <>
      {photos.map((photo) => (
        <div
          key={photo.FotoID}
          className="relative group rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-primary"
          style={{ gridRow: `span ${spans[photo.FotoID] || 2}` }}
          onClick={() => onClick(photo.FotoID)}
        >
          <img
            src={`http://localhost:5000${photo.LokasiFile}`}
            alt={photo.JudulFoto}
            onLoad={(e) => onImageLoad(e, photo.FotoID)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
          <div className='absolute bottom-0 w-full h-16 flex justify-end items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer'>
            <div className='p-1.5 bg-black/50 hover:bg-black/80 text-primary rounded-full active:ring-2 active:ring-primary transition'>
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
    <>
      <Link to={`/albums/${album.AlbumID}`}>
        <div className="w-full h-60 relative group rounded-xl overflow-hidden bg-gradient-to-tr from-secondary to-primary flex gap-0.5 border-2 border-primary cursor-pointer">
          <div className="w-2/3 h-full">
            {photos[0] ? (
              <img
                src={`http://localhost:5000${photos[0].LokasiFile}`}
                alt={photos[0].JudulFoto || "No Image"}
                className="w-full h-full object-center object-cover"
              />
            ) : (
              <div className='w-full h-full flex justify-center items-center'>
                <p className='text-xs text-gray-400 text-center'>No image available :(</p>
              </div>
            )}
          </div>
          <div className="w-1/3 h-full flex flex-col gap-0.5">
            <div className="w-full h-1/2 bg-white">
              {photos[1] ? (
                <img
                  src={`http://localhost:5000${photos[1].LokasiFile}`}
                  alt={photos[1].JudulFoto || "No Image"}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className='w-full h-full flex justify-center items-center'>
                  <p className='text-xs text-gray-400 text-center'>No image available :(</p>
                </div>
              )}
            </div>
            <div className="w-full h-1/2 bg-white">
              {photos[2] ? (
                <img
                  src={`http://localhost:5000${photos[2].LokasiFile}`}
                  alt={photos[2].JudulFoto || "No Image"}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className='w-full h-full flex justify-center items-center'>
                  <p className='text-xs text-gray-400 text-center'>No image available :(</p>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 cursor-pointer"></div>
          <div className="absolute bottom-0 bg-gradient-to-t from-primary w-full h-16 flex justify-between items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer">
            <p className='font-bold mt-5'>{album.NamaAlbum}</p>
            <div className="p-1.5 bg-black/50 hover:bg-black/80 text-primary rounded-full transition">
              <ChevronRight size={27} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const ArrayImage = ({ onImageLoad, spans, photo, onClick }) => {
  return (
    <>
      <div
        key={photo.FotoID}
        className="relative group rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-primary"
        style={{ gridRow: `span ${spans[photo.FotoID] || 2}` }}
        onClick={() => onClick(photo.FotoID)}
      >
        <img
          src={`http://localhost:5000${photo.LokasiFile}`}
          alt={photo.JudulFoto}
          onLoad={(e) => onImageLoad(e, photo.FotoID)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
        <div className='absolute bottom-0 w-full h-16 flex justify-end items-center px-5 opacity-0 group-hover:opacity-100 duration-300 cursor-pointer'>
          <div className='p-1.5 bg-black/50 hover:bg-black/80 text-primary rounded-full active:ring-2 active:ring-primary transition'>
            <ChevronRight size={27} />
          </div>
        </div>
      </div>
    </>
  )
}

export { Image, AlbumCollage, ArrayImage }