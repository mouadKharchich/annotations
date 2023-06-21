import { CommentType } from "./comment.model";

export interface DataAnnotation{
    id?:number,
    colorOfIcon:string,
    comment?:CommentType[],
    x?:number,
    y?:number,
    numberOfComment?:number,
    widthIcon?:number,
    heightIcon?:number
}