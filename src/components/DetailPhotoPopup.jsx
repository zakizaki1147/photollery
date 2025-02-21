import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useBodyOverflow } from '../custom-hooks/useBodyOverflow'
import { Bookmark, Heart, MessageCircle, SendHorizonal } from 'lucide-react'
import { CommentForm } from '../base-components/InputForms'
import axios from 'axios'

export const DetailPhotoPopup = ({ open, onClose, fotoID }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [photoDetail, setPhotoDetail] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useBodyOverflow(open)

  useEffect(() => {
    if (open && fotoID) {
      setIsVisible(true);
      fetchPhotoDetail(fotoID)
      fetchLikes(fotoID)
      fetchComments(fotoID)
    } else {
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, );
    }
    
  }, [open, onClose, fotoID]);

  const fetchPhotoDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/photo/${id}`)
      setPhotoDetail(response.data)
    } catch (error) {
      console.error('Error fetching photo data:', error)
    }
  }

  const fetchLikes = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/api/photo/${id}/likes`, { headers: { Authorization: `Bearer ${token}` } })
      setLikesCount(response.data.likeCount)
      setIsLiked(response.data.liked)
    } catch (error) {
      console.error("Error fetching likes:", error)
    }
  }

  const fetchComments = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/photo/${id}/comments`)
      setComments(response.data.comments || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
      setComments([])
    }
  }

  const handleLikeClick = async () => {
    if (!photoDetail) return

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`http://localhost:5000/api/photo/${photoDetail.fotoID}/like`, {}, { headers: { Authorization: `Bearer ${token}` } })

      setIsLiked(response.data.liked)
      setLikesCount((prev) => (response.data.liked ? prev + 1 : prev - 1))
    } catch (error) {
      console.error("Error liking photo:", error)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/photo/${fotoID}/comment`,
        { isiKomentar: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewComment("");
      fetchComments(fotoID)
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  
  const handleClose = () => {
    setTimeout(() => {
      onClose()
    }, )
  }
  
  if (!open && !isVisible) return null

  return ReactDom.createPortal (
    <>
      <div className='fixed inset-0 bg-black/50 z-20' onClick={handleClose}></div>
      <div className='w-full h-screen fixed inset-0 z-30' onClick={handleClose}>
        <div className='w-full h-screen relative flex justify-center items-center'>
          <div className='bg-gradient-to-tr from-secondary to-primary p-5 rounded-2xl flex justify-center items-center gap-3' onClick={(e) => e.stopPropagation()}>
            {!photoDetail ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className='size-[35rem] bg-white rounded-lg flex justify-center items-center overflow-hidden relative'>
                  <img src={`http://localhost:5000${photoDetail.lokasiFile}`} className='w-[150%] h-[150%] blur-sm object-cover absolute' alt={photoDetail.judulFoto} />
                  <img src={`http://localhost:5000${photoDetail.lokasiFile}`} className='w-full h-full blur-0 object-contain' alt={photoDetail.judulFoto} />
                </div>
                <div className='w-[25rem] h-[35rem] bg-white rounded-lg flex flex-col overflow-hidden'>
                  <div className='w-full p-4 border-b flex gap-1 font-bold'>
                    <p>@{photoDetail.user.username}</p>
                    <p>•</p>
                    <p>{photoDetail.judulFoto}</p>
                  </div>
                  <div className='w-full p-4 flex flex-col flex-1 overflow-y-auto border-b'>
                    {photoDetail.deskripsiFoto && (
                      <>
                        <p className='text-sm mb-1'>
                          <span className='font-semibold mr-2'>@{photoDetail.user.username}</span>{photoDetail.deskripsiFoto}
                        </p>
                        <p className='text-[10px] text-gray-400 text-right'>{new Date(photoDetail.tanggalUnggah).toLocaleDateString()}</p>
                      </>
                    )}
                    <div className='mt-3 flex flex-col gap-3'>
                      {comments.map((comment) => (
                        <div key={comment.KomentarID}>
                          <p className='text-sm mb-1'>
                            <span className='font-bold mr-2'>@{comment.Username}</span>{comment.IsiKomentar}
                          </p>
                          <p className='text-[10px] text-gray-400 text-right'>{new Date(comment.TanggalKomentar).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='w-full p-4 flex flex-col gap-3 border-b'>
                    <div className='flex justify-between'>
                      <div className='flex gap-4'>
                        <button className={`group ${isLiked ? 'text-primary fill-primary' : ''}`} onClick={handleLikeClick}>
                          <Heart size={28} className={`transition ${isLiked ? 'fill-primary text-primary' : 'group-hover:fill-primary group-hover:text-primary'}`} />
                        </button>
                        <label htmlFor="isiKomentar" className='cursor-pointer group'>
                          <MessageCircle size={28} className='group-hover:fill-primary group-hover:text-primary transition' />
                        </label>
                      </div>
                      <Bookmark size={28} />
                    </div>
                    <div className='flex gap-1 text-xs'>
                      <p>{likesCount} likes</p>
                      <p>•</p>
                      <p>{new Date(photoDetail.tanggalUnggah).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <form onSubmit={handleCommentSubmit}>
                    <CommentForm
                      placeholder='Post your comment here...'
                      id='isiKomentar'
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
