import {filter} from 'rxjs/operators';
import {Component, OnInit, ViewChild, HostListener, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {TourService} from 'ngx-tour-md-menu';
import {AuthService} from '../services/auth-service/auth.service';
import {HorizontalMenuItems} from '../core/menu/horizontal-menu-items/horizontal-menu-items';

declare var require: any;
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import { CoreService } from 'app/services/core/core.service';
import {SharedService} from '../services/shared/shared.service';

const screenfull = require('screenfull');

@Component({
    selector: 'gene-layout',
    templateUrl: './main-material.html',
    styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class MainComponent implements OnInit {

    public ROUTING;
    public statusMenu = [];
    public routingSub: Subscription;
    root = 'ltr';
    currentLang = 'en';
    dark: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    chatpanelOpen: boolean = false;
    isFullscreen: boolean = false;
    showSettings: boolean = false;
    isMobile: boolean = false;
    header: string;
    layout: any = 'ltr';
    popupDeleteResponse: any;
    isMobileStatus: boolean;
    private _routerEventsSubscription: Subscription;
    private _router;
    user;
    @ViewChild('horizontalSideNav', {static: true}) horizontalSideNav;

    chatList: any[] = [
        {
            image: 'assets/img/user-1.jpg',
            name: 'John Smith',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-2.jpg',
            name: 'Amanda Brown',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-3.jpg',
            name: 'Justin Randolf',
            chat: 'Lorem ipsum simply dummy',
            mode: 'offline'
        },
        {
            image: 'assets/img/user-4.jpg',
            name: 'Randy SunSung',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-5.jpg',
            name: 'Lisa Myth',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
    ];
    screenWidth: number;
    screenHeight: number;

    constructor(public tourService: TourService,
                public menuItems: HorizontalMenuItems,
                public translate: TranslateService,
                private router: Router,
                private authService: AuthService,
                public coreService: CoreService,
                private activateRoute: ActivatedRoute,
                private sharedService: SharedService) {

        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

        this.tourService.initialize([{
            anchorId: 'start.tour',
            content: 'Welcome to Gene admin panel!',
            placement: 'below',
            title: 'Welcome to Gene',
        },
            {
                anchorId: 'tour-search',
                content: 'Enjoying Search box with sugestion and many more things',
                placement: 'below',
                title: 'Search Box',
            },
            {
                anchorId: 'tour-full-screen',
                content: 'By pressing this button you can switch to fullscreen mode.',
                placement: 'below',
                title: 'Full Screen',
            },
            {
                anchorId: 'tour-ui',
                content: 'Show your site stats with unique designed cards',
                placement: 'below',
                title: 'Stats Cards',
            }]);


        // if (window.innerWidth > 1199) {
        // 	this.tourService.start();
        // }
    }

    onMouseEnter(idx) {

        this.statusMenu[idx] = 'visible';
    }

    onMouseLeave(idx) {

        this.statusMenu[idx] = 'hidden';
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('userProfile'));
        this.routingSub = this.sharedService.ROUTING.subscribe(value => {

            this.ROUTING = value.substr(1, value.length)
        })
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.menuItems = new HorizontalMenuItems();
        // this.authService.syncCurrentUserData().add(() => {
        //     this.menuItems = new HorizontalMenuItems();
        //     this.menuItems = this.authService.getPermissionSubMenu();
        //     for (let i = 0; i < this.menuItems.length(); i++) {
        //
        //         this.statusMenu.push('hidden');
        //     }
        // });

        this._routerEventsSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && this.isMobile) {
                this.horizontalSideNav.close();
            }
        });
    }

    changeRouting() {
        _.fill(this.statusMenu, 'hidden');
    }

    /**
     *As router outlet will emit an activate event any time a new component is being instantiated.
     */
    onActivate(e, scrollContainer) {
        scrollContainer.scrollTop = 0;
    }

    /**
     * toggleFullscreen method is used to show a template in fullscreen.
     */
    toggleFullscreen() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
            this.isFullscreen = !this.isFullscreen;
        }
    }

    /**
     * customizerFunction is used to open and close the customizer.
     */
    customizerFunction() {
        this.customizerIn = !this.customizerIn;
    }

    /**
     * addClassOnBody method is used to add a add or remove class on body.
     */
    addClassOnBody(event) {
        var body = document.body;
        if (event.checked) {
            body.classList.add('dark-theme-active');
        } else {
            body.classList.remove('dark-theme-active');
        }
    }

    /**
     * logOut method is used to log out the template.
     */
    logOut() {
        this.authService.logOut();
    }

    /**
     * onDelete function is used to open the delete dialog.
     */
    onDelete(cart) {

    }

    /**
     * getPopupDeleteResponse is used to delete the cart item when reponse is yes.
     */
    getPopupDeleteResponse(response: any, cart) {

    }

    /**
     * changeLayout method is used to change the layout of menu items.
     */
    changeLayout() {
        _.fill(this.statusMenu, 'hidden');
        this.router.navigate(['/dashboard/crm']);
    }

    /**
     * changeRTL method is used to change the layout of template.
     */
    changeRTL(isChecked) {
        if (isChecked) {
            this.layout = 'rtl';
        } else {
            this.layout = 'ltr';
        }
    }

    /**
     *chatMenu method is used to toggle a chat menu list.
     */
    chatMenu() {
        document.getElementById('gene-chat').classList.toggle('show-chat-list');
    }

    /**
     * onChatOpen method is used to open a chat window.
     */
    onChatOpen() {
        document.getElementById('chat-open').classList.toggle('show-chat-window');
    }

    /**
     * onChatWindowClose method is used to close the chat window.
     */
    chatWindowClose() {
        document.getElementById('chat-open').classList.remove('show-chat-window');
    }

    /**
     * toggleSidebar method is used a toggle a side nav bar.
     */
    toggleSidebar() {
        this.coreService.horizontalSideNavOpen = !this.coreService.horizontalSideNavOpen;
    }

    onResize(event) {
        if (event.target.innerWidth < 1200) {
            this.coreService.horizontalSideNavMode = 'over';
            this.coreService.horizontalSideNavOpen = false;
            var main_div = document.getElementsByClassName('app');
            for (let i = 0; i < main_div.length; i++) {
                if (!(main_div[i].classList.contains('sidebar-overlay'))) {
                    if (document.getElementById('main-app')) {
                        document.getElementById('main-app').className += ' sidebar-overlay';
                    }
                }
            }
        } else {
            //for responsive
            var main_div = document.getElementsByClassName('app');
            for (let i = 0; i < main_div.length; i++) {
                if (main_div[i].classList.contains('sidebar-overlay')) {
                    document.getElementById('main-app').classList.remove('sidebar-overlay');
                }
            }
        }
    }

    getMinHeight() {
        return 'min-height: ' + this.screenHeight + 'px';
    }
}


