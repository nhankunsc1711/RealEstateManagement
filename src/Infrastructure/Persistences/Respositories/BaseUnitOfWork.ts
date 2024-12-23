import mongoose, { ClientSession } from "mongoose";
require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const DBName = process.env.DATABASE_NAME
export class BaseUnitOfWork {
    private session: ClientSession | null = null;
    constructor() {
        this.connect();
    }

    async connect() {
        try {
          await mongoose.connect(`${URI}`, {dbName: DBName});
        } catch (error: any) {
          console.error("Error connecting to MongoDB:", error);
        }
    }
    async startTransaction(): Promise<ClientSession> {
        try {
          this.session = await mongoose.startSession();
          this.session.startTransaction();
          return this.session;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    async commitTransaction(): Promise<void> {
      try {
          await this.session?.commitTransaction();
          this.session?.endSession();
          console.log("Commit change to database successfully!");
      } catch (error: any) {
          throw new Error(error.message);
      }
    }
    async abortTransaction(): Promise<void> {
      try {
          await this.session?.abortTransaction();
          this.session?.endSession();
          console.log("Abort change to database!");
      } catch (error: any) {
          throw new Error(error.message);
      }
    }
 }
