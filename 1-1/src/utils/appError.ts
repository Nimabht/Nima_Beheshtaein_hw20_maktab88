class AppError extends Error {
  public name: string;
  public status: string;
  public statusCode: number;
  constructor(message: string, status: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.statusCode = statusCode;
  }

  static badRequest(message: string) {
    return new AppError(message, "fail", 400);
  }

  static notFound(message: string) {
    return new AppError(message, "fail", 404);
  }

  static internal(message: string) {
    return new AppError(message, "error", 500);
  }
}

export default AppError;
