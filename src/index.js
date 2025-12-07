const dotenv = require('dotenv')
const app = require ('./app');
const router = require('./routes')
const { connectDB } = require('./database')
const cors = require('cors')
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000
app.use(cors());
app.use("/api", router);

app.use((req, res) => {
    res.status(404).send("Recurso no encontrado")
})

const startServer = async () => {
    try{
        await connectDB();

        const server = app.listen(PORT,'0.0.0.0', () => {
            console.log(`Server listening on port: ${PORT}/Heal-REST/`)
        })

        return server;
    } catch (error) {
        console.error('❌ Error starting server: ', error);
        process.exit(1);
    }
};

if(process.env.NODE_ENV !== 'test'){
    startServer();
}



module.exports = { app, startServer};