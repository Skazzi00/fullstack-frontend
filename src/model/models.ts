export type Post = {
    id: number;
    title: string;
    content: string;
    author: User;
    upVotes: number;
    downVotes: number;
}

export type User = {
    id: number;
    username: string;
    token?: string,
    superuser: boolean;
}