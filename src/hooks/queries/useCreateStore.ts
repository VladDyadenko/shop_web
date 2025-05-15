import { STORE_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { IStoreCreate } from "@/shared/types/store.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";


export function useCreateStore() {
    const router = useRouter()

    const { mutate:createStore, isPending:isLoadingCreate} = useMutation({
        mutationKey: ['create store'],
        mutationFn: (data: IStoreCreate) => storeService.create(data),
        onSuccess(store) {
            toast.success('Магазин створено')
            router.push(STORE_URL.home(store.id))
        },
        onError() {
            toast.error('Помилка при створенні магазину')
        }
    })

    return useMemo(() => ({
        createStore, isLoadingCreate
    }),[createStore, isLoadingCreate])
}