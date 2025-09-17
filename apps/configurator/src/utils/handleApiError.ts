import Result from "./result";

export interface ApiError {
  response?: {
    status: number;
    data?: {
      statusCode?: number;
      message?: string;
      errors?: { [key: string]: string[] };
    };
  };
  request?: unknown;
  message?: string;
}

// Type guard to check if data has a message property
function hasMessage(data: unknown): data is { message: string } {
  return typeof data === "object" && data !== null && "message" in data;
}

export default function handleApiError(e: ApiError): Result<undefined> {
  if (e.response) {
    const validationErrors = e.response.data?.errors;
    switch (e.response.status) {
      case 401:
        // Unauthorized
        return Result.unauthorized([
          hasMessage(e.response.data)
            ? e.response.data.message
            : "You are unauthorized!",
        ]);
      case 403:
        // Forbidden
        return Result.forbidden([
          "You don’t have permission to access this service.",
        ]);
      case 204:
        return Result.noContent(); // No content should not have an array
      case 400:
        // Bad request
        if (validationErrors !== undefined && validationErrors !== null) {
          return Result.invalid(validationErrors, [
            e?.response?.data?.message ?? "Invalid Request.",
          ]);
        } else {
          return Result.invalid({}, [
            e?.response?.data?.message ?? "Invalid Request.",
          ]); // Handle other types appropriately
        }
      case 404:
        return Result.notFound([
          hasMessage(e.response.data)
            ? e.response.data.message
            : "Page not found!",
        ]);
      case 500:
        // Internal Server Error
        return Result.internalServerError([
          hasMessage(e.response.data)
            ? e.response.data.message
            : "Internal Server Error.",
        ]);
      default:
        return Result.error([
          e.response.data?.message || "An unknown error occurred.",
        ]);
    }
  } else if (e.request) {
    return Result.noResponse(["Unable to connect to the server"]);
  } else {
    return Result.error([
      "Unable to make a request, please check your connection.",
    ]);
  }
}
