import { DataAnnotation } from "./annotation.model";

export interface DataType{
    id:number,
    image:string,
    annotations:DataAnnotation[]
}