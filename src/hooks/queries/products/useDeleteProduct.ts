import { useParams, useRouter } from "next/navigation"

import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { IProductInput } from "@/shared/types/product.interface";
import { productService } from "@/services/product.service";
import toast from "react-hot-toast";
import { STORE_URL } from "@/config/url.config";
import { useMemo } from "react";

export const useDeleteProduct = () => {
    const params = useParams<{ storeId: string; productId:string }>()
    const router = useRouter()
    
    const queryClient = useQueryClient()

    const { mutate:deleteProduct, isPending:isLoadingDelete} = useMutation({
        mutationKey: ['delete product'],
        mutationFn: () => productService.delete( params.productId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['get products for store dashboard']
            })
            toast.success('Товар видалений')
            router.push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error('Помилка при видаленні товару')
        }
    })

    return useMemo(
        () => ({
            deleteProduct, isLoadingDelete
        }),[deleteProduct, isLoadingDelete]
    )
}