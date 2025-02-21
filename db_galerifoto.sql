-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2025 at 03:00 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_galerifoto`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `AlbumID` int NOT NULL,
  `NamaAlbum` varchar(255) NOT NULL,
  `Deskripsi` text NOT NULL,
  `TanggalDibuat` date NOT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`AlbumID`, `NamaAlbum`, `Deskripsi`, `TanggalDibuat`, `UserID`) VALUES
(1, 'Kota', '', '2025-02-11', 5),
(2, 'random', 'miaw', '2025-02-11', 4),
(3, 'hahaha', 'hihihi', '2025-02-12', 4),
(4, 'Langit', 'Koleksi foto langit yang keren ygy', '2025-02-12', 4);

-- --------------------------------------------------------

--
-- Table structure for table `foto`
--

CREATE TABLE `foto` (
  `FotoID` int NOT NULL,
  `JudulFoto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DeskripsiFoto` text COLLATE utf8mb4_general_ci NOT NULL,
  `TanggalUnggah` date NOT NULL,
  `LokasiFile` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `AlbumID` int DEFAULT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foto`
--

INSERT INTO `foto` (`FotoID`, `JudulFoto`, `DeskripsiFoto`, `TanggalUnggah`, `LokasiFile`, `AlbumID`, `UserID`) VALUES
(1, 'tes', 'tess', '2025-02-12', '/uploads/1739320546597.jpeg', NULL, 1),
(2, 'tes2', 'tesss', '2025-02-12', '/uploads/1739321788824.jpeg', 2, 4),
(3, 'tes3', 'tessss', '2025-02-12', '/uploads/1739324584323.jpeg', 2, 4),
(4, 'Langit #1', '', '2025-02-13', '/uploads/1739384865564.jpeg', 4, 4),
(5, 'Menara Saidah', 'Menara saidah gaming buddy', '2025-02-13', '/uploads/1739385218255.jpeg', 1, 5),
(6, 'tes', 'heheh', '2025-02-13', '/uploads/1739405528544.jpeg', 3, 4),
(7, 'TJ Koridor 9', '', '2025-02-20', '/uploads/1740022627869.jpeg', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `komentarfoto`
--

CREATE TABLE `komentarfoto` (
  `KomentarID` int NOT NULL,
  `FotoID` int NOT NULL,
  `UserID` int NOT NULL,
  `IsiKomentar` text NOT NULL,
  `TanggalKomentar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `komentarfoto`
--

INSERT INTO `komentarfoto` (`KomentarID`, `FotoID`, `UserID`, `IsiKomentar`, `TanggalKomentar`) VALUES
(1, 1, 4, 'tes', '2025-02-21'),
(2, 1, 2, 'widih ganteng banget', '2025-02-21'),
(3, 1, 5, 'wow', '2025-02-21');

-- --------------------------------------------------------

--
-- Table structure for table `likefoto`
--

CREATE TABLE `likefoto` (
  `LikeID` int NOT NULL,
  `FotoID` int NOT NULL,
  `UserID` int NOT NULL,
  `TanggalLike` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likefoto`
--

INSERT INTO `likefoto` (`LikeID`, `FotoID`, `UserID`, `TanggalLike`) VALUES
(3, 5, 2, '2025-02-21'),
(4, 5, 5, '2025-02-21'),
(5, 5, 4, '2025-02-21'),
(6, 1, 5, '2025-02-21');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int NOT NULL,
  `Username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NamaLengkap` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Alamat` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Username`, `Password`, `Email`, `NamaLengkap`, `Alamat`) VALUES
(1, 'zakizaki', 'zaki47', 'zaki@gmail.com', 'Zaki Budi', 'Jakarta'),
(2, 'rafel', '$2b$10$rWp6XJu3xev/9i3sgeRc5uFOnvCPnuZ.dvgvjcIFioSwv.wpqjzSi', 'rafel@gmail.com', 'La Ravel', 'KamSaw'),
(3, 'rio', '$2b$10$gJN/sXe6VaZ5I5d4V9JuUOnK81xj84NalLXpiWrzPklBiV0PSdN/C', 'rio@gmail.com', 'Abah Rio', 'Jati Makmur'),
(4, 'purwa', '$2b$10$XG/Ht.nSuvZGmLv1PFb7T.pBD2oFsDoV4RmrFUXHfhgDhnbM7Ndmy', 'purwa@gmail.com', 'Purwa Puter', 'Rawa Binong'),
(5, 'azka', '$2b$10$gtLq//9EOW5yMqJ8.MlDl.IJAXQ88eXMHza.0GrpL/cxLwd1WhA5W', 'azka@gmail.com', 'Azka Akak', 'Condet'),
(6, 'rafell', '$2b$10$/1JZXF3Ek5cJZZaXb5mKquA.ffcC1yJNVI/Fkuag7b76HZjandCVm', 'rafel@gmail.com', 'Rafelinow', 'Jati Makmur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`AlbumID`),
  ADD KEY `FK_UserAlbum` (`UserID`);

--
-- Indexes for table `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`FotoID`),
  ADD KEY `FK_UserFoto` (`UserID`),
  ADD KEY `FK_AlbumFoto` (`AlbumID`);

--
-- Indexes for table `komentarfoto`
--
ALTER TABLE `komentarfoto`
  ADD PRIMARY KEY (`KomentarID`),
  ADD KEY `FK_UserKomentar` (`UserID`),
  ADD KEY `FK_FotoKomentar` (`FotoID`);

--
-- Indexes for table `likefoto`
--
ALTER TABLE `likefoto`
  ADD PRIMARY KEY (`LikeID`),
  ADD KEY `FK_UserLike` (`UserID`),
  ADD KEY `FK_FotoLike` (`FotoID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `AlbumID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `foto`
--
ALTER TABLE `foto`
  MODIFY `FotoID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `komentarfoto`
--
ALTER TABLE `komentarfoto`
  MODIFY `KomentarID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likefoto`
--
ALTER TABLE `likefoto`
  MODIFY `LikeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FK_UserAlbum` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `FK_AlbumFoto` FOREIGN KEY (`AlbumID`) REFERENCES `album` (`AlbumID`),
  ADD CONSTRAINT `FK_UserFoto` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `komentarfoto`
--
ALTER TABLE `komentarfoto`
  ADD CONSTRAINT `FK_FotoKomentar` FOREIGN KEY (`FotoID`) REFERENCES `foto` (`FotoID`),
  ADD CONSTRAINT `FK_UserKomentar` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `likefoto`
--
ALTER TABLE `likefoto`
  ADD CONSTRAINT `FK_FotoLike` FOREIGN KEY (`FotoID`) REFERENCES `foto` (`FotoID`),
  ADD CONSTRAINT `FK_UserLike` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
