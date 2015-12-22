import "reflect-metadata";
import "es6-shim";
import {VideoList} from './videoList';
import {IVideo, IVideoService} from "./interfaces";

const FAKE_VIDEOS = [
    {url: 'foo'},
    {url: 'bar'}
];

describe('VideoList', () => {

    beforeEach(() => {
        this.fakeVideoService = jasmine.createSpyObj('VideoService', ['getAll'])
        this.fakeVideoService.getAll.and.returnValue({
            subscribe: (cb => cb(FAKE_VIDEOS))
        });
    });

    it('initialize the videos with an empty array', () => {
        var videoList = new VideoList(this.fakeVideoService);
        expect(videoList.videos).toEqual(FAKE_VIDEOS);
    });

    it('loads all videos on starts', () => {
        new VideoList(this.fakeVideoService);

        expect(this.fakeVideoService.getAll).toHaveBeenCalled();
    });
});

