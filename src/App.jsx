import { Route, Routes } from "react-router-dom"
import { MainPage } from "./pages/MainPage"
import { AddPhotoPage } from "./pages/AddPhotoPage"
import { AlbumsPage } from "./pages/AlbumsPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { ErrorPage } from "./pages/ErrorPage"
import { DetailAlbumPage } from "./pages/DetailAlbumPage"
import { LikedPhotosPage } from "./pages/LikedPhotosPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/add-photo" element={<AddPhotoPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumID" element={<DetailAlbumPage />} />
        <Route path="/liked-photos" element={<LikedPhotosPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
