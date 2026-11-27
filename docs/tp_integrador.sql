-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2026 at 03:12 AM
-- Server version: 10.11.14-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tp_integrador`
--

-- --------------------------------------------------------

--
-- Table structure for table `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administradores`
--

INSERT INTO `administradores` (`id`, `email`, `password`) VALUES
(3, 'goku@dbz.com', '$2b$10$.HrLNKPARoVhkrqtw6E8luvGEYQkdsZ0z/fVX6Nzr20wQtQrR6wNK');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` int(11) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `categoria` enum('Juego','Consola') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`, `activo`, `categoria`) VALUES
(1, 'PlayStation 5 Slim 1TB', 980000, 'ps5-slim-1tb.webp', 1, 'Consola'),
(2, 'EA Sports FC 26 PS5', 92000, 'ea-fc-26-ps5.webp', 1, 'Juego'),
(3, 'Cyberpunk 2077 Ultimate Edition', 74000, 'cyberpunk-2077.webp', 1, 'Juego'),
(4, 'Nintendo Switch OLED', 650000, 'switch-oled-white.webp', 1, 'Consola'),
(5, 'Batman: Arkham Knight PS4', 35000, 'batman-arkham-knight.webp', 1, 'Juego'),
(6, 'Xbox Series X 1TB', 1050000, 'xbox-series-x.webp', 0, 'Consola'),
(7, 'For Honor Marching Fire', 28000, 'for-honor.webp', 1, 'Juego'),
(8, 'PlayStation 4 Pro 1TB ', 650000, 'ps4-pro.webp', 0, 'Consola');

-- --------------------------------------------------------

--
-- Table structure for table `productos_ventas`
--

CREATE TABLE `productos_ventas` (
  `id_producto` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos_ventas`
--

INSERT INTO `productos_ventas` (`id_producto`, `id_venta`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 980000),
(2, 1, 2, 92000),
(3, 2, 1, 74000),
(4, 4, 1, 650000),
(5, 3, 2, 35000),
(5, 4, 1, 35000),
(7, 3, 1, 28000);

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `nombre_cliente` varchar(25) NOT NULL,
  `precio_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`id`, `fecha`, `nombre_cliente`, `precio_total`) VALUES
(1, '2026-11-01 14:30:00', 'Lucas Benítez', 1164000),
(2, '2026-11-02 18:15:00', 'Martina Gómez', 74000),
(3, '2026-11-04 11:00:00', 'Joaquín Herrera', 98000),
(4, '2026-11-05 16:45:00', 'Camila Díaz', 685000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD PRIMARY KEY (`id_producto`,`id_venta`),
  ADD KEY `fk_pv_venta` (`id_venta`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD CONSTRAINT `fk_pv_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pv_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
