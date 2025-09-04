export interface Question {
  id: number;
  question: string;
  category: string;
  type: string;
  required: boolean;
  selected: boolean;
}
