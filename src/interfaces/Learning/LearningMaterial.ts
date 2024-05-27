export interface LearningMaterial {
    id: number;
    displayName: string;
    linkDownload: string;
    createdDate: Date;
    type: string;
    author: string;
    fileSize: number;
    description: string;
    uploadDate: Date;
}