import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>

      <nb-layout-column>
    <router-outlet></router-outlet>
      </nb-layout-column>

      <nb-layout-footer fixed>
      <!-- Insert footer here -->
      </nb-layout-footer>

    </nb-layout>
  `,
  styles: []
})
export class AppComponent {
  title = 'chat-app';
}
