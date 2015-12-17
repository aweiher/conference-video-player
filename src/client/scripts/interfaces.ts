
export interface IVideo {
    url: string
}

export interface IVideoService {
    getAll(): IVideo[];
}