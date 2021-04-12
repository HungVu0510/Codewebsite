import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'session',
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'admin', loadChildren: () => import('./@pages/pages/admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: 'user', loadChildren: () => import('./@pages/pages/user/user.module').then(m => m.UserModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'session/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {
}
