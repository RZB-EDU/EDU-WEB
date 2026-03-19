CREATE TABLE `emailAlerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`degreeLevel` enum('bachelor','master','phd','postdoc'),
	`fieldOfStudy` varchar(255),
	`countries` json,
	`fundingTypes` json,
	`daysBeforeDeadline` int DEFAULT 30,
	`enabled` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailAlerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`scholarshipId` int,
	`researchTopicId` int,
	`score` decimal(5,2),
	`reason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `researchPapers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`authors` json,
	`abstract` text,
	`researchTopicId` int,
	`universityId` int,
	`source` enum('nature_index','google_scholar','arxiv','ssrn','other') NOT NULL,
	`sourceUrl` varchar(500),
	`publicationDate` timestamp,
	`citations` int DEFAULT 0,
	`keywords` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `researchPapers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `researchTopics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` enum('natural_sciences','engineering','health_medicine','social_sciences','arts_humanities') NOT NULL,
	`description` text,
	`trendingScore` int DEFAULT 0,
	`relatedUniversities` json,
	`keywords` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `researchTopics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `savedScholarships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`scholarshipId` int NOT NULL,
	`savedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedScholarships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scholarships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`universityId` int,
	`country` varchar(100) NOT NULL,
	`degreeLevel` enum('bachelor','master','phd','postdoc') NOT NULL,
	`fieldOfStudy` varchar(255),
	`fundingType` enum('fully_funded','partial','subject_specific') NOT NULL,
	`amount` decimal(12,2),
	`currency` varchar(10) DEFAULT 'USD',
	`eligibility` text,
	`deadline` timestamp,
	`applicationLink` varchar(500),
	`requirements` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scholarships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `universities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`country` varchar(100) NOT NULL,
	`city` varchar(100),
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`website` varchar(255),
	`description` text,
	`researchStrengths` json,
	`ranking` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `universities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userInterests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`researchTopicId` int,
	`scholarshipId` int,
	`interestType` enum('research','scholarship') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userInterests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `academicLevel` enum('high_school','bachelor','master','phd','postdoc');--> statement-breakpoint
ALTER TABLE `users` ADD `fieldOfStudy` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `interests` json;--> statement-breakpoint
ALTER TABLE `users` ADD `targetCountries` json;