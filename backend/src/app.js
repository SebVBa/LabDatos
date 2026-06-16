import express from "express";
import dotenv from "dotenv";

dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;

const app = express();

app.get("/", (req, res) =>{
res.send (`<h1>${NAME}</h1> <p>Version ${VERSION}</p> <p>Descripcion ${DESCRIPTION}</p> <p>En el puerto ${PORT}</p>`);
});

app.listen(4000, () =>{
 console.log(`${NAME} ejecutandose en el puerto http://localhost:${PORT}`)
});