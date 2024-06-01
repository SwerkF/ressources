-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 31 mai 2024 à 20:38
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ressources`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `Category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Design', '2024-05-20 20:30:46.377', '2024-05-20 20:30:46.377'),
(2, 'Code', '2024-05-20 20:30:46.377', '2024-05-20 20:30:46.377'),
(3, 'Video', '2024-05-20 20:30:46.377', '2024-05-20 20:30:46.377'),
(4, 'Tutoriel', '2024-05-20 20:30:46.377', '2024-05-20 20:30:46.377');

-- --------------------------------------------------------

--
-- Structure de la table `content`
--

CREATE TABLE `Content` (
  `id` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `ressourceId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `content`
--

INSERT INTO `Content` (`id`, `type`, `value`, `ressourceId`, `createdAt`, `updatedAt`) VALUES
(7, 'text', 'Ceci est un text automatique', 1, '2024-05-25 20:55:13.000', '2024-05-25 20:55:13.000'),
(8, 'image', 'https://placehold.co/600x400', 1, '2024-05-25 20:56:21.000', '2024-05-25 20:56:21.000'),
(9, 'code', 'js+<div>\n <h1>Hello</h1>\n</div>', 1, '2024-05-25 20:56:21.000', '2024-05-25 20:56:21.000'),
(10, 'image', 'https://placehold.co/600x400', 1, '2024-05-25 20:59:45.000', '2024-05-25 20:59:45.000');

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

CREATE TABLE `Profile` (
  `id` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `bio` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `profile`
--

INSERT INTO `Profile` (`id`, `userId`, `bio`, `image`, `createdAt`, `updatedAt`) VALUES
('clwo65c32000110eip94niu8x', 2, 'zefzefzef', 'http://localhost:3000/api/images/2.gif', '2024-05-26 23:26:35.631', '2024-05-28 22:01:17.310'),
('clwo6j9vt000310ei9fqtdk9u', 3, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocIQ9jltWxcV8-2YRa5DB98EO1TyJavM-Fz-uS4blCGMSz__gPvx=s96-c', '2024-05-26 23:37:25.961', '2024-05-26 23:37:25.961');

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

CREATE TABLE `Rating` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(191) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `ressourceId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ressource`
--

CREATE TABLE `Ressource` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `progress` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ressource`
--

INSERT INTO `Ressource` (`id`, `title`, `description`, `image`, `url`, `createdAt`, `updatedAt`, `progress`) VALUES
(1, 'Shadcn', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ', 'https://ui.shadcn.com/examples/mail-light.png', 'https://ui.shadcn.com', '2024-05-20 20:31:32.000', '2024-05-20 20:31:32.000', 25),
(2, 'DaisyUI', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ', 'https://s3-alpha.figma.com/hub/file/3709321768/b28165db-1eed-4f6a-9027-8f3317357e55-cover.png', 'https://daisyui.com', '2024-05-20 20:31:32.000', '2024-05-20 20:31:32.000', 0),
(3, 'Preline', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ', 'https://tailkits.com/1678395242386_preline.png', 'https://preline.com', '2024-05-20 20:53:50.000', '2024-05-20 20:53:50.000', 0),
(4, 'React', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ', 'https://fr.legacy.reactjs.org/logo-og.png', 'https://react.com', '2024-05-20 20:55:19.000', '2024-05-20 20:55:19.000', 0),
(5, 'Test', 'Test', 'https://tailkits.com/1678395242386_preline.png', 'test.com', '2024-05-20 21:41:33.000', '2024-05-20 21:41:33.000', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'USER',
  `isGoogle` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `User` (`id`, `email`, `name`, `password`, `createdAt`, `updatedAt`, `role`, `isGoogle`) VALUES
(2, 'swerk.pro@gmail.com', 'Swerk Design', '', '2024-05-26 23:26:35.629', '2024-05-28 22:01:17.310', 'ADMIN', 1),
(3, 'oliwer721@gmail.com', 'Oliwer', '', '2024-05-26 23:37:25.958', '2024-05-26 23:37:25.958', 'USER', 1);

-- --------------------------------------------------------

--
-- Structure de la table `_categorytoressource`
--

CREATE TABLE `_CategoryToRessource` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_categorytoressource`
--

INSERT INTO `_CategoryToRessource` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(2, 4),
(2, 5),
(3, 5),
(4, 5);

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--
--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`);

--
-- Index pour la table `content`
--
ALTER TABLE `Content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Content_ressourceId_fkey` (`ressourceId`);

--
-- Index pour la table `profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Profile_userId_key` (`userId`);

--
-- Index pour la table `rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Rating_userId_fkey` (`userId`),
  ADD KEY `Rating_ressourceId_fkey` (`ressourceId`);

--
-- Index pour la table `ressource`
--
ALTER TABLE `Ressource`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index pour la table `_categorytoressource`
--
ALTER TABLE `_CategoryToTessource`
  ADD UNIQUE KEY `_CategoryToRessource_AB_unique` (`A`,`B`),
  ADD KEY `_CategoryToRessource_B_index` (`B`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `content`
--
ALTER TABLE `Content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `rating`
--
ALTER TABLE `Rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ressource`
--
ALTER TABLE `Ressource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `content`
--
ALTER TABLE `Content`
  ADD CONSTRAINT `Content_ressourceId_fkey` FOREIGN KEY (`ressourceId`) REFERENCES `ressource` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `rating`
--
ALTER TABLE `Rating`
  ADD CONSTRAINT `Rating_ressourceId_fkey` FOREIGN KEY (`ressourceId`) REFERENCES `ressource` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Rating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `_categorytoressource`
--
ALTER TABLE `_CategoryToRessource`
  ADD CONSTRAINT `_CategoryToRessource_A_fkey` FOREIGN KEY (`A`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_CategoryToRessource_B_fkey` FOREIGN KEY (`B`) REFERENCES `ressource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;