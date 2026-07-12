import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  details: text('details'),
  location: varchar('location', { length: 255 }).notNull(),
  date: varchar('date', { length: 255 }).notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const volunteers = pgTable('volunteers', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contactInquiries = pgTable('contact_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
