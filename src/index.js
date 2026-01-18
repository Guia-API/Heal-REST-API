const dotenv = require('dotenv')
const app = require ('./app');
const router = require('./routes')
const api_rate_limiter = require ('./middlewares/rate_limit');
const { connectDB } = require('./database')
const cors = require('cors')
const errorMiddleware = require('./middlewares/error_handler.middleware')
const loggerMiddleware = require('./middlewares/logger.middleware')

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000
app.use(cors());
app.use(loggerMiddleware);
app.use("/api", api_rate_limiter, router);

app.use((req, res) => {
    res.status(404).send("Recurso no encontrado")
})

app.use(errorMiddleware);

const startServer = async () => {
    try{
        await connectDB();

        const server = app.listen(PORT,'0.0.0.0', () => {
            console.log(`🚀 Server running on http://localhost:${PORT}/api`);
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