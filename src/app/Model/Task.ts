export class Task{
    constructor(public title : string,
        public desc: string,
        public assingedTo:string,
        public createAt:string,
        public priority : string,
        public status : string,
        public id? : string
    ){}
}