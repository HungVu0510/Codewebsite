import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    children?: ChildrenItems[];
}

@Injectable()
export class HorizontalMenuItems {
    pushedAdmin = false;
    public MENUITEMS = [
        {
            name: 'Pet Shop',
            type: 'sub',
            class: 'group-title',
            icon: '',
            tutorial: 'stepHome',
            children: [
                {state: 'user/home', name: 'NAVBAR.Home', type: 'link'},
                // {state: 'core/account', name: 'NAVBAR.Account', type: 'link'},
                // {state: 'core/setting', name: 'NAVBAR.Setting', type: 'link'}
            ]
        }
    ];

    constructor() {
        if (localStorage.getItem('role') === 'ADMIN') {
            this.MENUITEMS.push({
                name: 'NAVBAR.Admin',
                type: 'sub',
                class: 'group-title',
                icon: '',
                tutorial: 'stepAdmin',
                children: [
                    {
                        state: 'admin/user',
                        name: 'NAVBAR.User',
                        type: 'link'
                    },
                    {
                        state: 'admin/product',
                        name: 'NAVBAR.Product',
                        type: 'link'
                    },
                    {
                        state: 'admin/order',
                        name: 'NAVBAR.Order',
                        type: 'link'
                    }
                ]
            });
        }
    }

    getAll() {
        return this.MENUITEMS;
    }

    add(menu: any) {
        this.MENUITEMS.push(menu);
    }

    contain(menu) {
        for (const m of this.MENUITEMS) {
            if (m === menu) {
                return true;
            }
        }
        return false;
    }

    length() {
        return this.MENUITEMS.length;
    }
}
