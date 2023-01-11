interface ISource {
  message: string;
  stack: string;
}
export class ApplicationError extends Error {
  status: number;
  source!: ISource; // El signo ! indica que puede ser undefined

  constructor(message: string, source: any = undefined) {
    console.log("🚀 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") 
    console.log("🚀 ~ file: applicationError.ts:10 ~ ApplicationError ~ constructor ~ message", message)
    console.log("🚀 ~ file: applicationError.ts:10 ~ source", source)
    console.log("🚀 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") 
    console.log(" ") 
    super(message)

    // Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.message = message || ''
    this.status = 500
    if (source) {
      this.source = {
        message: source.message ?? source,
        stack: source.stack ?? 'No tiene stack porque no es un objecto error',
      }
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
