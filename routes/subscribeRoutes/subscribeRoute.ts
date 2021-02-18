import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { config } from '../../config/config.ts';

import { UserModel } from '../../models/UserModel.ts'
import UserModelInterface from "../../interfaces/UserInterfaces.ts";
import { BillModel } from '../../models/BillModel.ts'

import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";
import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts";

import { CardModel } from '../../models/CardModel.ts'
import cardModelInterface from "../../interfaces/CardInterface.ts";
import { send } from "https://deno.land/x/opine@1.0.2/src/utils/send.ts";


const { STRIPESKEY, RESETEMAIL, RESETPASSWORD } = config;

const subscribe = opine();




//#region async function to send the mail
async function sendEmail(req: any, res: any, dest: string) {

    const client = new SmtpClient();
    await client.connectTLS({
        hostname: "smtp.gmail.com",
        port: 465,
        username: RESETEMAIL,
        password: RESETPASSWORD,
    });

    await client.send({
        from: RESETEMAIL, // Your Email address
        to: dest, // Email address of the destination
        subject: "ProjetDenoAR Abonnement activé",
        content: "ProjetDenoAR Abonnement activé (1€ par mois)",
    });
    await client.close();

///////////////////////////////////////////////////////
let userT: UserModelInterface = await UserModel.getUser(req.body.emailToken)
    // Get user card by id_carte
    let card: cardModelInterface = await CardModel.getCard(req.body.id_carte.toString())

    console.log("Info carte :")
    console.log(card.cartNumber)
    console.log(card.month)
    console.log(card.year)
    // Begin transaction
    var myHeaders: any = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded: any = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", card.cartNumber);
    urlencoded.append("card[exp_month]", card.month);
    urlencoded.append("card[exp_year]", card.year);
    urlencoded.append("card[cvc]", req.body.cvc);

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const methodes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
    const responseMethodes = await methodes.json()

    //console.log("payments_methods")
    //console.log(responseMethodes)

    if (responseMethodes.error) {

    }
    else {
        var myHeaders: any = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded: any = new URLSearchParams();
        urlencoded.append("payment_method", responseMethodes.id);
        urlencoded.append("email", req.body.emailToken);

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const customer: any = await fetch("https://api.stripe.com/v1/customers", requestOptions)
        const responseCustomer = await customer.json()


        //console.log("customers")
        //console.log(responseCustomer)

        if (responseCustomer.error) {
            
        }
        else {

            var myHeaders: any = new Headers();
            myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


            var urlencoded: any = new URLSearchParams();
            urlencoded.append("items[0][price]", "price_1IKRD0IRCdwqr9uBa77ZZ2MA");
            urlencoded.append("customer", responseCustomer.id);
            urlencoded.append("default_payment_method", responseMethodes.id);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            const responseSubscriptions = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
            const subscriptions = await responseSubscriptions.json()

            //console.log("subscriptions")
            //console.log(subscriptions)

            if (subscriptions.error) {
                
            }
            else {
                // Update subscription time
                await userT.updateSubscriptionDate(43801)

                //Create bill
                let currentTime = new Date();
                let bill = new BillModel(req.body.emailToken, subscriptions.id, currentTime, 1, 1);
                await bill.insert()

                
            }
        }
    }
}
//#endregion



subscribe.put("/subscribe", emptyValueMiddleware, sessionMiddleware, roleMiddleware, syntaxMiddleware, async function (req, res) {
    // Check id and cvc and if id carte exist
    if ((req.body.id_carte < 0 || req.body.id_carte > 9000000000) || (req.body.cvc < 100 || req.body.cvc > 999) || await CardModel.idCarteExist(req.body.id_carte) == false) {
        sendReturn(res, 402, {
            error: false,
            message: "Echec du payement de l'offre"
        })
    }
    else {
        let userT: UserModelInterface = await UserModel.getUser(req.body.emailToken)
        // If it's the first subscription
        if (userT.firstSubscription == true) {

            setTimeout(sendEmail, 300000, req, res, req.body.emailToken);
            userT.useFirstSubscription()
            sendReturn(res, 200, {
                error: false,
                message: "Votre période d'essai viens d'être activé - 5min"
            })
            
        }
        else {
            // Get user card by id_carte
            let card: cardModelInterface = await CardModel.getCard(req.body.id_carte.toString())

            console.log("Info carte :")
            console.log(card.cartNumber)
            console.log(card.month)
            console.log(card.year)
            // Begin transaction
            var myHeaders: any = new Headers();
            myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded: any = new URLSearchParams();
            urlencoded.append("type", "card");
            urlencoded.append("card[number]", card.cartNumber);
            urlencoded.append("card[exp_month]", card.month);
            urlencoded.append("card[exp_year]", card.year);
            urlencoded.append("card[cvc]", req.body.cvc);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            const methodes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
            const responseMethodes = await methodes.json()

            //console.log("payments_methods")
            //console.log(responseMethodes)

            if (responseMethodes.error) {
                sendReturn(res, 402, {
                    error: false,
                    message: "Echec du payement de l'offre"
                })
            }
            else {
                var myHeaders: any = new Headers();
                myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                var urlencoded: any = new URLSearchParams();
                urlencoded.append("payment_method", responseMethodes.id);
                urlencoded.append("email", req.body.emailToken);

                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                };

                const customer: any = await fetch("https://api.stripe.com/v1/customers", requestOptions)
                const responseCustomer = await customer.json()


                //console.log("customers")
                //console.log(responseCustomer)

                if (responseCustomer.error) {
                    sendReturn(res, 402, {
                        error: false,
                        message: "Echec du payement de l'offre"
                    })
                }
                else {

                    var myHeaders: any = new Headers();
                    myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


                    var urlencoded: any = new URLSearchParams();
                    urlencoded.append("items[0][price]", "price_1IKRD0IRCdwqr9uBa77ZZ2MA");
                    urlencoded.append("customer", responseCustomer.id);
                    urlencoded.append("default_payment_method", responseMethodes.id);

                    var requestOptions: any = {
                        method: 'POST',
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: 'follow'
                    };

                    const responseSubscriptions = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
                    const subscriptions = await responseSubscriptions.json()

                    //console.log("subscriptions")
                    //console.log(subscriptions)

                    if (subscriptions.error) {
                        sendReturn(res, 402, {
                            error: false,
                            message: "Echec du payement de l'offre"
                        })
                    }
                    else {
                        // Update subscription time
                        await userT.updateSubscriptionDate(43801)

                        //Create bill
                        let currentTime = new Date();
                        let bill = new BillModel(req.body.emailToken, subscriptions.id, currentTime, 1, 1);
                        await bill.insert()

                        sendReturn(res, 200, {
                            error: false,
                            message: "Votre abonnement a bien été mise à jour"
                        })
                    }
                }
            }
        }
    }
});

export { subscribe }
