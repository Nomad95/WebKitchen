import {ToasterConfig} from 'angular2-toaster';

export class ToastConfigurerFactory {
    static successSimpleMessage(title: string,message: string){
       return {
           type: 'success',
           title: title,
           body: message,
       };
    }

    static errorSimpleMessage(title: string,message: string){
        return {
            type: 'error',
            title: title,
            body: message,
        };
    }

    static warningSimpleMessage(title: string,message: string){
        return {
            type: 'warning',
            title: title,
            body: message,
        };
    }

    static infoSimpleMessage(title: string,message: string){
        return {
            type: 'info',
            title: title,
            body: message,
        };
    }

    //configurations

    static basicToastConfiguration(){
        return new ToasterConfig({
            limit: 4,
            showCloseButton: true,
            mouseoverTimerStop: true,
        });
    }
}