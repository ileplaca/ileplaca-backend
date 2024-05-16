"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertObjectIntoStats = void 0;
const insertObjectIntoStats = (statistic, value) => {
    const index = statistic.findIndex(stat => stat.name.toLocaleLowerCase() === value.toLocaleLowerCase());
    if (index === -1) {
        statistic.push({
            name: value,
            value: 1,
        });
    }
    else {
        statistic[index].value++;
    }
};
exports.insertObjectIntoStats = insertObjectIntoStats;
//# sourceMappingURL=blockchain-statistics.helpers.js.map