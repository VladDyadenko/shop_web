import { STORE_URL } from "@/config/url.config"
import { categoryService } from "@/services/category.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useDeleteCategory = () => {
    const params = useParams<{ storeId: string, categoryId: string }>()
    const router = useRouter()
    const queryClient = useQueryClient()
    
    const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['category delete'],
        mutationFn: () => categoryService.delete(params.categoryId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get category for store dashboard']
            })
            toast.success('Кольор видалений')
            router.push(STORE_URL.categories(params.storeId))

        },
        onError() {
            toast.error('Помилка при видаленні кольору')
        }
    })

    return useMemo(
        () => ({
            deleteCategory, isLoadingDelete
        }),[deleteCategory, isLoadingDelete]
    )
} 