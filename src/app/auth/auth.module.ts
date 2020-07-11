import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const appRoutes2 : Routes=[
    {path : '',component : AuthComponent}
]

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(appRoutes2)
    ]
})
export class AuthModule{}