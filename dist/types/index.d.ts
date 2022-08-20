export interface listType {
    type: string;
    link: string;
    title: string;
}
export interface BreadCumbType {
    title: string;
    link: string;
}
export interface CreateType {
    name: string;
    type: 'FILE' | 'FOLDER';
    location: string;
    file: File | string;
}
