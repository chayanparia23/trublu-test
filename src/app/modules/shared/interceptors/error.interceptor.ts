import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { getReasonPhrase } from 'http-status-codes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error) {
                    switch (error.status) {
                        case HttpStatusCode.BadRequest:
                            if (error.error.errors) {
                                const modalStateErrors = [];
                                for (const key in error.error.errors) {
                                    if (error.error.errors[key]) {
                                        modalStateErrors.push(error.error.errors[key]);
                                    }
                                }
                                throw modalStateErrors.flat();
                            }
                            else if (error.error.message) {
                                this.toastr.error(error.error.message, getReasonPhrase(error.status));
                            }
                            else {
                                this.toastr.error(error.error, getReasonPhrase(error.status));
                            }
                            break;

                        case HttpStatusCode.Unauthorized:
                            this.toastr.error(getReasonPhrase(error.status), error.status);
                            break;

                        case HttpStatusCode.NotFound:
                            this.toastr.error("Not Found", error.status);
                            break;

                        case HttpStatusCode.InternalServerError:
                            this.toastr.error("Internal Server Error", error.status);
                            break;
                        default:
                            this.toastr.error("Something Went Wrong", error.status);
                            console.log(error);
                            break;
                    }
                }

                return throwError(() => new Error(error.message));
            })
        );
    }
}
