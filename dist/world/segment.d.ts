export declare abstract class Segment {
    readonly id: string;
    constructor(id: string);
    abstract readonly isCompletable: boolean;
}
