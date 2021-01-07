import { UserDB } from '../db/UserBD.ts';
import { db } from '../db/db.ts';
// Import roles
import { roleTypes } from '../types/rolesTypes.ts'
import { sexeTypes } from '../types/sexeTypes.ts'
import { subscribeTypes } from '../types/subscribeTypes.ts'

// Import helpers
import { hash } from '../helpers/password.helper.ts'
import * as jwt from '../helpers/jwt.helper.ts'

export class UserModel extends UserDB {
    
    email: string
    lastname: string
    firstname: string
    password: string
    date_naissance: Date
    sexe: sexeTypes

    role?: roleTypes;
    createdAt?: Date
    updateAt?: Date
    subStatus?: subscribeTypes
    token?: string
    nbTry?: number
    cooldownDate?: Date

    // optionnalData = role: roleTypes, password: string, lastname: string, firstname: string, date_naissance: string, sexe: sexeTypes

    constructor(email: string, password: string, lastname: string, firstname: string, date_naissance: Date, sexe: sexeTypes, optionnalData?: any) {
        super();
        // Required parameters (for insertions)
        this.email = email;
        this.lastname = lastname
        this.firstname = firstname;
        this.password = password;
        this.date_naissance = date_naissance;
        this.sexe = sexe;

        // Optionnal parameters (not required for an user insert)
        if (optionnalData)
        {
            this.role = optionnalData.role != undefined  ? optionnalData.role : "Tuteur";
            this.updateAt = optionnalData.updateAt != undefined ? optionnalData.updateAt : new Date(Date.now())
            this.subStatus = optionnalData.subStatus != undefined ? optionnalData.subStatus : "default"
            this.token = optionnalData.token != undefined ? optionnalData.token : ""
            this.nbTry = optionnalData.nbTry != undefined ? optionnalData.nbTry : 0
            this.cooldownDate = optionnalData.cooldownDate != undefined ? optionnalData.cooldownDate :  new Date(Date.parse('01 Jan 1970 00:00:00'))
        }
        
    }

    // Get user and create a userModel object directly
    static async getUser(email: string) {
        const userdb = db.collection("user")
        //const test = new UserModel()
        const result:any = await userdb.findOne({ email: email });
            // Check if this email is already used
            if (result != undefined) {
                const optionnalData = {
                    role: result.role,
                    updateAt: result.updateAt,
                    subStatus: result.subStatus,
                    token: result.token,
                    nbTry: result.nbTry,
                    cooldownDate: result.cooldownDate,
                }
                return new UserModel(result.email, result.password, result.lastname, result.firstname, result.date_naissance, result.sexe, optionnalData)
            }
            else
                throw new Error('User doesnt exist');
    }

    async updateUserToken() {
            let token = await jwt.getAuthToken(this.email)
            this.token = token
            await this.userdb.updateOne(
                { email: this.email },
                { $set: { token: this.token } }
            );
            return true
    }

    getRole() {
        return this.role;
    }
    setRole(role: roleTypes) {
        this.role = role;
    }
    getAge() {
        var ageDifMs = Date.now() - this.date_naissance.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    fullName() {
        return `${this.lastname} ${this.firstname}`;
    }

    public async checkEmail(email: string) {
        // Test if it's a valid email
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(email.toLowerCase().trim())) {
            return {error: false, message: "incorrect email"}
        }
        else {
            const result = await this.userdb.findOne({ email: email });
            // Check if this email is already used
            if (result == undefined) {
                return true
            }
            else {
                return {error: false, message: "already used email"}
            }
        }
    }

    // Insert current user
    async insert() {
        // Hash password
        const hPass = await hash(this.password)
        console.log(hPass)
        await this.userdb.insertOne({
            email: this.email,
            password: hPass,
            lastname: this.lastname,
            firstname: this.firstname,
            date_naissance: this.date_naissance,
            sexe: this.sexe,

            role: "Tuteur",
            subStatus:  "default",
            createdAt: new Date(Date.now()),
            updateAt: new Date(Date.now()),
            token: "",
            nbTry: 0,
            cooldownDate: new Date(Date.parse('01 Jan 1970 00:00:00'))
        });
    }
    update() {
        throw new Error('Method not implemented.');
    }
    delete() {
        throw new Error('Method not implemented.');
    }
}
