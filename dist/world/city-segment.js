"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class CitySegment extends segment_1.Segment {
    constructor() {
        super(...arguments);
        this.isCompletable = true;
    }
}
exports.CitySegment = CitySegment;
//# sourceMappingURL=city-segment.js.map