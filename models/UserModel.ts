import { UserDB } from '../db/UserBD.ts';

import { roleTypes } from '../types/rolesTypes.ts'
import { sexeTypes } from '../types/sexeTypes.ts'
import { subscribeTypes } from '../types/subscribeTypes.ts'

export class UserModel extends UserDB {
    _role: roleTypes;
    email: string
    lastname: string
    firstname: string
    password: string
    date_naissance: Date
    sexe : sexeTypes
    subStatus : subscribeTypes

    constructor(email : string, password : string, lastname : string, firstname : string,  date_naissance : string, sexe : sexeTypes) {
        super();
        this._role = "User";
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.password = password;
        this.date_naissance = new Date(date_naissance);
        this.sexe = sexe
        this.subStatus = "default"
    }

    /*
    get _id() {
        return this.id;
    }
    */

    get role() {
        return this._role;
    }
    setRole(role: roleTypes) {
        this._role = role;
    }
    getAge() {
        var ageDifMs = Date.now() - this.date_naissance.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    fullName() {
        return `${this.lastname} ${this.firstname}`;
    }
    async insert() {
        /*
        this.id = await this.userdb.insertOne({
            role: this._role,
            email: this.email,
            password: this.password,
            lastname: this.lastname,
            firstname: this.firstname,
            dateNaiss: this.date_naissance,
            sexe: this.sexe,
            subStatus : this.subStatus
        });
        */
        await this.userdb.insertOne({
        role: this._role,
        email: this.email,
        password: this.password,
        lastname: this.lastname,
        firstname: this.firstname,
        dateNaiss: this.date_naissance,
        sexe: this.sexe,
        subStatus : this.subStatus
    });
    }
    update() {
        throw new Error('Method not implemented.');
    }
    delete() {
        throw new Error('Method not implemented.');
    }
}
