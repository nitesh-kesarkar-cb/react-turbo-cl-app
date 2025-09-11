import { Skeleton, TableRowSkeleton } from "@repo/ui/components/skeleton";

export default function ScoreEnginePageLoader() {
    return (
        <div className="space-y-8 bg-white p-4">
            <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="flex space-x-4">
                    <Skeleton className="h-20 flex-1 rounded-2xl" />
                    <Skeleton className="h-20 flex-1 rounded-2xl" />
                    <Skeleton className="h-20 flex-1 rounded-2xl" />
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-32" />
                    ))}
                </div>
            </div>
            
            <TableRowSkeleton rows={6} />
        </div>
    )
}