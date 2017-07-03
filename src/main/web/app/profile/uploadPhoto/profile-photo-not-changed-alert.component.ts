import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface AlertModel {
  title:string;
  message:string;
}

@Component({
  selector: 'profile-photo-not-changed-alert',
  template: `
  <div class="modal-dialog modal-dialog-ng2">
                <div class="modal-content-ng2">
                <div class="form-style-10">
                   <div>
                     <button type="button" class="close modal-close-ng2" (click)="close()" >&times;</button>
                     <h1 class="modal-title">{{title || 'Alert!'}}</h1>
                   </div>
                  
                     <p>{{message || 'Sorry :/'}}</p>
                   
                   <div class="modal-button-section">
                     <button type="button" class="btn btn-primary btn-warning modal-submit-button-ng2" (click)="close()">OK</button>
                   </div>
                </div>
             </div>
             </div>`,
  styleUrls: ['css/change-password-form.css']
})
export class ProfilePhotoAlertComponent extends DialogComponent<AlertModel, boolean> implements AlertModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

}