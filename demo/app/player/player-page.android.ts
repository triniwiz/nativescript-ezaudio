var frameModule = require("ui/frame");
import {AudioPlayerDemo} from "./player-view-model";

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = new AudioPlayerDemo(page);
}
exports.pageLoaded = pageLoaded;