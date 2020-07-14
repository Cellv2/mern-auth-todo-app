import { ApiError, ApiResponse } from "../types/api.types";

export const handleResponseErrors = async (request: Response) => {
    const errorResponse = await request.json();
    const errors: ApiResponse<ApiError> = {
        result: "failure",
        response: {
            errorcode: request.status,
            message: Object.values(errorResponse) as string[],
        },
    };

    return errors;
};
