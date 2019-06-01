"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniqueBy(prop) {
    return (uniqueItems, item) => {
        if (uniqueItems.some(anItem => prop(anItem).equals(prop(item)))) {
            return uniqueItems.push(item);
        }
        else {
            return uniqueItems;
        }
    };
}
exports.uniqueBy = uniqueBy;
//# sourceMappingURL=collection-util.js.map