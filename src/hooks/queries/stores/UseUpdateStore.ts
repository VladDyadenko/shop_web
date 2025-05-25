import { STORE_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { iStoreEdit } from "@/shared/types/store.interface";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useUpdateStore() {
    const params = useParams<{ storeId: string }>()

    const queryClient= useQueryClient()
    
    const { data: store } = useQuery({
        queryKey: ['store', params.storeId],
        queryFn:()=>storeService.getById(params.storeId)
    })

    const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
        mutationKey: ['update store'],
        mutationFn: (data: iStoreEdit) => storeService.update(params.storeId, data),
        onSuccess() {
            queryClient.invalidateQueries({
         queryKey:['profile']
            })
            toast.success('Дані магазину змінені')
                },
        onError() {
            toast.error('Помилка при зміні даних')
        }
    })

    return useMemo(()=>({store,updateStore, isLoadingUpdate}),[store,updateStore, isLoadingUpdate])
}