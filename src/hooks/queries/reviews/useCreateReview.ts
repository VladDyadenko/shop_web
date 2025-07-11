import { reviewService } from "@/services/review.service"
import { IReviewInput } from "@/shared/types/review.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useCreateReview = (storeId:string) => {
    const params = useParams<{ id: string }>()
    
    const queryClient = useQueryClient()

    const {mutate:createReview, isPending: isLoadingCreate } = useMutation({
        mutationKey: ['create review'],
        mutationFn: (data: IReviewInput) => reviewService.create(data, storeId, params.id, ),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['product']
            })
            toast.success('Відгук створено')
        },
        onError() {
            toast.error('Помилка при створенні відгуку')
        }
    })

    return useMemo(
        ()=>({createReview, isLoadingCreate}),[createReview, isLoadingCreate]
    )
}