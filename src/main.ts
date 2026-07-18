import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { APP_INITIALIZER } from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { TaskService } from './app/services/task.service';
import { CategoryService } from './app/services/category.service';
import { RemoteConfigService } from './app/services/remote-config.service';

function initializeApp(
  taskService: TaskService,
  categoryService: CategoryService,
  remoteConfig: RemoteConfigService,
) {
  return async (): Promise<void> => {
    await taskService.init();
    await categoryService.init();
    await remoteConfig.init();
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TaskService, CategoryService, RemoteConfigService],
      multi: true,
    },
  ],
});
