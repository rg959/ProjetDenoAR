import type { roleTypes } from '../types/rolesTypes.ts';
import { sexeTypes } from '../types/sexeTypes.ts'
import { subscribeTypes } from '../types/subscribeTypes.ts'


export default interface UserInterfaces {

    _id: { $oid: string } | null | string;

    role: roleTypes;
    email: string
    lastname: string
    firstname: string
    password: string
    date_naissance: Date
    sexe: sexeTypes
    subStatus: subscribeTypes
    token: string
    nbTry: number
    cooldownDate: Date

    getAge(): Number;

}