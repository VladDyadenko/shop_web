export interface IColor{
    id: string
    createdAt: string
    name: string
    value: string
    storedId: string
}

export interface IColorInput extends Pick<IColor, 'name' | 'value'> { }