export interface CreateProduct{
    name:string,
    category:string,
    description:string,
    price?:number;
    installment?:number;
    file?:File;
}