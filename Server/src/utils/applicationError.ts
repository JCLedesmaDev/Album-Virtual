interface ISource {
  message: string;
  stack: string;
}
export class ApplicationError extends Error {
  name: string;
  status: number;
  message: string;
  source!: ISource; // El signo ! indica que puede ser undefined

  constructor(message: string, source: any = undefined) {
    super(message)

    
    this.name = this.constructor.name
    this.message = message || ''
    this.status = 500
    if (source) {
      this.source = {
        message: source.message ?? source,
        stack: source.stack ?? 'No tiene stack porque no es un objecto error',
      }
    }
    Error.captureStackTrace(this, this.constructor)
    // Object.setPrototypeOf(this, new.target.prototype);
  }
}
