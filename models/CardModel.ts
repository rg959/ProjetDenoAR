import { CardDB } from '../db/CardDB.ts';


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


}
