import { db } from './db.ts';
export class CardDB {
    carddb = db.collection("card")
    constructor() {
        this.carddb = this.carddb
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