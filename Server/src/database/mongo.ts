import { CallbackWithoutResult, connect, ConnectOptions, set } from "mongoose"


const DB_URI: string = process.env.DB_URL as string
const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions


set('strictQuery', false)
const dbConnect = async (): Promise<void> => {
    connect(DB_URI, options, ({ err, res }: any) => {
        if (!err) {
            console.log("CONEXION CORRECTA")
        } else {
            console.log("ERROR DE CONEXION", err)
        }
    })
}

export default dbConnect
