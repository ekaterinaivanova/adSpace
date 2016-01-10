-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2016 at 12:02 AM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adspace`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
CREATE TABLE IF NOT EXISTS `offers` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `rules` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `hashtags` varchar(255) DEFAULT NULL,
  `prize` varchar(255) NOT NULL,
  `start` date NOT NULL,
  `finish` date NOT NULL,
  `extra` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_adspace`
--

DROP TABLE IF EXISTS `users_adspace`;
CREATE TABLE IF NOT EXISTS `users_adspace` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_offers`
--

DROP TABLE IF EXISTS `user_offers`;
CREATE TABLE IF NOT EXISTS `user_offers` (
  `user_ID` int(11) NOT NULL,
  `offer_ID` int(11) NOT NULL,
  `number_pic` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `users_adspace`
--
ALTER TABLE `users_adspace`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_offers`
--
ALTER TABLE `user_offers`
  ADD KEY `FK_user_offers_offers_id` (`offer_ID`),
  ADD KEY `FK_user_offers_users_adspace_user_id` (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_adspace`
--
ALTER TABLE `users_adspace`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_offers`
--
ALTER TABLE `user_offers`
  ADD CONSTRAINT `FK_user_offers_offers_id` FOREIGN KEY (`offer_ID`) REFERENCES `offers` (`id`),
  ADD CONSTRAINT `FK_user_offers_users_adspace_user_id` FOREIGN KEY (`user_ID`) REFERENCES `users_adspace` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
