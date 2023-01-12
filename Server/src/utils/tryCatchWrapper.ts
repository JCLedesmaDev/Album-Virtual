const tryCatchWrapper = (callback: any) => {
    return async (payload: any) => {
        try {
            return await callback(payload)
        } catch (error: any) {
            return { error }
        }
    }
}

export { tryCatchWrapper }