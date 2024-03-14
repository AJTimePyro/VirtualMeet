export interface UserStreamData {
    stream : MediaStream,
    username : string,
    streamID : string,
    mute? : boolean,
    videoOff? : boolean,
    self? : boolean
};