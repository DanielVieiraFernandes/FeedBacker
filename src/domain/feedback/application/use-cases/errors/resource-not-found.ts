import { ErrorMessage } from "@/core/error/error-message";

export class ResourceNotFoundError extends Error implements ErrorMessage {
    constructor(){
        super('Resource not found');
    }
}