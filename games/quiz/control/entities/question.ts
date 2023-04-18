interface Question {
  id: number;
  question: string;
  description: string;
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e: string | null;
    answer_f: string | null;
  };
  multiple_correct_answers: boolean;
  correct_answers: {
    answer_a_correct: boolean;
    answer_b_correct: boolean;
    answer_c_correct: boolean;
    answer_d_correct: boolean;
    answer_e_correct: boolean;
    answer_f_correct: boolean;
  };
  explanation: string;
  tip: string | null;
  tags: Array<string>;
  category: string;
  difficulty: string;
}
