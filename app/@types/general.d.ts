export interface ErrorResponse{
    message: string;
}

export interface ErrorValidationResponse extends ErrorResponse{
    notifMessage: string;
    path: string;
}