import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Music Game';
	modal = false;
	
	constructor (public router: Router) {
	}

	signout() {
		this.router.navigate(['/login']);
	}
}
