import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { roleMiddleware } from "../../middlewares/roleMiddleware.ts";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts";

import { db } from '../../db/db.ts';

const billdb = db.collection("bill")

const listBill = opine();

listBill.get("/bills", sessionMiddleware, roleMiddleware, async function (req, res) {

    const result:Array<any> = await billdb.find({ buyer: req.body.emailToken }).toArray();

    for (let i = 0; i < result.length; i++) {
        result[i].id = result[i]._id.toString()
        delete result[i]['_id'];
        delete result[i]['buyer'];
    }
    
    //console.log(result)
    res.status = 200
    res.send({
        error: false,
        bill: result
    })
    


});

export { listBill }