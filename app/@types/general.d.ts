
/**
 * Response standar dari semua response http
 */
export interface BasicResponse{
    success: boolean;
}

export interface ErrorResponse{
    message: string;
}

export interface ErrorValidationResponse extends ErrorResponse{
    notifMessage: string;
    path: string;
}