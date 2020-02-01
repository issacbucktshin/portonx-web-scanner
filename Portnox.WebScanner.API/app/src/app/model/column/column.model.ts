import { ColumnType } from './column-type.enum';

export class ColumnModel{
    title:string;
    field:string;
    subfield?:string;
    type?:ColumnType
}