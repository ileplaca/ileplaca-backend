export type DateOfPostType = 'month' | 'year'
export enum DateOfPost {
  MONTH = 'month',
  YEAR = 'year'
}

export type BodyDate = {
  year: number,
  month: number,
  day: number
}