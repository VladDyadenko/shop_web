import { statisticsService } from "@/services/statistics.service"
import {  useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useGetStatistics = () => {
    const params = useParams<{storeId:string}>()
    
    const {data:main, isPending:isMainPending  } = useQuery({
        queryKey: ['get main statistics'], 
        queryFn:()=> statisticsService.getMain(params.storeId)
    })

    const {data:middle,isPending: isMiddlePending  } = useQuery({
        queryKey: ['get middle statistics'],
        queryFn:()=> statisticsService.getMiddle(params.storeId)
    })

    const isPending = isMainPending || isMiddlePending 

    return useMemo(()=>({main, middle, isPending}), [main,middle, isPending])
}