import {Component, OnInit} from '@angular/core';
import {API} from '../../../../../services/apis-call/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'gts-fe-admin-user-detail',
    templateUrl: './admin-user-detail.component.html',
    styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {

    ACTION;
    formGroup: FormGroup;
    user;
    id;

    constructor(
        private api: API,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id === 'new') {
            this.ACTION = 'NEW';
            this.formGroup = this.formBuilder.group({
                username: ['', [Validators.required]],
                password: ['', [Validators.required]],
                name: ['', Validators.required],
                role: ['STUDENT']
            });
        } else {
            this.ACTION = 'EDIT';
            this.formGroup = this.formBuilder.group({
                id: [0],
                username: ['', [Validators.required]],
                password: ['', [Validators.required]],
                name: ['', Validators.required],
                token: [''],
                role: ['']
            });
            this.loadEdit();
        }
    }
    private loadEdit() {
        this.api.getUserById(this.id).subscribe(user => {
            this.user = user;
            this.formGroup.patchValue(this.user);
            this.formGroup.controls.username.disable();
            this.formGroup.controls.password.disable();
        })
    }

    onSubmit() {
        if (this.ACTION === 'NEW') {
            this.api.signup(this.formGroup.value).subscribe(next => {
                this.router.navigate(['admin/user']);
            })
        } else {
            this.formGroup.controls.username.enable();
            this.formGroup.controls.password.enable();
            this.api.updateUser(this.id, this.formGroup.value).subscribe(next => {
                this.router.navigate(['admin/user']);
            })
        }
    }

    onCancel() {
        this.router.navigate(['admin/user']);
    }
}
