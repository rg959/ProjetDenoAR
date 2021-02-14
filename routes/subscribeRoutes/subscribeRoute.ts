import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { config } from '../../config/config.ts';

const { STRIPESKEY } = config;

const subscribe = opine();

subscribe.put("/subscribe", async function (req, res) {

    console.log(STRIPESKEY)
    var myHeaders: any = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded: any = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", "4242424242424242");
    urlencoded.append("card[exp_month]", "10");
    urlencoded.append("card[exp_year]", "2030");
    urlencoded.append("card[cvc]", "123");

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const methodes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
    const responseMethodes = await methodes.json()

    console.log("payments_methods")
    console.log(responseMethodes)

    var myHeaders: any = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded: any = new URLSearchParams();
    urlencoded.append("payment_method", responseMethodes.id);
    urlencoded.append("email", "alexis.savoie.555@gmail.com");

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const customer: any = await fetch("https://api.stripe.com/v1/customers", requestOptions)
    const responseCustomer = await customer.json()


    console.log("customers")
    console.log(responseCustomer)

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

    const subcription = await fetch("https://api.stripe.com/v1/subscriptions", requestOptions)
    const sub = await subcription.json()

    console.log("subscriptions")
    console.log(sub)


    sendReturn(res, 200, {
        error: false,
        message: "Votre abonnement a bien été mise à jour"
    })
});

export { subscribe }
