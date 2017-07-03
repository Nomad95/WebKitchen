import {Component, ViewChild, Input, Output, OnChanges, EventEmitter, Type} from '@angular/core';
import {ImageCropperComponent} from 'ng2-img-cropper';
import {CropperSettings} from 'ng2-img-cropper';
import {Bounds} from 'ng2-img-cropper';

import { MyProfileService } from '../myProfile/myProfile.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ProfilePhotoAlertComponent } from './profile-photo-not-changed-alert.component';

@Component({
    selector: 'upload-photo',
    template: `
    <div class="modal-dialog-ng2">
			<div class="modal-content-ng2-photo">
    <div>
        <div class="form-style-10">
        <h1>Zmiana zdjęcia profilowego<span>Aby zmienić swoje zdjęcie wybierz interesujący Cię obszar. </span></h1>
            <div class="pull-left">
                <h3>Ustaw avatar</h3>
                <img-cropper [image]="photo" [settings]="cropperSettings" (onCrop)="cropped($event)"></img-cropper>
                <br>
                <span class="result" *ngIf="photo.image" >
                    <img [src]="photo.image" class="imgimgimg">
                </span>
                <span class="result" *ngIf="!photo.image" >
                    <img [src]="profilePhotoUrl" class="imgimgimg">
                </span>
            </div>
        
    
    <div class="modal-button-section">
            <button type="submit" class="btn btn-warning modal-submit-button-ng2" (click)="uploadProfilePhoto()" data-dismiss="modal">Zmień</button>
            <button type="button" class="btn btn-warning modal-submit-button-ng2" data-dismiss="modal">Anuluj</button>
    
</div>
</div>
</div>
	</div>`,
    styles: [`
        h3 {
          padding-bottom: 20px;
          border-bottom: 1px solid #a0a0a0;
        }
        
        h4 {
          padding-bottom: 20px;
          padding-top: 20px;
          border-top: 1px solid #a0a0a0;
        }
    
        .result {
            margin-top: 30px;
            border: 1px solid rgba(125,125,125,0.6);
            display: inline-block;
            padding: 1px;
        }

        .result.rounded > img {
            border-radius: 100px;
        }

        .pull-left {
            min-width: 400px;
            float: left;
            margin: 10px;
            padding: 10px;
            background-color: rgba(0,0,0,0.05);
        }
        
        .file-upload {
          height: 25px;
          width: 100px;
          position: relative;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          float: right;
          
          border: 1px solid #FFF;
          overflow: hidden;
          background-image: linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%);
          background-size: 100% 200%;
          transition: all 1s;
          color: #FFF;
          font-size: 10px;
        }
        
        .file-upload:hover {
          background-position: 0 -100%;
          color: #2590Eb;
        }
        
        .text {
          font-size: 14px;
        }
        
        input[type='file'] {
          height: 25px;
          width: 100px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }
    .form-style-10{
        width: 600px;
        height: 850px;
        padding:30px;
        margin: auto;
        background: #FFF;
        border-radius: 10px;
        -webkit-border-radius:10px;
        -moz-border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
        -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
        -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}
.form-style-10 .inner-wrap{
    padding: 30px;
    background: #F8F8F8;
    border-radius: 6px;
    margin-bottom: 15px;
}
.form-style-10 h1{
    background: rgb(255, 102, 0);
    padding: 20px 30px 15px 30px;
    margin: -30px -30px 30px -30px;
    border-radius: 10px 10px 0 0;
    -webkit-border-radius: 10px 10px 0 0;
    -moz-border-radius: 10px 10px 0 0;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
    font: normal 30px 'Bitter', serif;
    -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    border: 1px solid rgb(255, 102, 0);
}
.form-style-10 h1 > span{
    display: block;
    margin-top: 2px;
    font: 13px Arial, Helvetica, sans-serif;
}
.form-style-10 label{
    display: block;
    font: 13px Arial, Helvetica, sans-serif;
    color: #888;
    margin-bottom: 15px;
}
.form-style-10 input[type="text"],
.form-style-10 input[type="date"],
.form-style-10 input[type="datetime"],
.form-style-10 input[type="email"],
.form-style-10 input[type="number"],
.form-style-10 input[type="search"],
.form-style-10 input[type="time"],
.form-style-10 input[type="url"],
.form-style-10 input[type="password"],
.form-style-10 textarea,
.form-style-10 select {
    display: block;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    border: 2px solid #fff;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
    -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
}

.form-style-10 .section{
    font: normal 20px 'Bitter', serif;
    color: #2f2f2f;
    margin-bottom: 5px;
}
.form-style-10 .section span {
    background: #2f2f2f;
    padding: 5px 10px 5px 10px;
    position: absolute;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 4px solid #fff;
    font-size: 14px;
    margin-left: -45px;
    color: #fff;
    margin-top: -3px;
}
.form-style-10 input[type="button"],
.form-style-10 input[type="submit"]{
    background: rgb(255, 102, 0);
    padding: 8px 20px 8px 20px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
    font: normal 30px 'Bitter', serif;
    -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
    border: 1px solid rgb(255, 102, 0);
    font-size: 15px;
}
.form-style-10 input[type="button"]:hover,
.form-style-10 input[type="submit"]:hover{
    background: rgb(255, 102, 0);
    -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
    -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
    box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.form-style-10 .privacy-policy{
    float: right;
    width: 250px;
    font: 12px Arial, Helvetica, sans-serif;
    color: #4D4D4D;
    margin-top: 10px;
    text-align: right;
}`]
})
export class UploadPhotoComponent extends Type implements OnChanges {
    ngOnChanges(): void {
        if(this.nick !== "")
       this.checkIfTheUserHasProfilePhoto(this.nick);
    }

