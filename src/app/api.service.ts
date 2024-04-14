import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ApiService{
  apiUrl: string = 'https://kep.uz/api/problems';

  constructor(private http: HttpClient) {}

  fetchData(ordering: string, page: number, pageSize: number): Observable<any> {
    // Construct the URL with query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    // Add 'hasChecker' parameter based on ordering
    if (ordering === 'true') {
      params = params.set('hasChecker', 'true');
    } else if (ordering === 'false') {
      params = params.set('hasChecker', 'false');
    }

    // Make the HTTP request with the constructed params
    return this.http.get<any>(this.apiUrl, { params });
  }
}