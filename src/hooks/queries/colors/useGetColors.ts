import { colorService } from "@/services/color.service";
import { IColor } from "@/shared/types/color.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useGetColors = () => {
    const params = useParams<{ storeId: string }>()
    
    const {data:colors, isLoading} = useQuery({
        queryKey: ['get colors for store dashboard'],
        queryFn:()=>colorService.getByStoryId(params.storeId)
    })
    
    return useMemo(
            ()=> ({
                colors,
                isLoading
            }),[colors, isLoading]
        )
}