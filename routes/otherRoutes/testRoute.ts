import { opine } from "https://deno.land/x/opine@1.0.2/mod.ts";

const other = opine();

other.get("/test", function (req, res) {
    res.send({ message: "Bonjour ProjetDenoAR"});
});

export { other }