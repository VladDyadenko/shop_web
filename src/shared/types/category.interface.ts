export interface ICategory{
    id: string
    createdAt: string
    title: string
    description: string
    storedId: string
}

export interface IColorInput extends Pick<ICategory, 'title' | 'description'> { }