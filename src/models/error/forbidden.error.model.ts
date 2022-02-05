import { AnyRecord } from "dns";

export default class ForbiddenError extends Error{
    constructor(
        public message: string,
        public error?: any,
    ){
        super(message);
    }
}