"use client";

import type React from "react";
import { useState } from "react";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import QuestionForm from "./QuestionForm";
import { questionsData } from "./data";
import { Question } from "./question.types";

const QuestionLibrary: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const selectedCount = questions.filter((q) => q.selected).length;
  const totalQuestions = questions.length;
  const categories = [...new Set(questions.map((q) => q.category))].length;

  const toggleSelection = (id: number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, selected: !q.selected } : q))
    );
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsFormOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: {
    question: string;
    category: string;
    type: string;
    required: boolean;
  }) => {
    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id ? { ...q, ...formData } : q
        )
      );
    } else {
      const newQuestion: Question = {
        id: Math.max(...questions.map((q) => q.id)) + 1,
        ...formData,
        selected: false,
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsFormOpen(false);
    setEditingQuestion(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingQuestion(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "number":
        return "bg-green-100 text-green-700";
      case "single choice":
        return "bg-red-100 text-red-700";
      case "multi choice":
        return "bg-purple-100 text-purple-700";
      case "text":
        return "bg-blue-100 text-blue-700";
      case "boolean":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Demographics":
        return "text-blue-600";
      case "Medical History":
        return "text-purple-600";
      case "Lifestyle":
        return "text-green-600";
      case "Fitness":
        return "text-orange-600";
      case "Mental Health":
        return "text-teal-600";
      case "Nutrition":
        return "text-indigo-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Systems Administration
        </h1>
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Enterprise</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Question Library Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Section Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Question Library
            </h2>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Selected</span>
                <span className="font-semibold text-gray-900">
                  {selectedCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Total Questions</span>
                <span className="font-semibold text-gray-900">
                  {totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Categories</span>
                <span className="font-semibold text-gray-900">
                  {categories}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              + Add Question
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Save & Configure
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Required
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <tr
                  key={question.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={question.selected}
                      onChange={() => toggleSelection(question.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                    {question.question}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${getCategoryColor(
                        question.category
                      )}`}
                    >
                      {question.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                        question.type
                      )}`}
                    >
                      {question.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        question.required ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {question.required ? "Required" : "Optional"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QuestionForm modal */}
      {isFormOpen && (
        <QuestionForm
          isOpen={isFormOpen}
          onClose={handleFormCancel}
          onSave={handleFormSubmit}
          question={
            editingQuestion
              ? {
                  question: editingQuestion.question,
                  category: editingQuestion.category,
                  type: editingQuestion.type,
                  required: editingQuestion.required,
                  selected: editingQuestion.selected,
                  id: editingQuestion.id,
                }
              : undefined
          }
          mode={editingQuestion ? "edit" : "create"}
        />
      )}
    </div>
  );
};

export default QuestionLibrary;
