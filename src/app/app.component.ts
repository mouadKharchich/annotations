import { Component, OnInit } from '@angular/core';
import { DataAnnotation } from './modules/annotation.model';
import { AnnotationService } from './service/annotation.service';
import { CommentType } from './modules/comment.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  srcImage: string = "../assets/image.jfif";
  annotations?: DataAnnotation[] = [];
  iconBase?: { width: number, height: number };
  imageBase?: { width: number, height: number }

  constructor( private annotationService: AnnotationService){
    this.iconBase={width:20,height:20};
    this.imageBase={width:913,height:661};
  }

  ngOnInit(): void {
      this.getAnnotations();
  }



  getAnnotations(){
    this.annotationService.getDataAnnotation(1).subscribe((response) => {
      this.annotations=response.annotations;
      this.srcImage=response.image;
    })
  }

      addAnnotation(annotation:DataAnnotation){

        annotation.id=(this.annotations?.length || 0)+1;

        this.annotations?.push(annotation);
        this.annotationService.addDataAnnotation(
          {
            id:1,
            image:this.srcImage,
            annotations:(this.annotations || [])
          }).subscribe(()=>{
            this.getAnnotations();
        })
  }
 
  addCommentToExistAnnotation(event: { id: number, comment: CommentType}){
    console.log(event.id);
     if(this.annotations){
      this.annotations.forEach((item)=>{
        if(item.id==event.id){
           item.comment?.push(event.comment);
           item.numberOfComment=item.comment?.length;
        }
      })
     
     }
      this.annotationService.addDataAnnotation({
        id:1,
        image:this.srcImage,
        annotations:(this.annotations || [])
      }).subscribe(() => {
        this.getAnnotations();
    });
  }
  
}
