"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class RoadSegment extends segment_1.Segment {
    constructor() {
        super(...arguments);
        this.isCompletable = true;
    }
}
exports.RoadSegment = RoadSegment;
//# sourceMappingURL=road-segment.js.map