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
    { id: 1, name: '#F0B44D' },
    { id: 2, name: '#A38C65' },
    { id: 3, name: '#C96630' },
    { id: 4, name: '#D10D0D' },
    { id: 5, name: "#43A333" },
    { id: 6, name: "#B4E8AC" },
    { id: 7, name: "#21A1C4" },
    { id: 8, name: '#5DCFDE' },
    { id: 9, name: '#E6C285' }
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
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    if (this.addCommentStatus) {
      if (this.inputValue.trim() != "") {
        ok = true;
       
        this.addComment.emit({ id: this.annotation?.id || 0, comment: 
          {
            id:(this.annotation?.comment?.length || 0)+1,
            content:this.inputValue.trim(),
            role:"Tool Maker",
            date:formattedDateTime,
            user:"Jette Fenne"
        }  });
        this.cancelPopupForm();
      }
    } else {
      if (this.inputValue.trim() != "" && this.selectedColor?.name != "" && this.selectedColor) {
        this.save.emit({ colorOfIcon: (this.selectedColor?.name || ""), comment: [
          {
            id:1,
            content:this.inputValue.trim(),
            role:"Tool Maker",
            date:formattedDateTime,
            user:"Jette Fenne"
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
