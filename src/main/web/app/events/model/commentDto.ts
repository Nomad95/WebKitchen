export class CommentDTO {
    id: number;
    user: any;
    text: string;
    ratingId: number;

    constructor() {
        this.id = -1;
        this.user = {
            id: -1,
            nickname: ''
        };
        this.text = '';
        this.ratingId = 0;
    }
}