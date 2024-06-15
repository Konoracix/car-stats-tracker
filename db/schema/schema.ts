import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const fuelTypeEnum = pgEnum('fuel_type', [
  'petrol',
  'diesel',
  'electric',
  'hybrid',
  'petrol + lpg',
]);

export const tableNames = {
  users: 'users',
  cars: 'cars',
  mileages: 'mileages',
  fuelings: 'fuelings',
  repairs: 'repairs',
  maintanances: 'maintanances',
};

const defaults = {
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').default(null),
  deleted_at: timestamp('deleted_at').default(null),
};

export const users = pgTable(tableNames.users, {
  id: uuid('id').primaryKey().defaultRandom(),
  mail: varchar('mail', { length: 320 }).unique(),
  password: varchar('password', { length: 256 }).notNull(),
  username: varchar('username', { length: 256 }).notNull(),
  ...defaults,
});

export const cars = pgTable(tableNames.cars, {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id),
  brand: varchar('brand', { length: 256 }).notNull(),
  model: varchar('model', { length: 256 }).notNull(),
  production_date: integer('production_date').notNull(),
  fuel_type: fuelTypeEnum('fuel_type').notNull(),
  ...defaults,
});

export const mileages = pgTable(tableNames.mileages, {
  id: uuid('id').primaryKey().defaultRandom(),
  car_id: uuid('car_id').references(() => cars.id),
  mileage: integer('mileage').notNull(), // kilometers
  ...defaults,
});

export const fuelings = pgTable(tableNames.fuelings, {
  id: uuid('id').primaryKey().defaultRandom(),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(),
  volume: numeric('volume', { precision: 6, scale: 2 }).notNull(),
  mileage_id: uuid('mileage_id').references(() => mileages.id),
  car_id: uuid('car_id').references(() => cars.id),
  ...defaults,
});

export const repairs = pgTable(tableNames.repairs, {
  id: uuid('id').primaryKey().defaultRandom(),
  item: varchar('item', { length: 256 }).notNull(),
  description: varchar('description', { length: 512 }),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(),
  mileage_id: uuid('mileage_id').references(() => mileages.id),
  car_id: uuid('car_id').references(() => cars.id),
  ...defaults,
});

export const maintanances = pgTable(tableNames.maintanances, {
  id: uuid('id').primaryKey().defaultRandom(),
  item: varchar('item', { length: 256 }).notNull(),
  price: numeric('price', { precision: 15, scale: 2 }).notNull(),
  number_of_days: integer('number_of_days'),
  number_of_kilometers: integer('number_of_kilometers'),
  car_id: uuid('car_id').references(() => cars.id),
  ...defaults,
});

// type tableName = 'dsada' | 'asodkaosijd';
// const dsa: tableName = 'asodkaosijasdasd';
