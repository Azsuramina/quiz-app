const quizzes = [
  {
    id: 1,
    title: "Main Quiz",
    questions: [
      {
        id: 1,
        question: "What are you looking for?",
        type: "multiple-choice",
        options: ["THC Products", "Art Supplies", "Something Else"],
      },
    ],
  },
  {
    id: 2,
    title: "THC Products Quiz",
    questions: [
      {
        id: 1,
        question: "What type of THC product are you interested in?",
        type: "multiple-choice",
        options: ["Edibles", "Vapes", "Oils", "Other"],
      },
      // Add more questions here
    ],
  },
  {
    id: 3,
    title: "Art Supplies Quiz",
    questions: [
      {
        id: 1,
        question: "What type of art supplies are you looking for?",
        type: "multiple-choice",
        options: ["Paints", "Brushes", "Canvas", "Other"],
      },
      // Add more questions here
    ],
  },
  {
    id: 4,
    title: "Something Else Quiz",
    questions: [
      {
        id: 1,
        question: "Please specify what you are looking for.",
        type: "text",
      },
      // Add more questions here
    ],
  },
];

export default quizzes;
