export interface IStore{
    id:string
    title: string 
    description: string
}

export interface IStoreCreate extends Pick<IStore, 'title'> { }

export interface iStoreEdit extends Omit<IStore, 'id'> { }