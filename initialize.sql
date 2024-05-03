CREATE TABLE IF NOT EXISTS Symptoms (id NUMERIC PRIMARY KEY, name TEXT, categoryId NUMERIC REFERENCES SymptomCategory(id),
    email TEXT REFERENCES Users(email));

CREATE TABLE IF NOT EXISTS TrackedSymptoms (
      id NUMERIC,
      date timestamp,
      symptomId NUMERIC,
      severity NUMERIC,
      note TEXT,
      email TEXT,
      PRIMARY KEY(id, date),
      FOREIGN KEY(symptomId) REFERENCES Symptoms(id),
      FOREIGN KEY(email) REFERENCES Users(email));

CREATE TABLE IF NOT EXISTS SymptomCategory (id NUMERIC PRIMARY KEY, color TEXT, name TEXT, email TEXT REFERENCES Users(email));

CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT);