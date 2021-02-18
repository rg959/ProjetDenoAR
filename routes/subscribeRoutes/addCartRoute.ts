import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { config } from '../../config/config.ts';

import { CardModel } from '../../models/CardModel.ts'
import cardModelInterface from "../../interfaces/CardInterface.ts";

import { emptyValueMiddleware } from "../../middlewares/emptyValueMiddleware.ts";
import { syntaxMiddleware } from "../../middlewares/syntaxMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";
import { invalidCardMiddleware } from "../../middlewares/invalidCardMiddleware.ts";
import { cardExistMiddleware } from "../../middlewares/cardExistMiddleware.ts";
import { cardAlreadyExistMiddleware } from "../../middlewares/cardAlreadyExistMiddleware.ts";

const addCart = opine();

const { STRIPESKEY } = config;

addCart.put("/user/cart", sessionMiddleware, cardExistMiddleware, cardAlreadyExistMiddleware, invalidCardMiddleware, roleMiddleware, syntaxMiddleware, async function (req, res) {
    var myHeaders: any = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(STRIPESKEY));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded: any = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", req.body.cartNumber);
    urlencoded.append("card[exp_month]", req.body.month);
    urlencoded.append("card[exp_year]", req.body.year);

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

    // Carte n'existe pas
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
    // Succès
    else
    {
        // Add card to the BDD
        let card = new CardModel((Math.floor(Math.random() * Math.floor(9000000000))).toString(), req.body.emailToken, req.body.cartNumber, req.body.month, req.body.year, req.body.default)
        card.insert()
        sendReturn(res, 200, {
            error: false,
            message: "Vos données ont été mises à jour"
        })
    }
});

export { addCart }