import {Observable} from 'data/observable';
import placeholder = require("ui/placeholder");
import {topmost} from 'ui/frame';
import {Color} from "color";
var _ = require('lodash');
import {TNSRecorder, TNSPlayer} from 'nativescript-audio';
export class AudioPlayerDemo extends Observable {
    bufferData;
    bitPerSample;
    sampleRate;
    numChannels;
    constructor() {
        super();
    }
}