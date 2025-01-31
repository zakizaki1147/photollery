import { Route, Routes } from "react-router-dom"
import { MainPage } from "./pages/MainPage"
import { AddPhotoPage } from "./pages/AddPhotoPage"
import { AlbumsPage } from "./pages/AlbumsPage"
import { FavoritesPage } from "./pages/FavoritesPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addphoto" element={<AddPhotoPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
