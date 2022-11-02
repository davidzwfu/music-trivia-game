import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Card, Artist, Toast } from '../classes';
import { fadeInAnimation, slideFromBottom, slideFadeInAnimation, playAnimation } from '../animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../toast.service';
import { NoopAnimationPlayer } from '@angular/animations';
import { from, } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import '../../assets/spotify-player.js';
import '../../assets/spotify.js';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css'],
    animations: [
        fadeInAnimation,
        slideFromBottom,
        slideFadeInAnimation,
        playAnimation,
    ]
})
export class MusicComponent implements OnInit {
    cards = [];
    loading = false;
    selected: Card = null;
    artists: Artist[] = [];
    minYear = 2000;
    maxYear = new Date().getFullYear();
    minExclude = new Date().getFullYear();
    maxExclude = new Date().getFullYear();
    artistLimit = 100;
    trackLimit = 20;
    options = true;
    type = "Artist";
    genre = "korean";
    stroke = 2;
    radius = 20;
    normalizedRadius = this.radius - (this.stroke * 2);
    circumference = this.normalizedRadius * 2 * Math.PI;
    offset = this.circumference;
    progress = 0;
    duration = 200000;
    showAnswer = false;
    timeRange = 'medium_term';
    userTopSongs = [];
    topTrackLimit = 100;

    constructor(public router: Router, private activatedRoute: ActivatedRoute, private spotify: SpotifyService, private toast: ToastService) { }

