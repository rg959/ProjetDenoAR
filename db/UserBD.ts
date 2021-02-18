import { db } from './db.ts';
import UserInterfaces from "../interfaces/UserInterfaces.ts"

export class UserDB {
    userdb = db.collection < UserInterfaces > ("user")
    constructor() {
        this.userdb = this.userdb
    }
    insert() {
        throw new Error('Method not implemented.');
    }
    update() {
        throw new Error('Method not implemented.');
    }
    delete() {
        throw new Error('Method not implemented.');
    }
}