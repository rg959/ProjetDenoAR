import { BillDB } from '../db/BillBD.ts';


export class BillModel extends BillDB {
    id_Stripe : string
    date_payment : Date
    montant_ht : number
    montant_ttc : number
    source : string

    constructor(id_Stripe:string, date_payment:string, montant_ht:number, montant_ttc:number) {
        super();
        this.id_Stripe = id_Stripe;
        this.date_payment = new Date(date_payment);;
        this.montant_ht = montant_ht
        this.montant_ttc = montant_ttc;
        this.source = "Stripe";
    }
}
