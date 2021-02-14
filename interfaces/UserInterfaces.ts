import type { roleTypes } from '../types/rolesTypes.ts';
import { sexeTypes } from '../types/sexeTypes.ts'
import { subscribeTypes } from '../types/subscribeTypes.ts'


export default interface UserModelInterface {
    role: roleTypes;
    email: string
    lastname: string
    firstname: string
    password: string
    date_naissance: Date
    sexe: sexeTypes


    createdAt: Date
    updateAt: Date
    subscription: subscribeTypes
    firstSubscription: Boolean
    subscriptionDate: Date
    token: string
    nbTry: number
    cooldownDate: Date
    nbChild: number
    tuteur: string

    updateUserToken() : void
    getRole() : roleTypes
    setRole(role: roleTypes) : void
    getAge() : number
    addChild() : void
    removeChild() : void
    checkEmail(email: string) : any
    useFirstSubscription() : void
    updateSubscriptionDate(nbMinutes: number) : void
    insert() : void
    update() : void
    delete() : void
}