import { create, verify, decode, getNumericDate } from "https://deno.land/x/djwt@v2.0/mod.ts";
import { config } from '../config/config.ts';


const {
    JWT_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXP,
    JWT_REFRESH_TOKEN_EXP,
} = config;


// Since we need to use a token between 50 and 90 characters we remove the alg
const header : any = {
    alg: "none",
    typ: "JWT",
};

const getAuthToken = async (iData: string) => {
    const payload = {
        email: iData
    };

    return await create(header, payload, JWT_TOKEN_SECRET);
};


const getJwtPayload = async(token: string): Promise < any | null > => {
    try {
        const jwtObject = await verify(token, JWT_TOKEN_SECRET, header.alg);
        console.log(jwtObject)
        if (jwtObject) {
            return jwtObject;
        }
    } catch (err) {}
    return null;
};

export { getAuthToken, getJwtPayload };