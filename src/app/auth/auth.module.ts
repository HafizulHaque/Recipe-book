import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth/auth.component";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{path: 'auth', component: AuthComponent}])
  ]
})
export class AuthModule {}