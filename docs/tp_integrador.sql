-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2026 a las 21:50:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `clave` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consolas`
--

CREATE TABLE `consolas` (
  `modelo` varchar(20) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `imagen` varchar(150) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consolas`
--

INSERT INTO `consolas` (`modelo`, `marca`, `imagen`, `activo`) VALUES
('PC', 'Microsoft / Varios', '', 1),
('PlayStation 2', 'Sony', 'ps2.jpg', 1),
('PlayStation 3', 'Sony', 'ps3.jpg', 1),
('PlayStation 4', 'Sony', 'ps4.jpg', 1),
('PlayStation 5', 'Sony', 'ps5.jpg', 1),
('Xbox 360', 'Microsoft', 'xbox-360.jpg', 1),
('Xbox One', 'Microsoft', 'xbox-one.jpg', 1),
('Xbox Series X', 'Microsoft', 'xbox-series-x.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` int(11) NOT NULL,
  `imagen` varchar(150) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `fecha_salida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`, `precio`, `imagen`, `activo`, `genero`, `fecha_salida`) VALUES
(1, 'Grand Theft Auto: San Andreas', 15000, 'gta_san_andreas_cover.jpg', 1, 'Acción / Mundo Abierto', '2004-10-26'),
(2, 'God of War II', 15000, 'god_of_war_2_cover.jpg', 1, 'Hack and Slash', '2007-03-13'),
(3, 'Shadow of the Colossus', 18000, 'shadow_of_the_colossus_cover.jpg', 1, 'Aventura', '2005-10-18'),
(4, 'Resident Evil 4', 18000, 'resident_evil_4_cover.jpg', 1, 'Survival Horror', '2005-01-11'),
(5, 'Silent Hill 2', 18000, 'silent_hill_2_cover.jpg', 1, 'Survival Horror', '2001-09-24'),
(6, 'The Last of Us', 22000, 'the_last_of_us_cover.jpg', 1, 'Acción / Aventura', '2013-06-14'),
(7, 'Grand Theft Auto V', 35000, 'gta_v_cover.jpg', 1, 'Acción / Mundo Abierto', '2013-09-17'),
(8, 'Red Dead Redemption', 32000, 'red_dead_redemption_cover.jpg', 1, 'Mundo Abierto / Western', '2010-05-18'),
(9, 'God of War III', 22000, 'god_of_war_3_cover.jpg', 1, 'Hack and Slash', '2010-03-16'),
(10, 'Dark Souls', 25000, 'dark_souls_cover.jpg', 1, 'Soulslike / RPG', '2011-09-22'),
(11, 'God of War (2018)', 35000, 'god_of_war_2018_cover.jpg', 1, 'Acción / Aventura', '2018-04-20'),
(12, 'Bloodborne', 28000, 'bloodborne_cover.jpg', 1, 'Soulslike / RPG', '2015-03-24'),
(13, 'The Witcher 3: Wild Hunt', 38000, 'witcher_3_cover.jpg', 1, 'RPG / Aventura', '2015-05-19'),
(14, 'Red Dead Redemption 2', 65000, 'rdr2_cover.jpg', 1, 'Mundo Abierto / Western', '2018-10-26'),
(15, 'Marvel\'s Spider-Man 2', 85000, 'spiderman_2_cover.jpg', 1, 'Acción / Aventura', '2023-10-20'),
(16, 'Elden Ring', 72000, 'elden_ring_cover.jpg', 1, 'Soulslike / RPG', '2022-02-25'),
(17, 'Cyberpunk 2077', 55000, 'cyberpunk_2077_cover.jpg', 1, 'Rol / Disparos', '2020-12-10'),
(18, 'Baldur\'s Gate 3', 70000, 'baldurs_gate_3_cover.jpg', 1, 'Rol / RPG', '2023-08-03'),
(19, 'Halo 3', 20000, 'halo_3_cover.jpg', 1, 'Disparos en primera persona', '2007-09-25'),
(20, 'Gears of War 2', 20000, 'gears_of_war_2_cover.jpg', 1, 'Disparos en tercera persona', '2008-11-07'),
(21, 'The Elder Scrolls V: Skyrim', 32000, 'skyrim_cover.jpg', 1, 'Rol / RPG', '2011-11-11'),
(22, 'Halo: The Master Chief Collection', 42000, 'halo_mcc_cover.jpg', 1, 'Disparos en primera persona', '2014-11-11'),
(23, 'Forza Horizon 4', 45000, 'forza_horizon_4_cover.jpg', 1, 'Carreras', '2018-10-02'),
(24, 'Halo Infinite', 55000, 'halo_infinite_cover.jpg', 1, 'Disparos en primera persona', '2021-12-08'),
(25, 'Forza Horizon 5', 75000, 'forza_horizon_5_cover.jpg', 1, 'Carreras', '2021-11-09'),
(26, 'Half-Life 2', 12000, 'half_life_2_cover.jpg', 1, 'Disparos en primera persona', '2004-11-16'),
(27, 'Counter-Strike 2', 0, 'cs2_cover.jpg', 1, 'Disparos táctico', '2023-09-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego_consola`
--

CREATE TABLE `juego_consola` (
  `id_juego` int(11) NOT NULL,
  `modelo_consola` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juego_consola`
--

INSERT INTO `juego_consola` (`id_juego`, `modelo_consola`) VALUES
(1, 'PlayStation 2'),
(2, 'PlayStation 2'),
(3, 'PlayStation 2'),
(4, 'PlayStation 2'),
(5, 'PlayStation 2'),
(6, 'PlayStation 3'),
(7, 'PlayStation 3'),
(7, 'PlayStation 4'),
(7, 'PlayStation 5'),
(7, 'Xbox 360'),
(7, 'Xbox One'),
(7, 'Xbox Series X'),
(8, 'PlayStation 3'),
(8, 'Xbox 360'),
(9, 'PlayStation 3'),
(10, 'PlayStation 3'),
(11, 'PlayStation 4'),
(12, 'PlayStation 4'),
(13, 'PC'),
(13, 'PlayStation 4'),
(13, 'Xbox One'),
(14, 'PlayStation 4'),
(14, 'Xbox One'),
(15, 'PlayStation 5'),
(16, 'PlayStation 5'),
(16, 'Xbox Series X'),
(17, 'PC'),
(17, 'PlayStation 5'),
(17, 'Xbox Series X'),
(18, 'PC'),
(18, 'PlayStation 5'),
(19, 'Xbox 360'),
(20, 'Xbox 360'),
(21, 'Xbox 360'),
(22, 'Xbox One'),
(23, 'Xbox One'),
(24, 'Xbox Series X'),
(25, 'Xbox Series X'),
(26, 'PC'),
(27, 'PC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `consolas`
--
ALTER TABLE `consolas`
  ADD PRIMARY KEY (`modelo`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juego_consola`
--
ALTER TABLE `juego_consola`
  ADD PRIMARY KEY (`id_juego`,`modelo_consola`),
  ADD KEY `fk_jc_consola` (`modelo_consola`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `juego_consola`
--
ALTER TABLE `juego_consola`
  ADD CONSTRAINT `fk_jc_consola` FOREIGN KEY (`modelo_consola`) REFERENCES `consolas` (`modelo`),
  ADD CONSTRAINT `fk_jc_juego` FOREIGN KEY (`id_juego`) REFERENCES `juegos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
