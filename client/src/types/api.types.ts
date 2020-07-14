export type ApiResult = "success" | "failure";
export type ApiError = {
    errorcode: number;
    message: string[];
};
export type ApiResponse<T> = {
    result: ApiResult;
    response: T | ApiError;
};
