import { Skeleton, TableRowSkeleton } from "@repo/ui/components/skeleton";

export default function OnboardingPageLoader() {
  return (
    <div className="space-y-8 bg-white dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="flex space-x-4">
          <Skeleton className="h-20 flex-1 rounded-2xl" />
          <Skeleton className="h-20 flex-1 rounded-2xl" />
          <Skeleton className="h-20 flex-1 rounded-2xl" />
        </div>
      </div>

      <TableRowSkeleton rows={6} />
    </div>
  );
}
