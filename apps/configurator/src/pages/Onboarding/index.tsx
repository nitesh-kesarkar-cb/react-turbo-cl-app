import {
  useGetOnboardingQuestions,
  useGetOnboardingStats,
} from "@/api/query/onboarding";
import { EditQuestionForm, QuestionTable } from "@/components/onboarding";
import OnboardingPageLoader from "@/components/skeleton/OnboardingLoader";
import { OnboardingQuestion } from "@/types/OnboardingQuestion";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function QuestionLibrary() {
  const { isLoading: questionsLoading } = useGetOnboardingQuestions([]);
  const { isLoading: statsLoading } = useGetOnboardingStats();

  const { stats, questions: initial } = useSelector(
    (state: any) => state.onboarding
  );

  const [questions, setQuestions] = useState<OnboardingQuestion[]>(initial);
  const [editing, setEditing] = useState<OnboardingQuestion | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuestions(initial);
  }, [initial]);

  const handleEdit = (q: OnboardingQuestion) => {
    setEditing(q);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setEditing({
      id: crypto.randomUUID(),
      text: "",
      type: "text",
      category: "",
      required: false,
      question: "",
      order: 0,
      options: null,
    } as OnboardingQuestion);
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
    setIsOpen(false);
    setEditing(null);
  };

  console.log(initial);
  console.log("questions", questions);

  return statsLoading || questionsLoading ? (
    <div className="space-y-8 min-h-screen">
      <OnboardingPageLoader />
    </div>
  ) : (
    <div className="space-y-8 min-h-screen">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Question Library</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              + Add Question
            </Button>
            <Button>Save & Configure</Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-gray-500 text-sm">Selected</p>
              <p className="text-lg font-semibold">0</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-lg font-semibold">
                {stats?.categories.length}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-gray-500 text-sm">Total Questions</p>
              <p className="text-lg font-semibold">{stats?.total_questions}</p>
            </Card>
          </div>
          <div className="mt-4">
            <QuestionTable
              questions={questions}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </CardContent>
      </Card>

      {editing && (
        <EditQuestionForm
          question={editing}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
