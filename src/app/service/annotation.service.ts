import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataType } from '../modules/data.model';
import { DataAnnotation } from '../modules/annotation.model';
import { CommentType } from '../modules/comment.model';

const APIURL = '../../assets/db.json';
const API="http://localhost:3000/Data";
@Injectable({
  providedIn: 'root'
})

export class AnnotationService {

  constructor(private http :HttpClient) { }

  getDataAnnotation(id:number):Observable<DataType>{
     return this.http.get<DataType>(API+`/${id}`);
  }

  addDataAnnotation(
    Data:DataType
    ):Observable<DataAnnotation>
    {
      const url = `${API}/${Data.id}`;

  
  return this.http.put<DataAnnotation>(url,{...Data});
}

}
