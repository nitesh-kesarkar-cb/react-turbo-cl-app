import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"

import { useOnboardingQuestions, useOnboardingStats } from "@/store/query/onboardingQuery"
import OnboardingPageLoader from "@/components/skeleton/OnboardingLoader"
import { useSelector } from "react-redux"
import { QuestionTable } from "./_components/QuestionTable"

export default function QuestionLibrary() {
  const { isLoading: questionsLoading, } = useOnboardingQuestions([])
  const { isLoading: statsLoading } = useOnboardingStats()

  const { stats, questions } = useSelector((state: any) => state.onboarding);



  return (
    statsLoading || questionsLoading ? (
      <div className="space-y-8 min-h-screen">
        <OnboardingPageLoader />

        {statsLoading || questionsLoading ? (
          <div className="space-y-8 min-h-screen">
            <OnboardingPageLoader />
          </div>
        ) : null}


      </div>
    ) :
      <div className="space-y-8 min-h-screen">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Question Library</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">+ Add Question</Button>
              <Button>Save & Configure</Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-gray-500 text-sm">Selected</p>
                <p className="text-lg font-semibold">0</p>
              </Card>
              <Card className="p-4 text-center bg-">
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-lg font-semibold">{stats?.categories.length}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 text-sm">Total Questions</p>
                <p className="text-lg font-semibold">{stats?.total_questions}</p>
              </Card>
            </div>
            <div className="mt-4"> <QuestionTable questions={questions} /></div>

          </CardContent>


        </Card>

      </div>)
}
