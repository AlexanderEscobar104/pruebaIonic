import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getBoolean } from 'firebase/remote-config';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private remoteConfig: ReturnType<typeof getRemoteConfig> | null = null;
  readonly isDeadlineEnabled$ = new BehaviorSubject<boolean>(false);

  async init(): Promise<void> {
    try {
      const app = initializeApp(environment.firebase);
      this.remoteConfig = getRemoteConfig(app);
      this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
      this.remoteConfig.defaultConfig = { feature_task_deadlines: false };
      await fetchAndActivate(this.remoteConfig);
      const value = getBoolean(this.remoteConfig, 'feature_task_deadlines');
      this.isDeadlineEnabled$.next(value);
    } catch {
      this.isDeadlineEnabled$.next(false);
    }
  }
}
