type ResultStatus =
  | "success"
  | "noContent"
  | "error"
  | "invalid"
  | "notFound"
  | "serverError"
  | "unauthorized"
  | "noResponse"
  | "forbidden"
  | "conflict";

export interface ResultData<T> {
  status?: ResultStatus;
  data?: T;
  errors?: string[];
  validationErrors?: { [key: string]: string[] };
}

export default class Result<T> {
  public result: ResultData<T>;

  constructor(
    status: ResultStatus,
    data?: T,
    errors?: string[],
    validationErrors?: { [key: string]: string[] }
  ) {
    this.result = {
      status: status,
      data: data,
      errors: errors,
      validationErrors: validationErrors,
    };
  }

  static success<T>(data: T): Result<T> {
    return new Result<T>("success", data); // 200
  }

  static noContent<T>(data?: T): Result<T> {
    return new Result<T>("noContent", data); // 204
  }

  static error(errors: string[]): Result<undefined> {
    return new Result<undefined>("error", undefined, errors); // 500
  }

  static invalid(
    validationErrors: { [key: string]: string[] } | undefined,
    errors?: string[]
  ): Result<undefined> {
    return new Result<undefined>(
      "invalid",
      undefined,
      errors,
      validationErrors
    ); // 400
  }

  static notFound(errors: string[]): Result<undefined> {
    return new Result<undefined>("notFound", undefined, errors); // 404
  }

  static internalServerError(errors: string[]): Result<undefined> {
    return new Result<undefined>("serverError", undefined, errors); // 500
  }

  static unauthorized(errors: string[]): Result<undefined> {
    return new Result<undefined>("unauthorized", undefined, errors); // 401
  }

  static noResponse(errors: string[]): Result<undefined> {
    return new Result<undefined>("noResponse", undefined, errors); // request error
  }

  static forbidden(errors: string[]): Result<undefined> {
    return new Result<undefined>("forbidden", undefined, errors); // 403
  }

  static conflict(errors: string[]): Result<undefined> {
    return new Result<undefined>("conflict", undefined, errors); // 409
  }

  // Optional: Add a method to get the result object
  getResult(): ResultData<T> {
    return this.result;
  }
}
