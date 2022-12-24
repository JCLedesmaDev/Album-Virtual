import externalDb from "./dal"
import ApplicationError from "../../utils/ApplicationError"

const loginUser = async (payload: any) => {
    try {

    } catch (error) {
        throw new ApplicationError("lala", error)
    }
}


export default {
    loginUser
}