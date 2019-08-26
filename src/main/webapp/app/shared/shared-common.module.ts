import { NgModule } from '@angular/core';

import { JhipsterJoinMeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JhipsterJoinMeSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JhipsterJoinMeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterJoinMeSharedCommonModule {}
