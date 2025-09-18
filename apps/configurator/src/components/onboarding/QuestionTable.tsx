import { OnboardingQuestion } from "@/types/OnboardingQuestion";
import { Badge } from "@repo/ui/components/badge";
import { Checkbox } from "@repo/ui/components/checkbox";
import { DataTable } from "@repo/ui/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

const getQuestionColumns = (
  onEdit: (q: OnboardingQuestion) => void,
  onDelete: (id: string) => void
): ColumnDef<OnboardingQuestion>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox aria-label="Select all" className="dark:border-gray-300" />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
        className="dark:border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question",
    header: "Question",
    size: 280,
    cell: ({ row }) => (
      <span className="font-medium max-w-[260px] whitespace-normal break-words block">
        {row.original.question}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-gray-50 text-gray-700">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      const typeColor: Record<string, string> = {
        number: "bg-green-50 text-green-700 border-green-200",
        single_choice: "bg-red-50 text-red-700 border-red-200",
        multi_choice: "bg-pink-50 text-pink-700 border-pink-200",
        text: "bg-blue-50 text-blue-700 border-blue-200",
      };

      return (
        <Badge
          variant="outline"
          className={
            typeColor[type] || "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "required",
    header: "Required",
    cell: ({ row }) =>
      row.original.required ? (
        <span className="text-red-600 font-semibold">Required</span>
      ) : (
        <span className="text-gray-500">Optional</span>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-3 text-gray-400">
        <Pencil
          className="h-4 w-4 cursor-pointer hover:text-blue-600"
          onClick={() => onEdit(row.original)}
        />
        <Trash
          className="h-4 w-4 cursor-pointer text-red-300 hover:text-red-600"
          onClick={() => onDelete(row.original.id)}
        />
      </div>
    ),
  },
];

const QuestionTable = ({
  questions,
  handleDelete,
  handleEdit,
}: {
  questions: OnboardingQuestion[];
  handleEdit: (q: OnboardingQuestion) => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <DataTable
        columns={getQuestionColumns(handleEdit, handleDelete)}
        data={questions}
        className="border rounded-md shadow-sm [&_tr]:border-b [&_td]:py-3"
      />
    </div>
  );
};

export default QuestionTable;
