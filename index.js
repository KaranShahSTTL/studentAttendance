import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error.js'
import students from './routes/student.js'


const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


app.use(cors("*"))
app.use(express.json())
connectDB(DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/student',students )

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})