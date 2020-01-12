export default class Cook {
    id?: number;
    title: string;
    description: string;
    createdAt?: Date;
    parentId?: number;
    nodeChilds?: Array<Object>;
}