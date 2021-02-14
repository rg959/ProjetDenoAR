import { db } from '../db/db.ts';
import { CardDB } from '../db/CardDB.ts';
import { request } from "https://deno.land/x/opine@1.0.2/src/request.ts";


export class CardModel extends CardDB {
    id_carte: string
    cartEmail: string
    cartNumber: string
    month: string
    year: number
    isDefault: Boolean


    constructor(id_carte: string, cartEmail: string, cartNumber: string, month: string, year: number, isDefault: Boolean) {
        super();
        this.id_carte = id_carte
        this.cartEmail = cartEmail
        this.cartNumber = cartNumber;
        this.month = month
        this.year = year
        this.isDefault = isDefault;
    }

    // Insert current bill
    async insert() {
        await this.carddb.insertOne({
            id_carte: this.id_carte,
            cartEmail: this.cartEmail,
            cartNumber: this.cartNumber,
            month: this.month,
            year: this.year,
            isDefault: this.isDefault,
        });
    }

    // Get card and create a cardModel object directly
    static async numberDontExist(cartNumber: string, email: string) {
        const carddb = db.collection("card")
        //const test = new UserModel()
        const result: any = await carddb.findOne({ cartNumber: cartNumber, cartEmail: email });
        // Check if this email is already used
        if (result != undefined) 
            return false
        else
            return true
    }

    // Get card and create a cardModel object directly
    static async idCarteExist(id_carte: string) {
        const carddb = db.collection("card")
        //const test = new UserModel()
        const result: any = await carddb.findOne({ id_carte: id_carte });
        // Check if this email is already used
        if (result != undefined) 
            return true
        else
            return false
    }

    // Get card and create a cardModel object directly
    static async getCard(id_carte: string) {
        const carddb = db.collection("card")
        //const test = new UserModel()
        const result: any = await carddb.findOne({ id_carte: id_carte });
        // Check if this email is already used
        if (result != undefined) {
            return new CardModel(result.id_carte, result.cartEmail, result.cartNumber, result.month, result.year, result.isDefault)
        }
        else
            throw new Error('Card doesnt exist');
    }


}
