import { eq, like, and, inArray, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  scholarships,
  researchTopics,
  researchPapers,
  universities,
  savedScholarships,
  emailAlerts,
  userInterests,
  recommendations,
  Scholarship,
  ResearchTopic,
  ResearchPaper,
  University,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Scholarship queries
export async function getScholarships(filters?: {
  country?: string;
  degreeLevel?: string;
  fieldOfStudy?: string;
  fundingType?: string;
  limit?: number;
  offset?: number;
}): Promise<Scholarship[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];

  if (filters?.country) {
    conditions.push(eq(scholarships.country, filters.country));
  }
  if (filters?.degreeLevel) {
    conditions.push(eq(scholarships.degreeLevel, filters.degreeLevel as any));
  }
  if (filters?.fieldOfStudy) {
    conditions.push(like(scholarships.fieldOfStudy, `%${filters.fieldOfStudy}%`));
  }
  if (filters?.fundingType) {
    conditions.push(eq(scholarships.fundingType, filters.fundingType as any));
  }

  let query: any = db.select().from(scholarships).orderBy(desc(scholarships.createdAt));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }

  return query;
}

export async function getScholarshipById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(scholarships).where(eq(scholarships.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Research topics queries
export async function getResearchTopics(filters?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<ResearchTopic[]> {
  const db = await getDb();
  if (!db) return [];

  let query: any = db.select().from(researchTopics).orderBy(desc(researchTopics.trendingScore));

  if (filters?.category) {
    query = query.where(eq(researchTopics.category, filters.category as any));
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }

  return query;
}

export async function getResearchTopicById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(researchTopics).where(eq(researchTopics.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Research papers queries
export async function getResearchPapers(filters?: {
  topicId?: number;
  source?: string;
  limit?: number;
  offset?: number;
}): Promise<ResearchPaper[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];

  if (filters?.topicId) {
    conditions.push(eq(researchPapers.researchTopicId, filters.topicId));
  }
  if (filters?.source) {
    conditions.push(eq(researchPapers.source, filters.source as any));
  }

  let query: any = db.select().from(researchPapers).orderBy(desc(researchPapers.citations));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }

  return query;
}

export async function getResearchPaperById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(researchPapers).where(eq(researchPapers.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Universities queries
export async function getUniversities(filters?: {
  country?: string;
  limit?: number;
  offset?: number;
}): Promise<University[]> {
  const db = await getDb();
  if (!db) return [];

  let query: any = db.select().from(universities).orderBy(asc(universities.ranking));

  if (filters?.country) {
    query = query.where(eq(universities.country, filters.country));
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }

  return query;
}

export async function getUniversityById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(universities).where(eq(universities.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Saved scholarships
export async function getSavedScholarships(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      scholarship: scholarships,
      savedAt: savedScholarships.savedAt,
    })
    .from(savedScholarships)
    .innerJoin(scholarships, eq(savedScholarships.scholarshipId, scholarships.id))
    .where(eq(savedScholarships.userId, userId))
    .orderBy(desc(savedScholarships.savedAt));
}

export async function saveScholarship(userId: number, scholarshipId: number) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(savedScholarships).values({
    userId,
    scholarshipId,
  });
}

export async function removeSavedScholarship(userId: number, scholarshipId: number) {
  const db = await getDb();
  if (!db) return null;

  return db
    .delete(savedScholarships)
    .where(
      and(
        eq(savedScholarships.userId, userId),
        eq(savedScholarships.scholarshipId, scholarshipId)
      )
    );
}

// Email alerts
export async function getEmailAlerts(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(emailAlerts).where(eq(emailAlerts.userId, userId));
}

export async function createEmailAlert(userId: number, alert: any) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(emailAlerts).values({
    userId,
    ...alert,
  });
}

// User interests
export async function getUserInterests(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userInterests).where(eq(userInterests.userId, userId));
}

export async function addUserInterest(userId: number, interest: any) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(userInterests).values({
    userId,
    ...interest,
  });
}

// Recommendations
export async function getRecommendations(userId: number, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(recommendations)
    .where(eq(recommendations.userId, userId))
    .orderBy(desc(recommendations.score))
    .limit(limit);
}

export async function createRecommendation(userId: number, recommendation: any) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(recommendations).values({
    userId,
    ...recommendation,
  });
}
