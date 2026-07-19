import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGithub, openOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonIcon],
})
export class AppComponent {
  constructor() {
    addIcons({ logoGithub, openOutline });
  }

  openRepo(): void {
    window.open('https://github.com/AlexanderEscobar104/pruebaIonic', '_blank');
  }
}
