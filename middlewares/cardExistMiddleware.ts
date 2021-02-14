import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { config } from '../config/config.ts';
import { sendReturn } from "../helpers/sendReturn.helper.ts"

const { STRIPESKEY } = config;

const cardExistMiddleware = opine();

cardExistMiddleware.use(async function (req, res, next) {
    // empty/invalid sended data case
    var myHeaders : any = new Headers();
    myHeaders.append("Authorization", "Basic "+ btoa(STRIPESKEY));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded : any = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", req.body.cartNumber);
    urlencoded.append("card[exp_month]", req.body.month);
    urlencoded.append("card[exp_year]", req.body.year);
    //urlencoded.append("card[cvc]", req.body.default);

    var requestOptions : any = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    const methodes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
    const responseMethodes = await methodes.json()

    console.log("card exist middleware")
    //console.log("response cart Stripe")
    //console.log(responseMethodes)

    // Invalid credit card error
    if (responseMethodes.error)
    {
        if (responseMethodes.error.type == "card_error")
        {
            sendReturn(res, 402, {
                error: true,
                message: "Informations bancaire incorrectes"
            })
        }
    }

    else {
        next();
    }
});

export { cardExistMiddleware }