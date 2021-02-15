import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { Request, Response } from "https://deno.land/x/opine@1.0.2/src/types.ts";
import { sendReturn } from "../../helpers/sendReturn.helper.ts"

import { UserModel } from '../../models/UserModel.ts'
import UserModelInterface from "../../interfaces/UserInterfaces.ts";

import { config } from '../../config/config.ts';

import { UserDB } from '../../db/UserBD.ts';
import * as jwt from '../../helpers/jwt.helper.ts';
import { db } from '../../db/db.ts';




const admin = opine();

const { ADMINKEY } = config;


// ADMINKEY delete card test
admin.post("/admin/deleteCardTest", async function (req, res) {
    if (req.body.admin_key == ADMINKEY)
    {
        const carddb = db.collection("card")
        const deleteCount = await carddb.deleteOne({ cartNumber : req.body.cartNumber, cartEmail : req.body.cartEmail });
        sendReturn(res, 200, {
            error: false,
            message: "Succès"
        })
    }
    else
    {
        sendReturn(res, 400, {
            error: true,
            message: "Non autorisé"
        })
    }
});


// ADMINKEY delete child test (without need to use id)
admin.post("/admin/deleteChildTest", async function (req, res) {
    if (req.body.admin_key == ADMINKEY)
    {
        const userdb = db.collection("user")
        const deleteCount:number = await userdb.deleteOne({ email : req.body.email });
        console.log(deleteCount)
        if (deleteCount == 1)
        {
            let userT: UserModelInterface = await UserModel.getUser(req.body.emailToken)
            userT.removeChild()
            sendReturn(res, 200, {
                error: false,
                message: "Succès"
            })
        }
        else
        {
            sendReturn(res, 400, {
                error: true,
                message: "échec"
            })
        }
    }
    else
    {
        sendReturn(res, 400, {
            error: true,
            message: "Non autorisé"
        })
    }

});

// ADMINKEY delete child test (without need to use id)
admin.post("/admin/getChildID", async function (req, res) {
    if (req.body.admin_key == ADMINKEY)
    {
        const userdb = db.collection("user")
        const result:any = await userdb.findOne({ email : req.body.email });
        let _id = result._id.toString()
        res.status = 200
        res.send({
            error: false,
            message: "Succès",
            id: _id
        })
    }
    else
    {
        sendReturn(res, 400, {
            error: true,
            message: "Non autorisé"
        })
    }
});


// ADMINKEY get card id for tests
admin.post("/admin/getCardID", async function (req, res) {
    if (req.body.admin_key == ADMINKEY)
    {
        const carddb = db.collection("card")
        const result:any = await carddb.findOne({ cartNumber : req.body.cartNumber });
        let id_carte = result.id_carte
        res.status = 200
        res.send({
            error: false,
            message: "Succès",
            id_carte: id_carte
        })
    }
    else
    {
        sendReturn(res, 400, {
            error: true,
            message: "Non autorisé"
        })
    }
});


// ADMINKEY Reset user first subscription
admin.post("/admin/resetSubscription", async function (req, res) {
    if (req.body.admin_key == ADMINKEY)
    {
        const userdb = db.collection("user")
        await userdb.updateOne(
            { email: req.body.email },
            { $set: { firstSubscription: true } }
        );

        sendReturn(res, 200, {
            error: false,
            message: "Succès"
        })
    }
    else
    {
        sendReturn(res, 400, {
            error: true,
            message: "Non autorisé"
        })
    }
});

export { admin }




