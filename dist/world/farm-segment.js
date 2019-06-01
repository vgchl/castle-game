"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class FarmSegment extends segment_1.Segment {
    constructor() {
        super(...arguments);
        this.isCompletable = false;
    }
}
exports.FarmSegment = FarmSegment;
//# sourceMappingURL=farm-segment.js.map