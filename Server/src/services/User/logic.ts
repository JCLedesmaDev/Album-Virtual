import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"

const loginUser = async (payload: any) => {
    try {
        return externalDb.getUser()
    } catch (error) {
        throw new ApplicationError("lala", error)
    }
}


export default {
    loginUser
}