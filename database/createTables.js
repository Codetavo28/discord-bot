const db = require('./index');

const createUsersTables = async () => {
  try {
    const statementCreateUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    )
    `;

    const createUsersTable = db.prepare(statementCreateUsersTable);
    createUsersTable.run();

  } catch (error){
    console.log(error);
    throw new Error('Diablo');

  }
};

const createNotesTables = async () => {
  try {
    const statementCreateNotesTable = `
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        decription TEXT,
        user_id TEXT,
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
           ON DELETE CASCADE
          )
    `;

    const createNotesTable = db.prepare(statementCreateNotesTable);
    createNotesTable.run();

  } catch (error){
    console.log(error);
    throw new Error('Diablo');

  }
};

const createTables = async () => {
  try{
    console.log('Creando tablas...');
    await createUsersTables();
    await createNotesTables();
    console.log('Tabla de usuarios creada');
  } catch (error) {
    console.log('Se acabo');

  }
};

createTables();