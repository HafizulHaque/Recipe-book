import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class ApiDataceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('api call intercepted');
    console.log(req);
    return next.handle(req).pipe(tap(e => {
      if(e.type===HttpEventType.Response) console.log('data received');
    }))
  }

}