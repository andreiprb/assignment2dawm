import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

import { LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { CoffeeOutline, EditOutline, PlusOutline } from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: NZ_ICONS,
      useValue: [
        CoffeeOutline,
        EditOutline,
        PlusOutline,
        LeftOutline,
        RightOutline
      ]
    }
  ]
};
