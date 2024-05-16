import { InfoValue } from "./blockchain-statistics.types";

export const insertObjectIntoStats = (statistic: InfoValue[], value: string) => {
  const index = statistic.findIndex(stat => stat.name.toLocaleLowerCase() === value.toLocaleLowerCase())
  if (index === -1) {
    statistic.push({
      name: value,
      value: 1,
    })
  } else {
    statistic[index].value++;
  }
}