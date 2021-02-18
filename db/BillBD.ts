import { db } from './db.ts';
export class BillDB {
    billdb = db.collection("bill")
    constructor() {
        this.billdb = this.billdb
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