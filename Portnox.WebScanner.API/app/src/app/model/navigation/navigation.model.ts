export class NavigationModel{
    label:string;
    link?:string;
    externalRedirect?:boolean;
    icon?:string;
    //for case we want to use font awesome icons
    faIcon?:string;
    hidden?:boolean;
    items?:NavigationModel[]; 
}