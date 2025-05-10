import {
  json,
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("include_video").default("No"),
  courseOutput: json("course_output").notNull(),
  createdBy: varchar("created_by").notNull(),
  userName: varchar("user_name"),
  userProfileImage: varchar("user_profile_image"),
  courseBanner: varchar("course_banner").default("/creative.jpg"),
  publish: boolean("publish").default(false),
});

export const Chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: integer("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId").notNull(),
});