    ngOnInit(): void {
        this.spotify.refreshJob();
        this.spotify.refreshToken().subscribe(res => {
            localStorage.setItem('token', res.access_token);
            if (res.refresh_token)
                localStorage.setItem('refresh', res.refresh_token);
            
        });

    }

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        //console.log(event);
        if (this.options && event.code == 'Enter')
            this.submitOptions();
        if (this.selected) {
            event.preventDefault();
            var card = this.selected;
            if (event.code == 'Enter' || event.code == 'KeyD')
                this.nextSong(card);
            else if (event.code == 'Space') {
                if (card.paused == true)
                    this.resume(card);
                else
                    this.pause(card);
            }
            else if (event.code == 'KeyA')
                this.revealAnswer();
        }
    }

    submitOptions() {
        this.options = false;
        this.generate();

        setInterval(() => {
            if (this.selected != null && this.selected.paused == false) {
                this.progress += 500;
                if (this.progress >= this.duration) {
                    this.offset = this.circumference;
                    this.selected.paused = true;
                    this.progress = 0;
                }
                else
                    this.offset = this.circumference - (this.progress / this.duration * this.circumference);
            }
        }, 500);
    }

    clearCards() {
        this.cards = [];
        this.selected = null;
    }

    generate() {
        if (this.type == "Artist")
            this.generateArtist();
        else if (this.type == "User top") {
            this.generateUserTop();
            this.generateTopArtist();
        }
        else
            this.generateYear();
    }

    generateUserTop() {
        var card = new Card();
        var artist = new Artist();
        artist.name = "My Top " + this.topTrackLimit;
        card.artist = artist;
        card.type = "top";
        this.cards.push(card);

        var left = this.topTrackLimit;
        var offset = 0;
        var array = [];
        while (left > 0) {
            if (left >= 50)
                array.push(50);
            else
                array.push(left);
            left -= 50;
        }
        from(array).pipe(concatMap(el => this.spotify.getUserTopTracks(this.timeRange, 'tracks', el, offset))).subscribe(res => {
            console.log(res);
            //this.artists = res.artists.items;
            for (var i = 0; i < res.items.length; i++) {
                this.userTopSongs.push(res.items[i]);
            }
            offset += 50;
        }, error => {
            if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }
    generateTopArtist() {
        var left = this.artistLimit;
        var offset = 0;
        var array = [];
        while (left > 0) {
            if (left >= 50)
                array.push(50);
            else
                array.push(left);
            left -= 50;
        }
        from(array).pipe(concatMap(el => this.spotify.getUserTopTracks(this.timeRange, 'artists', el, offset))).subscribe(res => {
            console.log(res);
            //this.artists = res.artists.items;
            for (var i = 0; i < res.items.length; i++) {
                var card = new Card();
                card.artist = res.items[i];
                this.cards.push(card);
            }
            offset += 50;
        }, error => {
            if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }
    generateArtist() {
        var query = `genre:"${this.genre.replace(/&/g, "%26")}"`;
        var left = this.artistLimit;
        var offset = 0;
        var array = [];
        while (left > 0) {
            if (left >= 50)
                array.push(50);
            else
                array.push(left);
            left -= 50;
        }
        from(array).pipe(concatMap(el => this.spotify.searchMusic(query, 'artist', el, offset))).subscribe(res => {
            console.log(res);
            //this.artists = res.artists.items;
            for (var i = 0; i < res.artists.items.length; i++) {
                var card = new Card();
                card.artist = res.artists.items[i];
                this.cards.push(card);
            }
            offset += 50;
        }, error => {
            if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }

    generateYear() {
        for (var i = this.minYear; i <= this.maxYear; i++) {
            var card = new Card();
            card.year = i;
            this.cards.push(card);
        }
        this.loading = false;
    }

    onClick(card: Card, next = false) {
        if (card == this.selected && next == false)
            return;
        this.selected = card;
        this.showAnswer = false;
        this.selected.answer = "";
        this.selected.image = "";
        this.offset = this.circumference;
        this.progress = 0;
        
        if (this.selected.type == 'top')
            this.playTopTrack();
        // else if (this.type == 'User top') {
        //     this.playTopArtist();
        // }
        else
            this.playRandom();
    }

    // playTop() {
    //     this.playTopArtist();
    // }
    // playTopArtist() {
    //     var card = this.selected;

    //     this.spotify.getTopTracks(card.artist.id).subscribe(res => {
    //         //console.log(res);
    //         var random = Math.floor(Math.random() * res.tracks.length);
    //         //console.log(res.tracks.items[random]);
    //         if (res.tracks.length == 0) {
    //             this.toast.addToast(new Toast("Could not find any songs."));
    //             this.pause(card);
    //             return;
    //         }

    //         this.spotify.playTrack(res.tracks[random].uri).subscribe(resp => {
    //             if (resp)
    //                 console.log(resp);

    //             this.duration = res.tracks[random].duration_ms;
    //             card.paused = false;
    //             this.progress = 0.1;
    //             try { card.image = res.tracks[random].album.images[0].url; }
    //             catch (error) { console.log(error); }

    //             if (this.type == 'Artist' || this.type == 'User top')
    //                 card.answer = res.tracks[random].name;
    //         }, error => {
    //             card.paused = true;
    //             if (error.status == 404)
    //                 this.toast.addToast(new Toast("No active Spotify playback device."));
    //             else if (error.error.error.message)
    //                 this.toast.addToast(new Toast(error.error.error.message));
    //         });
    //     });
    // }
    playTopTrack() {
        var card = this.selected;

        var random = Math.floor(Math.random() * this.userTopSongs.length);
        var randomTrack = this.userTopSongs[random];

        this.spotify.playTrack(randomTrack.uri).subscribe(resp => {
            if (resp)
                console.log(resp);

            this.duration = randomTrack.duration_ms;
            card.paused = false;
            this.progress = 0.1;
            try { card.image = randomTrack.album.images[0].url; }
            catch (error) { console.log(error); }

            card.answer = randomTrack.artists[0].name + ' - ' + randomTrack.name;
        }, error => {
            card.paused = true;
            if (error.status == 404)
                this.toast.addToast(new Toast("No active Spotify playback device."));
            else if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }
    playRandom() {
        var card = this.selected;
        var exclude = (this.minExclude && this.maxExclude) ? this.minExclude + "-" + this.maxExclude : "";
        if (this.type == 'Artist' || this.type == 'User top') {
            var genre = card.artist.genres.length > 0 ? card.artist.genres[0] : "";
            var query = `genre:"${genre.replace(/&/g, "%26")}"%20artist:"${card.artist.name.replace(/&/g, "%26")}"%20NOT year:"${exclude}"`;
        }
        else {
            var query = `genre:"${this.genre.replace(/&/g, "%26")}"%20year:"${card.year}"`;
        }
        //console.log(query);

        this.spotify.searchMusic(query, 'track', this.trackLimit).subscribe(res => {
            //console.log(res);
            var random = Math.floor(Math.random() * res.tracks.items.length);
            //console.log(res.tracks.items[random]);
            if (res.tracks.items.length == 0) {
                this.toast.addToast(new Toast("Could not find any songs."));
                this.pause(card);
                return;
            }

            this.spotify.playTrack(res.tracks.items[random].uri).subscribe(resp => {
                if (resp)
                    console.log(resp);

                this.duration = res.tracks.items[random].duration_ms;
                card.paused = false;
                this.progress = 0.1;
                try { card.image = res.tracks.items[random].album.images[0].url; }
                catch (error) { console.log(error); }

                if (this.type == 'Artist' || this.type == 'User top')
                    card.answer = res.tracks.items[random].name;
                else
                    card.answer = res.tracks.items[random].artists[0].name + ' - ' + res.tracks.items[random].name;
            }, error => {
                card.paused = true;
                if (error.status == 404)
                    this.toast.addToast(new Toast("No active Spotify playback device."));
                else if (error.error.error.message)
                    this.toast.addToast(new Toast(error.error.error.message));
            });
        });
    }

    pause(card: Card) {
        event.stopPropagation();
        card.paused = true;
        this.spotify.pauseTrack().subscribe(resp => {
            if (resp)
                console.log(resp);
        }, error => {
            if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }
    resume(card: Card) {
        event.stopPropagation();
        card.paused = false;
        this.spotify.resumeTrack().subscribe(resp => {
            if (resp)
                console.log(resp);
        }, error => {
            if (error.error.error.message)
                this.toast.addToast(new Toast(error.error.error.message));
        });
    }
    close(card: Card) {
        event.stopPropagation();
        this.pause(card);
        this.selected = null;
    }
    nextSong(card: Card) {
        event.stopPropagation();
        this.progress = -0.1;
        this.onClick(card, true);
    }
    revealAnswer() {
        event.stopPropagation();
        this.showAnswer = !this.showAnswer;
    }

}
