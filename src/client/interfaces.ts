

export interface IVideo {
    url: string
}

export interface IVideoService {
    getAll();
}

export interface IVideo {
    description: string;
    id: string;
    title: string;
}

export interface IThumbnail {
    height: number;
    url: string;
    width: number;
}

export interface IPlaylist {
    id: string;
    title: string;
    description: string;
    
    thumbnail: IThumbnail;
    videos: IVideo[];
}

export interface IChannel {
    id: string;
    name: string;
    description: string;
    title: string;
    
    playlists: IPlaylist[];
    videos: IVideo[];
}