-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2019 at 09:36 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE scipio;
USE scipio;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scipio`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_creation_codes`
--

CREATE TABLE `account_creation_codes` (
  `id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `expiration_date` datetime NOT NULL,
  `user_login` varchar(32) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Triggers `account_creation_codes`
--
DELIMITER $$
CREATE TRIGGER `check_unique_login_user_account_code` BEFORE INSERT ON `account_creation_codes` FOR EACH ROW BEGIN
    DECLARE found_user_login_count INT;
	SELECT COUNT(1) INTO found_user_login_count FROM users WHERE users.login = NEW.user_login;
    IF (found_user_login_count > 0) THEN
    	SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'user_already_exists';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `hashs`
--

CREATE TABLE `hashs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `hashs`
--

INSERT INTO `hashs` (`id`, `user_id`, `hash`) VALUES
(3, 31, '5ce47341784fcc972a5bf17c8f9f77ce0c753b7f'),
(4, 32, 'e3cf254255136d92d30eaeb7167c73a80f50e1e4'),
(8, 36, '03b686e771342a159de1c95cba0f599314754656'),
(9, 37, 'dd51ee16f2cdf21e557cb019700014beb089b6c3'),
(10, 38, '90acfdbac9a602787dc7f8eee6133e910172a9b8'),
(11, 39, '3e394ccacae676ed135093b6f75b9d6c11391f5f'),
(12, 40, '808232fddb54684631af4985212554d08e5969dd'),
(13, 41, 'c1550d85d834045be0e8c0e45a49cf8296b5ded7'),
(14, 42, '25e094b9dcc8c145b66fb09b0a84ab600c72c5c4'),
(17, 45, '97f56401d641a87362942a93f6940a5dc33123c7');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Chat'),
(4, 'Communist_Split'),
(7, 'Conan'),
(5, 'Minecraft'),
(3, 'Spotify'),
(6, 'Trackmania'),
(8, 'Wheel_Decide');

-- --------------------------------------------------------

--
-- Table structure for table `split_groups`
--

CREATE TABLE `split_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_discord_server` varchar(128) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `split_groups`
--

INSERT INTO `split_groups` (`id`, `name`, `id_discord_server`) VALUES
(1, 'coloc\'', '423216534480224258'),
(5, 'TCC', '308358619177418752');

-- --------------------------------------------------------

--
-- Table structure for table `split_payments`
--

CREATE TABLE `split_payments` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `split_group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `split_payments`
--

INSERT INTO `split_payments` (`id`, `description`, `date`, `image`, `split_group_id`, `user_id`, `total`) VALUES
(10, 'Pizza Hut - 20/08/2018', '2018-08-26', '', 1, 31, 61.65),
(11, 'Ikea - 28/08', '2018-08-28', '', 1, 31, 77.91),
(12, 'Our Last Night', '2018-09-03', '', 5, 36, 49.84),
(13, 'Domino\'s - 05/09', '2018-09-06', '', 5, 31, 33),
(14, 'Installation des lumière - ouvrier', '2018-09-08', '', 1, 31, 50),
(15, 'Frigo - Vandenborre', '2018-09-13', '', 1, 31, 600),
(16, '', '2018-09-19', '', 5, 36, 60),
(17, 'Commande materiel.net - 29/09', '2018-10-22', '', 1, 31, 1605.55),
(18, 'Barrettes de ram', '2018-10-23', '', 1, 31, 50),
(19, 'Electrabel - 11/09', '2018-10-23', '', 1, 31, 50.12),
(20, 'Electrabel - 12/10', '2018-10-23', '', 1, 31, 50.12),
(21, 'Telenet - 22/09', '2018-10-23', '', 1, 31, 66.19),
(22, 'Telenet - 22/10', '2018-10-23', '', 1, 31, 54),
(23, 'charges appartement 01/07 - 30/09', '2018-11-07', '', 1, 31, 329),
(24, 'Electrabel - 13/11', '2018-11-13', '', 1, 31, 50.12),
(25, 'Telenet - 25/11', '2018-11-25', '', 1, 31, 54),
(27, 'Ikea table + canap', '2018-11-25', '', 1, 32, 1754.99),
(28, 'Ikea - 4 chaises, tables basse, ...', '2018-11-25', '', 1, 38, 494.12),
(29, 'Remboursement frais coloc', '2018-11-25', '', 1, 38, 736.58),
(30, 'Baffles', '2018-12-06', '', 1, 31, 293.89),
(31, 'Electrabel - 11/12', '2018-12-11', '', 1, 31, 50.12),
(32, 'Telenet - 21/12', '2018-12-23', '', 1, 31, 54),
(33, 'Concert architects - 11/01/2019', '2019-01-01', '', 5, 31, 83.88),
(34, 'Electrabel - 11/01/19', '2019-01-11', '', 1, 31, 50.12),
(35, 'Huggys 19/01', '2019-01-20', '', 1, 32, 15.5),
(36, 'Telenet - 22/01', '2019-01-27', '', 1, 31, 54),
(37, 'Charges appart : 01/10/2018 - 31/12/2018', '2019-02-05', '', 1, 31, 578.73),
(38, 'Assurance AXA : 01/02/2018 - 31/01/2019', '2019-02-06', '', 1, 31, 161.41),
(39, 'Electrabel - 12/02/2019', '2019-02-12', '', 1, 31, 50.12),
(40, 'Telenet - 13/03/2019', '2019-02-23', '', 1, 31, 54),
(41, 'Concert Enter Shikari', '2019-02-26', '', 5, 32, 78),
(42, '3DG', '2019-02-26', '', 5, 36, 68.8),
(43, 'Electrabel - 11/03', '2019-03-12', '', 1, 31, 50.12),
(44, 'Telenet - 22/03', '2019-03-22', '', 1, 31, 54);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(32) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(64) COLLATE utf8_bin NOT NULL,
  `active` tinyint(1) NOT NULL,
  `id_keycloak` varchar(128) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `active`, `id_keycloak`) VALUES
(31, 'kykysenpai', '$2a$10$VVCXJ6.cu7raDZJ4hBCTB.6c6hov42/iTDkULmYMa1KDnsnE.5dZS', 'kyrilltircher14@hotmail.com', 1, 'f6d98e52-6eaf-46b8-bee2-38a2b0f79409'),
(32, 'Locky', '$2a$10$5kwtAdFdRNAAO53Hu2Pc/u3/VdLNLhBfEcvkbNydBAkNuRy0g9UO6', 'hermant-loic@hotmail.fr', 1, 'bf56595d-fc5a-422e-ae09-7d647100b6ed'),
(36, 'luckyloutre', '$2a$10$5kwtAdFdRNAAO53Hu2Pc/u3/VdLNLhBfEcvkbNydBAkNuRy0g9UO6', 'nad.moumneh@gmail.com', 1, 'f6b4a47d-5358-454f-afae-4c57b9a8a94e'),
(37, 'johndoe', '$2a$10$5kwtAdFdRNAAO53Hu2Pc/u3/VdLNLhBfEcvkbNydBAkNuRy0g9UO6', 'scipio@tircher.be', 1, ''),
(38, 'himedoll', '$2a$10$vWUPR06wJI08C6GgR7WAUOHLNeL7Ujs/8xS9x2TntxYuhizQsAJJW', 'zhangtsinxias@gmail.com', 1, '55ed63af-6462-4991-ab5f-510f02945b1a'),
(39, 'johnnyboy', '$2a$10$LWOLnMyUXZMviquF2VeijeSA6rzcA6yXYaw9naP.bO5CnKGK0sJ72', 'jonathan.vis@hotmail.com', 1, 'd1b0dcb2-d46c-4d70-ab15-74b1abb38914'),
(40, 'Sardox', '$2a$10$8Ws7iL.YwlYkTLfGAkgyO.qiAXSx/YCX6cw4H7jqHnGa/UYMzlria', 'lan_icari@hotmail.com', 1, ''),
(41, 'Celiria', '$2a$10$AK03k6Jht4R3Sg5cdCC9v.iEMdbZbekmjbHYA5GMuqJvc6GMSxZdm', 'canecane62@hotmail.fr', 1, ''),
(42, 'bicky', '$2a$10$3ztGd8VFjuLFEwe.lNDuvuW8T9Kb.xMjPsuXXfPDKztOxGhV7MTmq', 'vivaplagias@gmail.com', 1, 'bbbeffc9-401c-43d0-9d31-cff1c5fb1130'),
(45, 'slinpy', '$2b$10$MqLIapVABxYv3pnCOVPRfeOf6gHv5bbZoDUUxjMfA1HnyItinVYm6', 'nicolasdeliedekerke@gmail.com', 1, '155b0a8b-6f66-4e39-9ef2-6da980edb78c');

-- --------------------------------------------------------

--
-- Table structure for table `users_permissions`
--

CREATE TABLE `users_permissions` (
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users_permissions`
--

INSERT INTO `users_permissions` (`permission_id`, `user_id`) VALUES
(1, 31),
(2, 31),
(3, 31),
(4, 31),
(5, 31),
(6, 31),
(7, 31),
(8, 31),
(1, 32),
(2, 32),
(4, 32),
(5, 32),
(6, 32),
(7, 32),
(1, 36),
(2, 36),
(4, 36),
(5, 36),
(6, 36),
(7, 36),
(4, 37),
(5, 37),
(6, 37),
(7, 37),
(1, 38),
(2, 38),
(3, 38),
(4, 38),
(5, 38),
(8, 38),
(2, 39),
(5, 39),
(6, 39),
(7, 39),
(5, 40),
(7, 40),
(7, 41),
(2, 42),
(4, 42),
(5, 42),
(6, 42),
(7, 42),
(4, 45),
(6, 45);

-- --------------------------------------------------------

--
-- Table structure for table `users_split_groups`
--

CREATE TABLE `users_split_groups` (
  `split_group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users_split_groups`
--

INSERT INTO `users_split_groups` (`split_group_id`, `user_id`) VALUES
(1, 31),
(1, 32),
(1, 38),
(5, 31),
(5, 32),
(5, 36),
(5, 38),
(5, 45);

-- --------------------------------------------------------

--
-- Table structure for table `users_split_payments`
--

CREATE TABLE `users_split_payments` (
  `split_payment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users_split_payments`
--

INSERT INTO `users_split_payments` (`split_payment_id`, `user_id`, `amount`) VALUES
(10, 31, 20.55),
(10, 32, 20.55),
(10, 38, 20.55),
(11, 31, 25.97),
(11, 32, 25.97),
(11, 38, 25.97),
(12, 31, 24.92),
(12, 32, 0),
(12, 36, 24.92),
(12, 38, 0),
(12, 45, 0),
(13, 31, 16.5),
(13, 32, 16.5),
(13, 36, 0),
(13, 38, 0),
(13, 45, 0),
(14, 31, 16.67),
(14, 32, 16.67),
(14, 38, 16.66),
(15, 31, 200),
(15, 32, 200),
(15, 38, 200),
(16, 31, 15),
(16, 32, 15),
(16, 36, 15),
(16, 38, 15),
(16, 45, 0),
(17, 31, 727.8),
(17, 32, 877.75),
(17, 38, 0),
(18, 31, 0),
(18, 32, 50),
(18, 38, 0),
(19, 31, 16.71),
(19, 32, 16.71),
(19, 38, 16.7),
(20, 31, 16.71),
(20, 32, 16.71),
(20, 38, 16.7),
(21, 31, 22.07),
(21, 32, 22.06),
(21, 38, 22.06),
(22, 31, 18),
(22, 32, 18),
(22, 38, 18),
(23, 31, 109.67),
(23, 32, 109.67),
(23, 38, 109.66),
(24, 31, 16.71),
(24, 32, 16.71),
(24, 38, 16.7),
(25, 31, 18),
(25, 32, 18),
(25, 38, 18),
(27, 31, 585),
(27, 32, 584.99),
(27, 38, 585),
(28, 31, 164.71),
(28, 32, 164.71),
(28, 38, 164.7),
(29, 31, 316.29),
(29, 32, 420.29),
(29, 38, 0),
(30, 31, 97.97),
(30, 32, 97.96),
(30, 38, 97.96),
(31, 31, 16.71),
(31, 32, 16.71),
(31, 38, 16.7),
(32, 31, 18),
(32, 32, 18),
(32, 38, 18),
(33, 31, 41.94),
(33, 32, 0),
(33, 36, 41.94),
(33, 38, 0),
(33, 45, 0),
(34, 31, 16.71),
(34, 32, 16.71),
(34, 38, 16.7),
(35, 31, 15.5),
(35, 32, 0),
(35, 38, 0),
(36, 31, 18),
(36, 32, 18),
(36, 38, 18),
(37, 31, 192.91),
(37, 32, 192.91),
(37, 38, 192.91),
(38, 31, 53.81),
(38, 32, 53.8),
(38, 38, 53.8),
(39, 31, 16.71),
(39, 32, 16.71),
(39, 38, 16.7),
(40, 31, 18),
(40, 32, 18),
(40, 38, 18),
(41, 31, 26),
(41, 32, 26),
(41, 36, 26),
(41, 38, 0),
(41, 45, 0),
(42, 31, 0),
(42, 32, 34.4),
(42, 36, 34.4),
(42, 38, 0),
(42, 45, 0),
(43, 31, 16.71),
(43, 32, 16.71),
(43, 38, 16.7),
(44, 31, 18),
(44, 32, 18),
(44, 38, 18);

-- --------------------------------------------------------

--
-- Table structure for table `webrtc_audio_channels`
--

CREATE TABLE `webrtc_audio_channels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_creation_codes`
--
ALTER TABLE `account_creation_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_login_2` (`user_login`),
  ADD KEY `user_login` (`user_login`);

--
-- Indexes for table `hashs`
--
ALTER TABLE `hashs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Indexes for table `split_groups`
--
ALTER TABLE `split_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `split_payments`
--
ALTER TABLE `split_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_permissions`
--
ALTER TABLE `users_permissions`
  ADD PRIMARY KEY (`permission_id`,`user_id`),
  ADD KEY `up_users_fk` (`user_id`);

--
-- Indexes for table `users_split_groups`
--
ALTER TABLE `users_split_groups`
  ADD PRIMARY KEY (`split_group_id`,`user_id`);

--
-- Indexes for table `users_split_payments`
--
ALTER TABLE `users_split_payments`
  ADD PRIMARY KEY (`split_payment_id`,`user_id`);

--
-- Indexes for table `webrtc_audio_channels`
--
ALTER TABLE `webrtc_audio_channels`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_creation_codes`
--
ALTER TABLE `account_creation_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `hashs`
--
ALTER TABLE `hashs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `split_groups`
--
ALTER TABLE `split_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `split_payments`
--
ALTER TABLE `split_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `webrtc_audio_channels`
--
ALTER TABLE `webrtc_audio_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `hashs`
--
ALTER TABLE `hashs`
  ADD CONSTRAINT `ha_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_permissions`
--
ALTER TABLE `users_permissions`
  ADD CONSTRAINT `up_permissions_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `up_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
