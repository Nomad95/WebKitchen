import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'username-changed-alert',
  template: `
  <div class="modal-dialog modal-dialog-ng2">
                <div class="modal-content-ng2">
                <div class="form-style-10">
                   <div>
                     <button type="button" class="close modal-close-ng2" (click)="close()" >&times;</button>
                     <h1 class="modal-title">{{title || 'Alert!'}}</h1>
                   </div>
                  
                     <p>Jeśli zatwierdzisz zmianę zostaniesz wylogowany.<br> Czy na pewno chcesz zmienić login?</p>
                   
                   <div class="modal-button-section">
                     <button type="button" class="btn btn-primary btn-warning modal-submit-button-ng2" (click)="confirm()">Tak</button>
                     <button type="button" class="btn btn-default btn-warning modal-submit-button-ng2" (click)="cancel()">Nie</button>
                   </div>
                </div>
             </div>
             </div>`,
  styleUrls: ['css/change-password-form.css']
})
export class AlertComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

   confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

}