import { connect, ConnectOptions } from "mongoose"


const DB_URI: string = process.env.DB_URL as string
const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions

const dbConnect = async (): Promise<void> => {
    try {
        await connect(DB_URI, options)
        console.log("⚡️[server]: Server is running at http://localhost:" + process.env.PORT);
    } catch (error) {
        console.log('Connection error: ' + error)
    }
}

export default dbConnect
