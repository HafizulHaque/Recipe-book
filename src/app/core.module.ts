import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ApiDataceptor } from "./shared/api-data-interceptor.service";

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiDataceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class CoreModule {}