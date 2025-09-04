import type React from "react";
import { useState, useEffect } from "react";
import { Question } from "./question.types";
import { categories, questionTypes } from "./data";

type questionType = Omit<Question, "id">;

interface QuestionFormProps {
  question?: Question;
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: questionType) => void;
  mode?: "create" | "edit";
}

export default function QuestionForm({
  question,
  isOpen,
  onClose,
  onSave,
  mode = "create",
}: QuestionFormProps) {
  const [formData, setFormData] = useState<questionType>({
    question: "",
    category: "",
    type: "",
    required: false,
    selected: false,
  });

  useEffect(() => {
    if (question && mode === "edit") {
      setFormData({
        question: question.question,
        category: question.category,
        type: question.type,
        required: question.required,
        selected: question.selected,
      });
    } else {
      setFormData({
        question: "",
        category: "",
        type: "",
        required: false,
        selected: false,
      });
    }
  }, [question, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.question.trim() && formData.category && formData.type) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      question: "",
      category: "",
      type: "",
      required: false,
      selected: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {mode === "edit" ? "Edit Question" : "Add New Question"}
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <label
              htmlFor="questionText"
              className="block text-md font-medium text-gray-700 mb-3"
            >
              Question Text
            </label>
            <textarea
              id="questionText"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="Enter your question here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-md font-medium text-gray-700 mb-3"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white appearance-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Question Type */}
          <div className="mb-8">
            <label
              htmlFor="questionType"
              className="block text-md font-medium text-gray-700 mb-3"
            >
              Question Type
            </label>
            <div className="relative">
              <select
                id="questionType"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white appearance-none"
                required
              >
                <option value="">Select Type</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Required Question Checkbox */}
          <div className="flex items-center justify-start mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.required}
                onChange={(e) =>
                  setFormData({ ...formData, required: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-3"
              />
              <span className="text-md font-medium text-gray-700">
                Required Question
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {mode === "edit" ? "Update Question" : "Save Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
