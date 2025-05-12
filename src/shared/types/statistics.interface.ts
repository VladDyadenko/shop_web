export interface IMainStatistics{
    id: string
    name: string
    value: number
}

export interface IMonyhlySales{
    date: string
    value: number
}

export interface ILastUsers{
    id: string
    name: string
    email: string
    picture: string
    total: number
}

export interface IMiddleStatistics { 
    monthlySales: IMonyhlySales[]
    lastUsers: ILastUsers[]
}
