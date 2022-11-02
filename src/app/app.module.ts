import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MusicComponent } from './music/music.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { AutoFocusDirective } from './directives';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: LoginComponent },
    { path: 'login/:callback', component: LoginComponent },
    { path: 'music', component: MusicComponent },
	{ path: 'music/:id', component: MusicComponent },
	{ path: 'notifications', component: NotificationsComponent },
];

@NgModule({
	declarations: [
        AppComponent,
        AutoFocusDirective,
		LoginComponent,
		MusicComponent,
		NotificationsComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
        BrowserAnimationsModule,
		RouterModule.forRoot(routes),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
