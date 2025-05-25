import { categoryService } from "@/services/category.service";
import { ICategory } from "@/shared/types/category.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useGetCategories = () => {
    const params = useParams<{ storeId: string }>()
     
    const {data:categories , isLoading} = useQuery({
        queryKey: ['get categories for store dashboard'],
        queryFn:()=>categoryService.getByStoryId(params.storeId)
    })
    
    return useMemo(
            ()=> ({
                categories,
                isLoading
            }),[categories, isLoading]
        )
}