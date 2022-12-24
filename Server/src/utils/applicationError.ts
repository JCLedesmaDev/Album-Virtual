interface ISource {
  message: string;
  stack: string;
}

export class ApplicationError extends Error {
  status: number;
  source!: ISource; // El signo ! indica que puede ser undefined

  // constructor(message: string, source: ISource = {} as ISource) {
  constructor(message: string, source: any = undefined) {
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
