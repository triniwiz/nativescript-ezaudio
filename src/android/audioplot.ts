import {ContentView} from "ui/content-view";
import {Color} from "color";
import {Property, PropertyMetadataSettings, PropertyChangeData} from "ui/core/dependency-observable";
import {PropertyMetadata} from "ui/core/proxy";

function onBufferDataPropertyChanged(data: PropertyChangeData) {
    let buff = <AudioPlot>data.object;
    if (!buff.android) {
        return
    }
    buff.bufferData(data.newValue ? data.newValue.android : null)
}

(<PropertyMetadata>AudioPlot.bufferDataProperty.metadata).onSetNativeValue = onBufferDataPropertyChanged;

export class AudioPlot extends ContentView {
    public static bufferDataProperty = new Property("bufferData", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static maxVolumeProperty = new Property("maxVolume", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static bgColorProperty = new Property("bgColor", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static sampleRateProperty = new Property("sampleRate", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static numChannelsProperty = new Property("numChannels", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));
    public static bitPerSampleProperty = new Property("bitPerSample", "AudioPlot", new PropertyMetadata(undefined, PropertyMetadataSettings.None));

    private _android: android.opengl.GLSurfaceView;
    private _horizon: com.yalantis.waves.util.Horizon;
    constructor() {
        super();
    }

    get android() {
        return this._android;
    }

    get sampleRate() {
        return this._getValue(AudioPlot.sampleRateProperty);
    }
    set sampleRate(value: any) {
        this._setValue(AudioPlot.sampleRateProperty, value);
    }
    get numChannels() {
        return this._getValue(AudioPlot.numChannelsProperty);
    }
    set numChannels(value: any) {
        this._setValue(AudioPlot.numChannelsProperty, value)
    }
    get bitPerSample() {
        return this._getValue(AudioPlot.bitPerSampleProperty);
    }
    set bitPerSample(value: any) {
        this._setValue(AudioPlot.bitPerSampleProperty, value);
    }
    get bgColor() {
        return this._getValue(AudioPlot.bgColorProperty);
    }
    set bgColor(value: string) {
        const bg = new Color(value).android;
        this._setValue(AudioPlot.bgColorProperty, bg);
    }
    get bufferData() {
        return this._getValue(AudioPlot.bufferDataProperty);
    }
    set bufferData(value: any) {
        this._setValue(AudioPlot.bufferDataProperty, value);
        this._horizon.updateView(value);
    }
    get maxVolume() {
        return this._getValue(AudioPlot.maxVolumeProperty);
    }
    set maxVolume(value: number) {
        this._setValue(AudioPlot.maxVolumeProperty, value);
    }
    _createUI() {
        this._android = new android.opengl.GLSurfaceView(this._context);
        this._horizon = new com.yalantis.waves.util.Horizon(this._android, this.bgColor, this.sampleRate, this.numChannels, this.bitPerSample)
    }
}