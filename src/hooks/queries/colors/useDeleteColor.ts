import { STORE_URL } from "@/config/url.config"
import { colorService } from "@/services/color.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useDeleteColor = () => {
    const params = useParams<{ storeId: string, colorId: string }>()
    const router = useRouter()
    const queryClient = useQueryClient()
    
    const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['color delete'],
        mutationFn: () => colorService.delete(params.colorId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get color for store dashboard']
            })
            toast.success('Кольор видалений')
            router.push(STORE_URL.colors(params.storeId))

        },
        onError() {
            toast.error('Помилка при видаленні кольору')
        }
    })

    return useMemo(
        () => ({
            deleteColor, isLoadingDelete
        }),[deleteColor, isLoadingDelete]
    )
} 