import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from 'src/app/auth/auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent },
    ])
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }