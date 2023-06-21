import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DataAnnotation } from '../modules/annotation.model';
import { CommentType } from '../modules/comment.model';

@Component({
  selector: 'app-image-annotation',
  templateUrl: './image-annotation.component.html',
  styleUrls: ['./image-annotation.component.css']
})
 export class ImageAnnotationComponent implements AfterViewInit{

 // Inputs:

 @Input() srcImage?:string;
 @Input() iconBase?:{width:number,height:number};
 @Input() imageBase?:{width:number,height:number};
 @Input() annotations?:DataAnnotation[];
 //attributs initialize 
 tableAnnotations:DataAnnotation[]=[]
 isImageLoaded: boolean = false;
 xForIcon: number = 0;
 yForIcon: number = 0;

 xForPop: number = 0;
 yForPop: number = 0;

 annotation?: DataAnnotation = { id: -1, colorOfIcon: "" };

 showForm: boolean = false;

 hoveredMessage: boolean = false;
 hoverAnnotation?: DataAnnotation | null;

 popFormShow: boolean = false;
 addCommentStatus: boolean = false;
 
 imageHeight:number=0;

 @ViewChild('image', { read: ElementRef }) image!: ElementRef;

 @Output() annotationSave:EventEmitter<DataAnnotation>=new EventEmitter<DataAnnotation>();
 @Output() addComment:EventEmitter<{ id: number, comment: CommentType }>=new EventEmitter<{ id: number, comment: CommentType }>();


 ngAfterViewInit() {
  this.handleImageLoad();
}



handleImageLoad() {
  if (this.image.nativeElement.complete) {
    this.reCalculateWithHeightIcon();
  } else {
    this.image.nativeElement.onload = () => {
      this.reCalculateWithHeightIcon();
    };
  }
}

 ngOnChanges(changes: SimpleChanges): void {
  this.reCalculateWithHeightIcon();
}



 @HostListener('window:resize', ['$event'])
 onResize() {
   this.reCalculateWithHeightIcon();
 }


 // Recalculates the icon dimensions based on the image dimensions and icon Base dimension
  // Updates the table of annotations with the recalculated dimensions
 reCalculateWithHeightIcon() {
  this.annotations = this.annotations?.map((item) => {
    return {
      ...item,
      widthIcon: (this.image?.nativeElement.width * (this.iconBase?.width || 0) / (this.imageBase?.width ||0)),
      heightIcon: (this.image.nativeElement.height * (this.iconBase?.height ||0) / (this.imageBase?.height || 0))
    };
  });

 }
 //Add New Annotation to Image ref
 addAnnotation(event: MouseEvent) {

   //dimension of icon (comment ICON)
   this.xForIcon = ((event.offsetX * 100) / this.image.nativeElement.width) - 1;
   this.yForIcon = ((event.offsetY * 100) / this.image.nativeElement.height) - 2;

   //we don't need to stock this variables **?
   //this dimension for form coordinate (x,y)
   this.xForPop = this.xForIcon + 2;
   this.yForPop = this.yForIcon + 2;

   //show popup
   this.showForm = true;
   //false means this is the first comment added !
   this.addCommentStatus = false;

 }

 //add comment to exist annotation in image dimensions
 addCommentToExistAnnotation(annotation: DataAnnotation) {
   this.xForPop = (annotation?.x ?? 0)+2;
   this.yForPop = (annotation?.y ?? 0)+2;

   //update data annotation from arg to position form in his dimension X,Y
   this.annotation = annotation;
   //show popup
   this.showForm = true;
   //true means this is not the first comment added!
   this.addCommentStatus = true;
 }

 //action method output from popupForm
 onAddComment(event: { id: number, comment: CommentType }) {
   // Adds a comment to an annotation using the annotation service
   this.addComment.emit(event);
 }
 //cancel form output
 onCancelPopupForm() {
   this.showForm = false
 }

 //save Annotation
 onSaveAnnotation(annotation: DataAnnotation) {
   this.annotation = {
     ...annotation,
     x: this.xForIcon,
     y: this.yForIcon,
     numberOfComment: annotation.comment?.length,
     widthIcon: this.iconBase?.width,
     heightIcon: this.iconBase?.height
   };

   this.annotationSave.emit(this.annotation);
 }

 //show message in hover event
 onHoveredMessage(annotation: DataAnnotation) {
   this.hoverAnnotation = annotation;
 }

 //hidden message using leave mouse event
 onMouseLeave() {
   this.hoverAnnotation = null;
 }
 //using this for codition of ngIF to compare between to annotation
 onHoverIt(annotation: DataAnnotation) {
   return this.hoverAnnotation == annotation && !this.popFormShow
 }


}
