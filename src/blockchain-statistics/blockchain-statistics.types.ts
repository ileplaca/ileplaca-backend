export type InfoValue = {
  name: string
  value: number
}

export interface SalariesStats {
  amount: number
  first: number
  last: number
  speed_of_growth: number
  role: InfoValue[]
  experience: number
  employment_type: InfoValue[],
  operating_mode: InfoValue[],
  salary_currency: InfoValue[]
}

export interface SecretInfosStats {
  amount: number,
  price: number,
}