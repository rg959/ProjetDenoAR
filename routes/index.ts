import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";
const routes = opine();

// Fuse all routes together

// Others routes
import { other } from './otherRoutes/testRoute.ts';
routes.use('/', other)
// Auth routes
import { login } from './authRoutes/loginRoute.ts';
routes.use('/', login)






export { routes }