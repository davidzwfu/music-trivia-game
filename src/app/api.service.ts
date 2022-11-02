import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { Student, Response, Award, Education, Experience, Search } from  './classes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    addUser(student: Student): Observable<Response> {
      	return this.httpClient.post<Response>(`http://tristan.changsdrapery.com/api/add-user.php`, student);
    }
    getProfile(id): Observable<Student> {
      	return this.httpClient.get<Student>(`http://tristan.changsdrapery.com/api/get-profile.php`,
      	{ params: { id: id }});
    }
    deleteUser(id): Observable<Response> {
        return this.httpClient.delete<Response>(`http://tristan.changsdrapery.com/api/delete-user.php`,
        { params: { id: id }});
    }
    checkUser(email): Observable<Response> {
        return this.httpClient.get<Response>(`http://tristan.changsdrapery.com/api/check-username.php`,
        { params: { email: email }});
    }

    addAwards(awards: Award[]): Observable<Response> {
        return this.httpClient.post<Response>(`http://tristan.changsdrapery.com/api/add-awards.php`, JSON.stringify(awards));
    }
    getAwards(uid): Observable<Award[]> {
        return this.httpClient.get<Award[]>(`http://tristan.changsdrapery.com/api/get-awards.php`,
      	{ params: { uid: uid }});
    }
    addEducations(educations: Education[]): Observable<Response> {
        return this.httpClient.post<Response>(`http://tristan.changsdrapery.com/api/add-educations.php`, JSON.stringify(educations));
    }
    getEducations(uid): Observable<Education[]> {
        return this.httpClient.get<Education[]>(`http://tristan.changsdrapery.com/api/get-educations.php`,
      	{ params: { uid: uid }});
    }
    addExperiences(experiences: Experience[]): Observable<Response> {
        return this.httpClient.post<Response>(`http://tristan.changsdrapery.com/api/add-experiences.php`, JSON.stringify(experiences));
    }
    getExperiences(uid): Observable<Experience[]> {
        return this.httpClient.get<Experience[]>(`http://tristan.changsdrapery.com/api/get-experiences.php`,
      	{ params: { uid: uid }});
    }

    getSearches(search): Observable<Search[]> {
        return this.httpClient.get<Search[]>(`http://tristan.changsdrapery.com/api/search-bar.php`,
      	{ params: { search: search }});
    }
    getStage(type, ageMin, ageMax, region, country): Observable<Student[]> {
        return this.httpClient.get<Student[]>(`http://tristan.changsdrapery.com/api/get-stage.php`,
      	{ params: { type: type, ageMin: ageMin, ageMax: ageMax, region: region, country: country }});
    }

    getAllAwards(): Observable<Award[]> {
        return this.httpClient.get<Award[]>(`http://tristan.changsdrapery.com/api/get-all-awards.php`);
    }
    addRating(award: Award): Observable<Response> {
        return this.httpClient.post<Response>(`http://tristan.changsdrapery.com/api/add-rating.php`, award);
    }
}
