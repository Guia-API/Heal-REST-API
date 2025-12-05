const dotenv = require('dotenv')
const app = require ('./app');
const cors = require('cors')
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000

app.use(cors());

app.use((req, res) => {
    res.status(404).send("Recurso no encontrado")
})


const server = app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server listening on port: ${PORT}/Heal-REST/`)
})

module.exports = server;