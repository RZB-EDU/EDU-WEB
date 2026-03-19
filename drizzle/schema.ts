import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with academic profile fields for recommendations.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Academic profile fields
  academicLevel: mysqlEnum("academicLevel", ["high_school", "bachelor", "master", "phd", "postdoc"]),
  fieldOfStudy: varchar("fieldOfStudy", { length: 255 }),
  interests: json("interests"), // Array of research interests
  targetCountries: json("targetCountries"), // Array of preferred countries
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Universities table with research strengths
 */
export const universities = mysqlTable("universities", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  website: varchar("website", { length: 255 }),
  description: text("description"),
  researchStrengths: json("researchStrengths"), // Array of research fields
  ranking: int("ranking"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type University = typeof universities.$inferSelect;
export type InsertUniversity = typeof universities.$inferInsert;

/**
 * Scholarships database
 */
export const scholarships = mysqlTable("scholarships", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  universityId: int("universityId"),
  country: varchar("country", { length: 100 }).notNull(),
  degreeLevel: mysqlEnum("degreeLevel", ["bachelor", "master", "phd", "postdoc"]).notNull(),
  fieldOfStudy: varchar("fieldOfStudy", { length: 255 }),
  fundingType: mysqlEnum("fundingType", ["fully_funded", "partial", "subject_specific"]).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("USD"),
  eligibility: text("eligibility"),
  deadline: timestamp("deadline"),
  applicationLink: varchar("applicationLink", { length: 500 }),
  requirements: json("requirements"), // Array of requirements
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Scholarship = typeof scholarships.$inferSelect;
export type InsertScholarship = typeof scholarships.$inferInsert;

/**
 * Research topics categorized by academic field
 */
export const researchTopics = mysqlTable("researchTopics", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", [
    "natural_sciences",
    "engineering",
    "health_medicine",
    "social_sciences",
    "arts_humanities"
  ]).notNull(),
  description: text("description"),
  trendingScore: int("trendingScore").default(0),
  relatedUniversities: json("relatedUniversities"), // Array of university IDs
  keywords: json("keywords"), // Array of keywords
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ResearchTopic = typeof researchTopics.$inferSelect;
export type InsertResearchTopic = typeof researchTopics.$inferInsert;

/**
 * Research papers database
 */
export const researchPapers = mysqlTable("researchPapers", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  authors: json("authors"), // Array of author names
  abstract: text("abstract"),
  researchTopicId: int("researchTopicId"),
  universityId: int("universityId"),
  source: mysqlEnum("source", ["nature_index", "google_scholar", "arxiv", "ssrn", "other"]).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 500 }),
  publicationDate: timestamp("publicationDate"),
  citations: int("citations").default(0),
  keywords: json("keywords"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ResearchPaper = typeof researchPapers.$inferSelect;
export type InsertResearchPaper = typeof researchPapers.$inferInsert;

/**
 * User saved scholarships
 */
export const savedScholarships = mysqlTable("savedScholarships", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  scholarshipId: int("scholarshipId").notNull(),
  savedAt: timestamp("savedAt").defaultNow().notNull(),
});

export type SavedScholarship = typeof savedScholarships.$inferSelect;
export type InsertSavedScholarship = typeof savedScholarships.$inferInsert;

/**
 * Email alert subscriptions
 */
export const emailAlerts = mysqlTable("emailAlerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  degreeLevel: mysqlEnum("degreeLevel", ["bachelor", "master", "phd", "postdoc"]),
  fieldOfStudy: varchar("fieldOfStudy", { length: 255 }),
  countries: json("countries"), // Array of countries
  fundingTypes: json("fundingTypes"), // Array of funding types
  daysBeforeDeadline: int("daysBeforeDeadline").default(30),
  enabled: boolean("enabled").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailAlert = typeof emailAlerts.$inferSelect;
export type InsertEmailAlert = typeof emailAlerts.$inferInsert;

/**
 * User academic interests for recommendations
 */
export const userInterests = mysqlTable("userInterests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  researchTopicId: int("researchTopicId"),
  scholarshipId: int("scholarshipId"),
  interestType: mysqlEnum("interestType", ["research", "scholarship"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserInterest = typeof userInterests.$inferSelect;
export type InsertUserInterest = typeof userInterests.$inferInsert;

/**
 * Recommendation history for AI-powered suggestions
 */
export const recommendations = mysqlTable("recommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  scholarshipId: int("scholarshipId"),
  researchTopicId: int("researchTopicId"),
  score: decimal("score", { precision: 5, scale: 2 }),
  reason: text("reason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = typeof recommendations.$inferInsert;
