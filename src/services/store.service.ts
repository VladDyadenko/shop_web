import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IStore, IStoreCreate, iStoreEdit } from "@/shared/types/store.interface";

class StoreService{

    async getById(id: string) {
        const { data } = await axiosWithAuth<IStore>({
            url: API_URL.stores(`/by-id/${id}`),
            method: 'GET'
        })

        return data
    }

     async create(data:IStoreCreate) {
            const { data:createdStore } = await axiosWithAuth<IStore> ({
                url: API_URL.stores(),
                method: 'POST',
                data
            })
            
            return createdStore
        }
        
        async update(id: string, data: iStoreEdit) {
            const { data: updateStore } = await axiosWithAuth<IStore>({
                url: API_URL.stores(`/${id}`),
                method: 'PUT',
                data
            })
    
            return updateStore
    
        }
    
        async delete(id: string){
            const { data: deleteStore } = await axiosWithAuth<IStore>({
                url: API_URL.stores(`/${id}`),
                method:'DELETE'
            })
            
            return deleteStore
        }
}

export const storeService= new StoreService()