import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

import { sendReturn } from "../../helpers/sendReturn.helper.ts"
import { sessionMiddleware } from "../../middlewares/sessionMiddleware.ts"
import { UserModel } from '../../models/UserModel.ts'

const addChild = opine();

addChild.post("/user/child" , sessionMiddleware ,async function (req, res) {

    console.log("entrée ")
    console.log(req.body)
    let userT: any = await UserModel.getUser(req.body.email)
    console.log("utilisateur récupéré")
    if (userT.nbChild < 3) {
        userT.addChild()
        console.log("succès 1")
        // Add child
        let date_naissance = new Date(req.body.date_naissance)
        let userM = new UserModel('Enfant', req.body.email, req.body.password, req.body.lastname, req.body.firstname, date_naissance, req.body.sexe);

        userM.insert();
        console.log("Insert 1")
        let user = {
            firstname: userM.firstname,
            lastname: userM.lastname,
            sexe: userM.sexe,
            role: userM.role,
            dateNaissance: userM.date_naissance,
            createdAt: userM.createdAt,
            updateAt: userM.updateAt,
            subscription: userM.subscription
        }
        res.send({
            error: false,
            message: "Votre enfant a bien été créé avec succès",
            user: user
        })
    }
    else
    {
        sendReturn(res, 409, {
            error: true,
            message: "Vous avez dépassé le cota de trois enfants"
        })
    }

});

export { addChild }

