class ApplicationError extends Error {
  constructor(message, source = undefined) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.message = message || 'Algo salio mal'
    this.status = 200
    if (source)
      this.source = {
        message: source.message ?? source,
        stack: source.stack ?? 'No tiene stack porque no es un objecto error',
      }
  }
}

const ApplicationError = (message, source = undefined) => {

}

export default ApplicationError