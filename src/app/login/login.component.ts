import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../animations';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [
		fadeInAnimation,
    ]
})
export class LoginComponent implements OnInit {
	submitted = false;

	constructor(private route: ActivatedRoute, private router: Router, private spotify: SpotifyService) { }

	ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('callback') == 'callback') {
            var code = this.route.snapshot.queryParamMap.get("code") || "";
            this.spotify.getToken(code).subscribe(res => {
                //this.spotify.authToken = res.access_token;
                localStorage.setItem('token', res.access_token);
                localStorage.setItem('refresh', res.refresh_token);
                this.router.navigate(['/music'], { replaceUrl: true });
            });
        }
        // else
        //     this.spotify.getAuth();
        // var params = this.activatedRoute.snapshot.queryParamMap;
        // this.code = params.get("code") || "";
        //this.spotify.getAuth();
    }
    
    login() {
        this.spotify.getAuth();
    }

}
