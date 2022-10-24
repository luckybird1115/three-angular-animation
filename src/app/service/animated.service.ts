import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimatedService {

  constructor() { }

  public getData():Observable<any>{
    return of(['a','b','c']

    )
  }
}
