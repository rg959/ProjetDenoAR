import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { config } from '../config/config.ts';
import { sendReturn } from "../helpers/sendReturn.helper.ts"

import { CardModel } from '../models/CardModel.ts'


const cardAlreadyExistMiddleware = opine();

cardAlreadyExistMiddleware.use(async function (req, res, next) {
    if (await CardModel.numberDontExist(req.body.cartNumber, req.body.emailToken))
        next();
    else 
        sendReturn(res, 409, {
            error: true,
            message: "La carte existe déjà"
        });
});

export { cardAlreadyExistMiddleware }