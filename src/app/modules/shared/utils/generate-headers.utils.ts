import { HttpHeaders } from "@angular/common/http";
export const generateHeaders = (contentType = 'application/json'): HttpHeaders => {
    return new HttpHeaders({
        'Content-Type': contentType
    });
};

