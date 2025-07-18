import { useParams } from "next/navigation"
import {  useMutation, useQueryClient } from '@tanstack/react-query';

import { colorService } from "@/services/color.service";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { IColorInput } from "@/shared/types/color.interface";

export const useUpdatecolor = () => {
    const params = useParams<{ colorId: string }>()
       
    const queryClient = useQueryClient()

    const { mutate:updateColor, isPending:isLoadingUpdate} = useMutation({
        mutationKey: ['update color'],
        mutationFn: (data: IColorInput) => colorService.update(params.colorId, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['get colors for store dashboard']
            })
            toast.success('Колір оновлений')

        },
        onError() {
            toast.error('Помилка при оновленні кольору')
        }
    })

    return useMemo(
        () => ({
            updateColor, isLoadingUpdate
        }),[updateColor, isLoadingUpdate]
    )
}