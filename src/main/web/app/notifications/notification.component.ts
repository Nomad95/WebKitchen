    import {Component, OnDestroy, OnInit} from "@angular/core";
import {NotificationService} from "./notification.service";
import {PageNotifications} from "./model/pageNotifications";
import {SharedService} from "../shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'notification',
    templateUrl: 'app/notifications/notification.component.html',
    providers: [NotificationService]
})
export class NotificationComponent implements OnInit, OnDestroy {

    private pageWithNotifications: PageNotifications;
    private notifications;
    private indexesOfPage;
    private notificationsToDelete;
    private currentPage: number;
    private sub:any;
    private countUnreadNotifications = {
        count:''
    };

    constructor(private notificationService: NotificationService,
                private sharedService: SharedService,
                private route: ActivatedRoute,
                private router: Router,
                private loginService: LoginService) {
        this.currentPage = 0;
    }

    ngOnInit() {
          this.getIndexOfPageAndGetMyNotifications();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getMyNotificationsByPage(numberOfPage: number): void{
     this.notifications = [];
     this.indexesOfPage = [];
        this.notificationService
            .getMyNotifications(numberOfPage)
            .subscribe( result => {
                this.pageWithNotifications = result;
                for(let note of this.pageWithNotifications.content)
                   this.notifications.push(note);
                this.generateTabForPagination(this.pageWithNotifications.totalPages);
                this.countMyUnreadNotifications();
            })
    }

    // generate list with number of pages
    generateTabForPagination(numberOfPage) {
        for (var i = 0; i < numberOfPage; i++)
            this.indexesOfPage.push(i+1);
    }

    getIndexOfPageAndGetMyNotifications():void{
        this.sub = this.route.params.subscribe(params => {
            this.currentPage = +params['page'];
            this.getMyNotificationsByPage(this.currentPage);
        });
    }

    countMyUnreadNotifications():void{
        this.loginService.countMyUnreadNotifications().subscribe(
            result => {
                this.countUnreadNotifications = result;
                this.sharedService.setNumberOfUnreadNotifications(Number(this.countUnreadNotifications.count));
            },
            err => console.log("An error occurred while retrieving count of unread notifications")
        );
    }

    getSelectedOptions() {
        this.notificationsToDelete = [];
        this.notificationsToDelete= this.notifications
            .filter(opt => opt.checked)
            .map(opt => opt.id);
    }

    deleteSelectedNotificatins():void{
        this.getSelectedOptions();

        var countNotifications =  this.notificationsToDelete.length;
        for(let notification of this.notificationsToDelete){
            if(countNotifications == 1)
                this.notificationService
                    .deleteNotification(notification)
                    .subscribe(()=> {
                       this.countMyUnreadNotifications();
                    });
            else
                this.notificationService
                    .deleteNotification(notification)
                    .subscribe();
            countNotifications--;
        }
        this.reloadPage();
    }

    reloadPage():void{
        var currentUrl = this.router.url;
        var refreshUrl = currentUrl.indexOf('messagebox/sent') > -1 ? '/messagebox' : 'messagebox/sent';
        this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));
    }
}