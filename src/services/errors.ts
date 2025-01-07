class BaseError {
  constructor(params: {
    readonly status?: number,
    readonly message?: string,
  }) { }
}


export class BadRequestError extends BaseError {
  constructor({
    status = 400,
    message = ''
  } = {}) { super({ status, message }) }
}

export class UnauthorizatedError extends BaseError {
  constructor({
    status = 401,
    message = ''
  } = {}) { super({ status, message }) }
}

export class NotFoundError extends BaseError {
  constructor({
    status = 404,
    message = ''
  } = {}) { super({ status, message }) }
}

