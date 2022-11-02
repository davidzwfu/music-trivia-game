import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class SpotifyService {
    clientId = "348b5de48e014f8ea2ccec9b2142a2cd";
    clientSecret = "2fc7aef92c8b495791146e622a8516c8";
    redirect = `${window.location.origin}/login/callback`;

    constructor(private http: HttpClient) { }

    getAuth() {
        window.open(`https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirect}&scope=user-modify-playback-state%20streaming%20user-read-email%20user-read-private%20user-top-read&state=34fFs29kd09&show_dialog=true`,'_self');
    }

    getToken(code: string) {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.clientId + ":" + this.clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        let params: URLSearchParams = new URLSearchParams();
        params.set('grant_type', 'authorization_code');
        params.set('code', code);
        params.set('redirect_uri', this.redirect);
        let body = params.toString();

        return this.http.post<any>('https://accounts.spotify.com/api/token', body, { headers: headers });
    }

    refreshJob() {
        interval(1000 * 60 * 15).subscribe(x => {
            this.refreshToken().subscribe(res => {
                localStorage.setItem('token', res.access_token);
                if (res.refresh_token)
                    localStorage.setItem('refresh', res.refresh_token);
            });
        }); 
    }

    refreshToken() {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.clientId + ":" + this.clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        let params: URLSearchParams = new URLSearchParams();
        params.set('grant_type', 'refresh_token');
        params.set('refresh_token', localStorage.getItem('refresh'));
        let body = params.toString();

        return this.http.post<any>('https://accounts.spotify.com/api/token', body, { headers: headers });
    }

    playTrack(uri: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        });
        let body = { 'uris': [uri] };
        var url = 'https://api.spotify.com/v1/me/player/play?device_id=' + localStorage.getItem('deviceId');

        return this.http.put(url, body, { headers: headers });
    }
    pauseTrack(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        });
        let body = {};
        var url = 'https://api.spotify.com/v1/me/player/pause?device_id=' + localStorage.getItem('deviceId');

        return this.http.put(url, body, { headers: headers });
    }
    resumeTrack(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        });
        let body = {};
        var url = 'https://api.spotify.com/v1/me/player/play?device_id=' + localStorage.getItem('deviceId');

        return this.http.put(url, body, { headers: headers });
    }

    // Get search results for a query
    searchMusic(query: string, type: string, limit: number, offset: number = 0) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        var url = `https://api.spotify.com/v1/search?q=${query}&limit=${limit}&offset=${offset}&type=${type}&market=CA`;

        return this.http.get<any>(url, { headers: headers });
    }

    getUserTopTracks(time_range: string, type: string, limit: number, offset: number = 0) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        var url = `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`;

        return this.http.get<any>(url, { headers: headers });
    }

    getTopTracks(id: string) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        var url = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=CA';

        return this.http.get<any>(url, { headers: headers });
    }


    // getArtists(term: string) {
    //     return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
    //         map(data => data["artists"].items)
    //     );
    // }

    // getArtist(id: string) {
    //     return this.getQuery(`artists/${id}`);
    // }

    // getTopTracks(idArtist: string) {
    //     return this.getQuery(`artists/${idArtist}/top-tracks?country=us`)
    //         .pipe(map(data => data['tracks']));

    // }
}