import { BillDB } from '../db/BillBD.ts';


export class BillModel extends BillDB {
    id?: string
    buyer: string
    id_Stripe: string
    date_payment: Date
    montant_ht: number
    montant_ttc: number
    source: string
    createdAt: Date
    updateAt: Date

    constructor(buyer: string, id_Stripe: string, date_payment: Date, montant_ht: number, montant_ttc: number, optionnalData?: any) {
        super();
        this.buyer = buyer
        this.id_Stripe = id_Stripe;
        this.date_payment = new Date(date_payment);;
        this.montant_ht = montant_ht
        this.montant_ttc = montant_ttc;



        // Optionnal parameters (not required for an user insert)
        if (optionnalData) {
            this.id = optionnalData.id != undefined ? optionnalData.id : undefined
            this.source = optionnalData.source != undefined ? optionnalData.source : "Stripe"
            this.createdAt = optionnalData.createdAt != undefined ? optionnalData.createdAt : new Date(Date.now())
            this.updateAt = optionnalData.updateAt != undefined ? optionnalData.updateAt : new Date(Date.now())
        }
        else {
            this.id = undefined
            this.source = "Stripe";
            this.createdAt = new Date(Date.now())
            this.updateAt = new Date(Date.now())
        }
    }

        // Insert current bill
        async insert() {
            await this.billdb.insertOne({
                buyer: this.buyer,
                id_Stripe: this.id_Stripe,
                date_payment: this.date_payment,
                montant_ht: this.montant_ht,
                montant_ttc: this.montant_ttc,
                source: this.source,
                createdAt: this.createdAt,
                updateAt: this.updateAt
            });


        }


}
