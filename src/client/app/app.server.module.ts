import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UniversalInterceptor } from './utils/universal.interceptor';

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      /* Multi is important or you will delete all the other interceptors */
      multi: true,
    },
  ],
})
export class AppServerModule {}
