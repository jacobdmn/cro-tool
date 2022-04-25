export interface QuizType {
  id: string
  title: string
  questions: {
    questionTitle: string
    options: string[]
  }[]
}
