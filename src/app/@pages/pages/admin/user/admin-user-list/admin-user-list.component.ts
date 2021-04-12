import {Component, OnInit, ViewChild} from '@angular/core';
import {API} from '../../../../../services/apis-call/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'gts-fe-admin-user-list',
    templateUrl: './admin-user-list.component.html',
    styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
    displayedColumns = ['id', 'name', 'username', 'edit'];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {}) sort: MatSort;

    users;
    data = [];

    constructor(
        private api: API,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.data = [];
        this.api.getAllUser().subscribe(users => {
            this.users = users;
            for (const student of this.users) {
                const d = {
                    id: student.id,
                    name: student.name,
                    username: student.username,
                };
                this.data.push(d);
            }
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
        });
    }

    newItem() {
        this.router.navigate(['/admin/user/new']);
    }

    edit(userId: any) {
        this.router.navigate(['/admin/user/' + userId]);
    }
}
