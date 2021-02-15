import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
import { sendReturn } from "../helpers/sendReturn.helper.ts"
const routes = opine();

// Fuse all routes together

// Auth routes
import { login } from './authRoutes/loginRoute.ts';
routes.use('/', login)
import { logout } from './authRoutes/logoutRoute.ts';
routes.use('/', logout)
import { register } from './authRoutes/registerRoute.ts';
routes.use('/', register)

// Bill routes
import { listBill } from './billRoutes/listBillRoute.ts';
routes.use('/', listBill)

// Child related routes
import { addChild } from './childRoutes/addChildRoute.ts';
routes.use('/', addChild)
import { deleteChild } from './childRoutes/deleteChildRoute.ts';
routes.use('/', deleteChild)
import { listChild } from './childRoutes/listChildRoute.ts';
routes.use('/', listChild)

// Others routes
import { other } from './otherRoutes/testRoute.ts';
routes.use('/', other)

// Songs routes
import { getSong } from './songRoutes/getSongRoute.ts';
routes.use('/', getSong)
import { listSong } from './songRoutes/listSongRoute.ts';
routes.use('/', listSong)

// Subscribe routes
import { addCart } from './subscribeRoutes/addCartRoute.ts';
routes.use('/', addCart)
import { subscribe } from './subscribeRoutes/subscribeRoute.ts';
routes.use('/', subscribe)

// User routes
import { deleteUser } from './userRoutes/deleteUserRoute.ts';
routes.use('/', deleteUser)
import { editUser } from './userRoutes/editUserRoute.ts';
routes.use('/', editUser)

// Admin test route
import { admin } from './adminRoutes/adminRoute.ts';
routes.use('/', admin)

export { routes }