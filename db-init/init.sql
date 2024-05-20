-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 10:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

CREATE DATABASE IF NOT EXISTS nodebank;
USE nodebank;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodebank`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `user_id`) VALUES
(1, 2),
(2, 70);

-- --------------------------------------------------------

--
-- Table structure for table `clerks`
--

CREATE TABLE `clerks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clerks`
--

INSERT INTO `clerks` (`id`, `user_id`) VALUES
(1, 71),
(2, 72),
(3, 73);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `balance`) VALUES
(1, 1, 17951.54),
(2, 3, 0.00),
(3, 4, 326.20),
(4, 5, 0.00),
(5, 6, 0.00),
(6, 7, 0.00),
(7, 8, 0.00),
(8, 9, 0.00),
(9, 10, 0.00),
(10, 11, 0.00),
(11, 12, 0.00),
(12, 13, 0.00),
(13, 14, 0.00),
(14, 15, 0.00),
(15, 16, 0.00),
(16, 17, 0.00),
(17, 18, 0.00),
(18, 19, 0.00),
(19, 20, 0.00),
(20, 21, 0.00),
(21, 22, 0.00),
(22, 23, 0.00),
(23, 24, 0.00),
(24, 25, 0.00),
(25, 26, 0.00),
(26, 27, 0.00),
(27, 28, 0.00),
(28, 29, 0.00),
(29, 30, 0.00),
(30, 31, 0.00),
(31, 32, 0.00),
(32, 33, 0.00),
(33, 34, 0.00),
(34, 35, 0.00),
(35, 36, 0.00),
(36, 37, 0.00),
(37, 38, 0.00),
(38, 39, 0.00),
(39, 40, 0.00),
(40, 41, 0.00),
(41, 42, 0.00),
(42, 43, 0.00),
(43, 44, 0.00),
(44, 45, 0.00),
(45, 46, 0.00),
(46, 47, 0.00),
(47, 48, 0.00),
(48, 49, 0.00),
(49, 50, 0.00),
(50, 51, 0.00),
(51, 52, 0.00),
(52, 53, 0.00),
(53, 54, 0.00),
(54, 55, 0.00),
(55, 56, 0.00),
(56, 57, 0.00),
(57, 58, 0.00),
(58, 59, 0.00),
(59, 60, 0.00),
(60, 61, 0.00),
(61, 62, 0.00),
(62, 63, 0.00),
(63, 64, 0.00),
(64, 65, 0.00),
(65, 66, 0.00),
(66, 67, 0.00),
(67, 68, 0.00),
(68, 69, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` enum('deposit','withdrawal','transfer') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `sender_id`, `receiver_id`, `amount`, `transaction_type`, `created_at`) VALUES
(1, 1, 4, 50.00, 'transfer', '2024-04-23 23:33:18'),
(2, 1, 4, 50.00, 'transfer', '2024-04-23 23:35:08'),
(3, 4, 1, 40.00, 'transfer', '2024-04-23 23:36:04'),
(4, 1, 1, 50.43, 'withdrawal', '2024-04-23 23:38:30'),
(5, 1, 1, 90.93, 'deposit', '2024-04-23 23:38:38'),
(6, 2, 2, 100.00, 'deposit', '2024-04-25 10:03:25'),
(8, 1, 1, 90.93, 'deposit', '2024-04-25 10:03:26'),
(9, 1, 1, 90.93, 'deposit', '2024-04-25 10:04:03'),
(10, 1, 1, 90.93, 'deposit', '2024-04-25 10:04:09'),
(11, 1, 1, 90.93, 'deposit', '2024-04-25 10:04:12'),
(12, 1, 1, 90.93, 'deposit', '2024-04-25 10:04:13'),
(13, 1, 1, 90.93, 'deposit', '2024-04-25 10:04:14'),
(14, 1, 1, 9000.93, 'deposit', '2024-04-25 10:04:23'),
(15, 2, 2, 100.00, 'deposit', '2024-04-25 10:06:36'),
(17, 1, 1, 9000.93, 'deposit', '2024-04-25 10:06:42'),
(18, 2, 2, 100.00, 'deposit', '2024-04-25 10:06:50'),
(20, 2, 2, 100.00, 'deposit', '2024-04-25 10:07:04'),
(22, 2, 2, 100.00, 'deposit', '2024-04-25 10:07:25'),
(24, 1, 1, 9000.93, 'deposit', '2024-04-25 10:07:28'),
(25, 1, 1, 9000.93, 'deposit', '2024-04-25 10:07:33'),
(26, 2, 2, 100.00, 'deposit', '2024-04-25 10:08:50'),
(28, 2, 2, 100.00, 'deposit', '2024-04-25 10:09:15'),
(30, 1, 1, 9000.93, 'deposit', '2024-04-25 10:09:29'),
(31, 1, 1, 9000.93, 'deposit', '2024-04-25 10:10:06'),
(32, 2, 2, 100.00, 'deposit', '2024-04-25 10:11:51'),
(34, 1, 1, 9000.93, 'deposit', '2024-04-25 10:11:51'),
(35, 1, 1, 9000.93, 'deposit', '2024-04-25 10:11:54'),
(36, 2, 2, 100.00, 'deposit', '2024-04-25 10:12:15'),
(38, 2, 2, 100.00, 'deposit', '2024-04-25 10:13:00'),
(40, 1, 1, 50.43, 'withdrawal', '2024-04-25 10:13:08'),
(41, 2, 2, 100.00, 'deposit', '2024-04-29 06:43:40'),
(43, 2, 2, 100.00, 'deposit', '2024-04-29 06:45:12'),
(45, 2, 2, 100.00, 'deposit', '2024-04-29 06:45:28'),
(47, 2, 2, 100.00, 'deposit', '2024-04-29 06:45:40'),
(49, 2, 2, 100.00, 'deposit', '2024-04-29 06:46:03'),
(51, 2, 2, 100.00, 'deposit', '2024-04-29 06:46:57'),
(53, 2, 2, 100.00, 'deposit', '2024-04-29 06:47:03'),
(55, 2, 2, 100.00, 'deposit', '2024-04-29 06:48:42'),
(57, 2, 2, 100.00, 'deposit', '2024-04-29 06:48:49'),
(59, 2, 2, 100.00, 'deposit', '2024-04-29 06:48:58'),
(61, 2, 2, 100.00, 'deposit', '2024-04-29 06:49:21'),
(63, 2, 2, 100.00, 'deposit', '2024-04-29 06:50:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','clerk','customer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'Ahlam', '$2b$10$ORP8bU2kdWGTg3h4EE6dC.cLrd6GL/gjENBUaQJRKL60uTGQ4rQCK', 'customer'),
(2, 'ahmed', '$2b$10$am2XSnpe12By6HbkVvkwgOhg/p.1iJe/s3lIDIP1ho0PMz2ij0hKe', 'admin'),
(3, 'testuser', '$2b$10$eoQgVtmq.VjC4owWM37bw..jKMirK8C4oYsrvPXvRcNUlLKrC.kVK', 'customer'),
(4, 'testuser2', 'hashedPassword', 'customer'),
(5, 'testuser', 'hashedPassword', 'customer'),
(6, 'testuser', 'hashedPassword', 'customer'),
(7, 'testuser', 'hashedPassword', 'customer'),
(8, 'testuser', 'hashedPassword', 'customer'),
(9, 'testuser', 'hashedPassword', 'customer'),
(10, 'testuser', 'hashedPassword', 'customer'),
(11, 'testuser', 'hashedPassword', 'customer'),
(12, 'testuser', 'hashedPassword', 'customer'),
(13, 'testuser', 'hashedPassword', 'customer'),
(14, 'testuser', 'hashedPassword', 'customer'),
(15, 'testuser', 'hashedPassword', 'customer'),
(16, 'testuser', 'hashedPassword', 'customer'),
(17, 'testuser', 'hashedPassword', 'customer'),
(18, 'testuser', 'hashedPassword', 'customer'),
(19, 'testuser', 'hashedPassword', 'customer'),
(20, 'testuser', 'hashedPassword', 'customer'),
(21, 'testuser', 'hashedPassword', 'customer'),
(22, 'testuser', 'hashedPassword', 'customer'),
(23, 'testuser', 'hashedPassword', 'customer'),
(24, 'testuser', 'hashedPassword', 'customer'),
(25, 'testuser', 'hashedPassword', 'customer'),
(26, 'testuser', 'hashedPassword', 'customer'),
(27, 'testuser', 'hashedPassword', 'customer'),
(28, 'testuser', 'hashedPassword', 'customer'),
(29, 'testuser', 'hashedPassword', 'customer'),
(30, 'testuser', 'hashedPassword', 'customer'),
(31, 'testuser', 'hashedPassword', 'customer'),
(32, 'testuser', 'hashedPassword', 'customer'),
(33, 'testuser', 'hashedPassword', 'customer'),
(34, 'testuser', 'hashedPassword', 'customer'),
(35, 'testuser', 'hashedPassword', 'customer'),
(36, 'testuser', 'hashedPassword', 'customer'),
(37, 'testuser', 'hashedPassword', 'customer'),
(38, 'testuser', 'hashedPassword', 'customer'),
(39, 'testuser', 'hashedPassword', 'customer'),
(40, 'testuser', 'hashedPassword', 'customer'),
(41, 'testuser', 'hashedPassword', 'customer'),
(42, 'testuser', 'hashedPassword', 'customer'),
(43, 'testuser', 'hashedPassword', 'customer'),
(44, 'testuser', 'hashedPassword', 'customer'),
(45, 'testuser', 'hashedPassword', 'customer'),
(46, 'testuser', 'hashedPassword', 'customer'),
(47, 'testuser', 'hashedPassword', 'customer'),
(48, 'testuser', 'hashedPassword', 'customer'),
(49, 'testuser', 'hashedPassword', 'customer'),
(50, 'testuser', 'hashedPassword', 'customer'),
(51, 'testuser', 'hashedPassword', 'customer'),
(52, 'testuser', 'hashedPassword', 'customer'),
(53, 'testuser', 'hashedPassword', 'customer'),
(54, 'testuser', 'hashedPassword', 'customer'),
(55, 'testuser', 'hashedPassword', 'customer'),
(56, 'testuser', 'hashedPassword', 'customer'),
(57, 'testuser', 'hashedPassword', 'customer'),
(58, 'testuser', 'hashedPassword', 'customer'),
(59, 'testuser', 'hashedPassword', 'customer'),
(60, 'testuser', 'hashedPassword', 'customer'),
(61, 'testuser', 'hashedPassword', 'customer'),
(62, 'testuser', 'hashedPassword', 'customer'),
(63, 'testuser', 'hashedPassword', 'customer'),
(64, 'testuser', 'hashedPassword', 'customer'),
(65, 'testuser', 'hashedPassword', 'customer'),
(66, 'testuser', 'hashedPassword', 'customer'),
(67, 'testuser', 'hashedPassword', 'customer'),
(68, 'testuser', 'hashedPassword', 'customer'),
(69, 'testuser', 'hashedPassword', 'customer'),
(70, 'ahmed2', '$2b$10$aZ1reQaheyMhclu2u.KgsuM1Q66QJagOw1gv5NgRKyopwKw8jze8i', 'admin'),
(71, 'clerk3', '$2b$10$YyhigRc3hp3OWpuLaBd69eXlqNz4MNA1jFVcDXza8zzfz1UQf9As2', 'clerk'),
(72, 'clerk-testjwt', '$2b$10$YLgYyPLDv1lV/OMN2ef3R.Ja0F/u6hNS/Kbvu0EzBFYNOqMEUoRrW', 'clerk'),
(73, 'clerk-testjwt3', '$2b$10$9TY7pvEPPfhE/NE.VbZ5iuL.GbJhROJWV2vwvqym.HAWZ5DYGE.Fa', 'clerk');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `clerks`
--
ALTER TABLE `clerks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `customer_id` (`sender_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clerks`
--
ALTER TABLE `clerks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `clerks`
--
ALTER TABLE `clerks`
  ADD CONSTRAINT `clerks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
