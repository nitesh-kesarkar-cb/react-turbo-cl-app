"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Badge } from "@repo/ui/components/badge";
import { DataTable } from "@repo/ui/components/data-table";
import { Pencil, Trash } from "lucide-react";
import { OnboardingQuestion } from "@/types/OnboardingQuestion";
import { EditQuestionForm } from "./EditQuestionForm";

const getQuestionColumns = (
    onEdit: (q: OnboardingQuestion) => void,
    onDelete: (id: string) => void
): ColumnDef<OnboardingQuestion>[] => [
        {
            id: "select",
            header: () => <Checkbox aria-label="Select all" />,
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(val) => row.toggleSelected(!!val)}
                    aria-label="Select row"
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
                <span className="font-medium text-gray-900 max-w-[260px] whitespace-normal break-words block">
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

export const QuestionTable = ({ questions: initial }: { questions: OnboardingQuestion[] }) => {
    const [questions, setQuestions] = useState<OnboardingQuestion[]>(initial);
    const [editing, setEditing] = useState<OnboardingQuestion | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = (q: OnboardingQuestion) => {
        setEditing(q);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const handleSave = (updated: OnboardingQuestion) => {
        setQuestions((prev) => {
            const exists = prev.find((q) => q.id === updated.id);
            if (exists) {
                return prev.map((q) => (q.id === updated.id ? updated : q));
            }
            return [...prev, updated];
        });
    };

    return (
        <div className="space-y-4">

            <DataTable
                columns={getQuestionColumns(handleEdit, handleDelete)}
                data={questions}
                className="border rounded-md shadow-sm [&_tr]:border-b [&_td]:py-3"
            />
            {editing && (
                <EditQuestionForm
                    question={editing}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