     //Cropper photo
    photo:any;
    cropperSettings:CropperSettings;

    private profilePhotoUrl = "";

    @Input()
    private nick: string;

    @Output() onProfilePhotoChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

    photoString:string;

    constructor(private myProfileService: MyProfileService,
                private dialogService:DialogService) {
        super();
          this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 800;
        this.cropperSettings.height = 800;

        this.cropperSettings.croppedWidth = 800;
        this.cropperSettings.croppedHeight = 800;

        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = false;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.photo = {};

    }

    cropped(bounds:Bounds) {      
        this.photoString = this.photo.image;
    }

    /**
     * Used to send image to second cropper
     * @param $event
     */
    fileChangeListener($event) {
        var image:any = new Image();
        var file = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {            
            image.src = loadEvent.target.result;
                        console.log(loadEvent.target.result);
            that.cropper.setImage(image);

        };
        myReader.readAsDataURL(file);
    }

      checkIfTheUserHasProfilePhoto(nick:string){
        this.myProfileService.isProfilePhotoExists(nick).subscribe(result => {
            if(result){
                this.setUserProfilePhoto();
            }
            else this.setDefaultProfilePhoto();
        })
    }

    setUserProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.nick+"/profilePhoto/profile1.jpg";
    }

    setDefaultProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.nick+"/profilePhoto/profile.jpg";
    }

      /**
     * Uploads a file priovided in form
     * @param formData
     */
    uploadProfilePhoto() {
         
        //prevent errors when user dont provide a photo
        if(this.photoString == null || this.photoString == ''){
            console.log('No photo data provided');
            this.showPhotoNotChangedAlert(); 
            return;
        }

        this.myProfileService.uploadProfilePhoto(this.photoString.replace("\"",""),this.nick)
            .subscribe(data => {
                    console.log("photo Added");
                    this.profilePhotoChanged(true);
                },
                err => {
                    console.log("error adding photo")
                    this.showPhotoNotChangedAlert();     
     });
    }

    public profilePhotoChanged(date: boolean): void {
        this.onProfilePhotoChanged.emit(date);        
    }

    showPhotoNotChangedAlert() {
        this.dialogService.addDialog(ProfilePhotoAlertComponent, {title:'Zdjęcie nie zostało zmienione', message:'Niestety nie udało się zmienić zdjęcia ;('}, { closeByClickingOutside:true });
    }
}
