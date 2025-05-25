import { STORE_URL } from "@/config/url.config"
import { categoryService } from "@/services/category.service"
import { ICategoryInput } from "@/shared/types/category.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useUpdateCategory = () => {
    const params = useParams<{ storeId: string }>()

    const queryClient = useQueryClient()

    const {mutate:updateCategory, isPending:isLoadingUpdate } = useMutation({
        mutationKey: ['update category'],
        mutationFn: (data: ICategoryInput) => categoryService.update(params.storeId,data),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['get category for store dashboard'] })
            toast.success('Категорія успішно змінена')
           },
        onError() {
            toast.error('Помилка при зміні категорії')
        }
    })

    return useMemo(
        () => ({
            updateCategory, isLoadingUpdate
        }),[updateCategory,isLoadingUpdate]
    )
}