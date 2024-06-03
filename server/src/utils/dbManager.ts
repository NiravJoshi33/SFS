// importing dependencies
import sqlite3 from "sqlite3";
import { logger } from "./logger";

class DBManager {
  private db!: sqlite3.Database;
  private dbFilePath!: string;
  static instance: DBManager;

  constructor(dbFilePath: string) {
    if (!DBManager.instance) {
      this.dbFilePath = dbFilePath;
      this._connect();
      DBManager.instance = this;
    }

    this._createUsersTable();

    this._createRoomsTable();
  }

  private async _connect(): Promise<void> {
    this.db = new sqlite3.Database(this.dbFilePath, (err) => {
      if (err) {
        logger.error(`Error connecting to database: ${err}`);
      } else {
        logger.info("Connected to the database!");
      }
    });
  }

  private async _createUsersTable(): Promise<void> {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT NOT NULL,
        score INTEGER NOT NULL,
        highscore INTEGER NOT NULL,
        grenades INTEGER NOT NULL,
        railguns INTEGER NOT NULL,
        nukes INTEGER NOT NULL,
        coin_balance INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`;

    try {
      this.db.run(sql);
    } catch (err) {
      logger.error(`Error creating users table: ${err}`);
    }
  }

  private async _createRoomsTable(): Promise<void> {
    let sql = `CREATE TABLE IF NOT EXISTS rooms (
        room_id TEXT PRIMARY KEY UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        gamestate TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    try {
      this.db.run(sql);
    } catch (err) {
      logger.error(`Error creating rooms table: ${err}`);
    }
  }

  private async _withConnection(callback: () => void): Promise<void> {
    this._connect();
    try {
      callback();
    } finally {
      this.db.close();
    }
  }

  async insertUser(username: string): Promise<void> {
    let sql = `INSERT INTO users (
        username,
        score,
        highscore,
        grenades,
        railguns,
        nukes)
        VALUES (?, ?, ?, ?, ?, ?)`;

    await this._withConnection(() => {
      try {
        this.db.run(sql, [username, 0, 0, 0, 0, 0]);
        logger.info(`User ${username} inserted successfully!`);
      } catch (err) {
        logger.error(`Error inserting user: ${err}`);
      }
    });
  }

  async getUser(
    username: string,
    callback: (rows: any) => void
  ): Promise<void> {
    let sql = `SELECT * FROM users WHERE username = ?`;

    await this._withConnection(() => {
      this.db.get(sql, [username], (err, row) => {
        if (err) {
          logger.error(`Error getting user: ${err}`);
        } else {
          callback(row);
        }
      });
    });
  }

  async updateUser(
    username: string,
    score: number,
    highscore: number,
    grenades: number,
    railguns: number,
    nukes: number
  ): Promise<void> {
    // formulate the SQL query based on the parameters provided
    let sql = `UPDATE users SET `;
    if (score) sql += `score = ?, `;
    if (highscore) sql += `highscore = ?, `;
    if (grenades) sql += `grenades = ?, `;
    if (railguns) sql += `railguns = ?, `;
    if (nukes) sql += `nukes = ?, `;
    sql = sql.slice(0, -2); // remove trailing comma
    sql += ` WHERE username = ?`;

    // formulate the parameters array based on the parameters provided
    let params = [];
    if (score) params.push(score);
    if (highscore) params.push(highscore);
    if (grenades) params.push(grenades);
    if (railguns) params.push(railguns);
    if (nukes) params.push(nukes);
    params.push(username);

    await this._withConnection(() => {
      try {
        this.db.run(sql, params);
        logger.info(`User ${username} updated successfully!`);
      } catch (err) {
        logger.error(`Error updating user: ${err}`);
      }
    });
  }

  async updateCoinBalance(
    username: string,
    coinBalance: number
  ): Promise<void> {
    let sql = `UPDATE users SET coin_balance = ? WHERE username = ?`;

    await this._withConnection(() => {
      try {
        this.db.run(sql, [coinBalance, username]);
        logger.info(`User ${username} updated successfully!`);
      } catch (err) {
        logger.error(`Error updating user: ${err}`);
      }
    });
  }

  async deleteUser(username: string): Promise<void> {
    let sql = `DELETE FROM users WHERE username = ?`;

    await this._withConnection(() => {
      try {
        this.db.run(sql, [username]);
        logger.info(`User ${username} deleted successfully!`);
      } catch (err) {
        logger.error(`Error deleting user: ${err}`);
      }
    });
  }

  async getAllUsers(callback: (rows: any) => void): Promise<void> {
    let sql = `SELECT * FROM users`;

    await this._withConnection(() => {
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          logger.error(`Error getting users: ${err}`);
        } else {
          callback(rows);
        }
      });
    });
  }

  async inserRoom(
    roomId: string,
    userId: number,
    gameState: string,
    gameStatus: string
  ): Promise<void> {
    let sql = `INSERT INTO rooms (
        room_id,
        user_id,
        gamestate,
        status)
        VALUES (?, ?, ?, ?)`;

    await this._withConnection(() => {
      try {
        this.db.run(sql, [roomId, userId, gameState, gameStatus]);
        logger.info(`Room ${roomId} inserted successfully!`);
      } catch (err) {
        logger.error(`Error inserting room: ${err}`);
      }
    });
  }

  async getRoom(roomId: string, callback: (rows: any) => void): Promise<void> {
    let sql = `SELECT * FROM rooms WHERE room_id = ?`;

    await this._withConnection(() => {
      this.db.get(sql, [roomId], (err, row) => {
        if (err) {
          logger.error(`Error getting room: ${err}`);
        } else {
          callback(row);
        }
      });
    });
  }

  async updateRoom(
    roomId: string,
    gameState: string,
    gameStatus: string
  ): Promise<void> {
    let sql = `UPDATE rooms SET gamestate = ?, status = ? WHERE room_id = ?`;

    await this._withConnection(() => {
      try {
        this.db.run(sql, [gameState, gameStatus, roomId]);
        logger.info(`Room ${roomId} updated successfully!`);
      } catch (err) {
        logger.error(`Error updating room: ${err}`);
      }
    });
  }
}

export const dbManager = new DBManager("../db/test.db");
