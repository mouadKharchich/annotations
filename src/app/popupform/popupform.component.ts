import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataAnnotation } from '../modules/annotation.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Color } from '../modules/color.model';
import { CommentType } from '../modules/comment.model';

@Component({
  selector: 'app-popupform',
  templateUrl: './popupform.component.html',
  styleUrls: ['./popupform.component.css']
})
export class PopupformComponent {

  //Inputs:
  @Input() x?: number;
  @Input() y?: number;
  @Input() annotation?: DataAnnotation;
  @Input() addCommentStatus?: boolean;

  //Variables:
  colors: Color[] = [
    { id: 1, name: '#C92910' },
    { id: 2, name: '#296DCC' },
    { id: 3, name: '#CC3ACF' },
    { id: 4, name: '#CF3A73' },
    { id: 5, name: "#3CBD28" },
    { id: 6, name: "#CC671B" },
    { id: 7, name: "#1BBDCC" },
    { id: 8, name: '#C92911' },
    { id: 9, name: '#296DCD' },
    { id: 10, name: '#CC3ACC' }
  ]
  selectedColor?: Color;
  inputValue: string = '';
  checkmarkIcon: SafeHtml = '';

  //OutPuts:
  @Output() cancel = new EventEmitter<void>();
  @Output() save: EventEmitter<DataAnnotation> = new EventEmitter<DataAnnotation>();
  @Output() addComment: EventEmitter<{ id: number, comment: CommentType}> = new EventEmitter<{ id: number, comment: CommentType }>();

  //constructor:
  constructor(private sanitizer: DomSanitizer) { }

  //methods:
  cancelPopupForm(): void {
    this.cancel.emit();
  }

  //ajouter check icon in center of comment icon
  emitColor(color: Color): void {
    this.selectedColor = color;
  }

  //save annotation(comment)
  saveAnnotation() {
    let ok = false;
    if (this.addCommentStatus) {
      if (this.inputValue.trim() != "") {
        ok = true;
       
        this.addComment.emit({ id: this.annotation?.id || 0, comment: 
          {
          id:(this.annotation?.comment?.length || 0)+1,
          content:this.inputValue.trim()
        }  });
        this.cancelPopupForm();
      }
    } else {
      if (this.inputValue.trim() != "" && this.selectedColor?.name != "" && this.selectedColor) {
        this.save.emit({ colorOfIcon: (this.selectedColor?.name || ""), comment: [
          {
            id:1,
            content:this.inputValue.trim()
          }
        ] });
        ok = true;
      }

      if (ok) {
        //clear input
        this.inputValue = '';
        //destroy/(change show state to false)
        this.cancelPopupForm();
        ok = false;
      }
    }

  }
}
