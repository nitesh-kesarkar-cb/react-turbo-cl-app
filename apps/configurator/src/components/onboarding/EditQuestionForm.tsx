import { OnboardingQuestion, QuestionType } from "@/types/OnboardingQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux"; // or context if you have one
import { z } from "zod";

// ✅ Zod schema
const QuestionSchema = z.object({
  question: z.string().min(5, "Question text is required"),
  category: z.string().min(1, "Category is required"),
  type: z.enum([
    "number",
    "single_choice",
    "multi_choice",
    "text",
    "date",
    "boolean",
  ]),
  required: z.boolean(),
});

type QuestionFormValues = z.infer<typeof QuestionSchema>;

function EditQuestionForm({
  question,
  open,
  onClose,
  onSave,
}: {
  question: OnboardingQuestion;
  open: boolean;
  onClose: () => void;
  onSave: (updated: OnboardingQuestion) => void;
}) {
  // categories from redux (or context / reducer)
  const { categories } = useSelector((state: any) => state.onboarding.stats);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: question.question,
      category: question.category,
      type: question.type as QuestionType,
      required: question.required,
    },
  });

  const submitHandler = (values: QuestionFormValues) => {
    onSave({ ...question, ...values });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Question Text
            </label>
            <Input {...register("question")} />
            {errors.question && (
              <p className="text-sm text-red-500">{errors.question.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              defaultValue={question.category}
              onValueChange={(val) => setValue("category", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat: string) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Question Type */}
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">
              Question Type
            </label>
            <Select
              defaultValue={question.type}
              onValueChange={(val) =>
                setValue("type", val as QuestionFormValues["type"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="single_choice">Single Choice</SelectItem>
                <SelectItem value="multi_choice">Multi Choice</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Required */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={!!question.required}
              onCheckedChange={(checked) =>
                setValue("required", Boolean(checked))
              }
            />
            <label className="text-sm font-medium">Required Question</label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Question</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditQuestionForm;
