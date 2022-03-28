import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./components/welcom/welcome.component";
import {DiscussionComponent} from "./components/discussion/discussion.component";
import {UserResolver} from "./user.resolver";


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'chat', component: DiscussionComponent, resolve: {user: UserResolver}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
