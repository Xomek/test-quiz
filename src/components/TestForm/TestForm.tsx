import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { setAnswer, nextStep } from "../../store/testSlice";
import MultiChoiceQuestion from "../MultiChoiseQuestion";
import { ProgressBar } from "../ProgressBar";
import SingleChoiceQuestion from "../SingleChoiseQuestion";

import type { RootState } from "../../store";
import "./TestForm.css";

const TestForm: React.FC = () => {
  const dispatch = useDispatch();
  const { currentStep, answers } = useSelector(
    (state: RootState) => state.test
  );
  const methods = useForm();

  const questions = [
    {
      id: 1,
      type: "single-choice",
      question: "Почему программирование?",
      options: ["Творчество", "Общение", "Развитие"],
    },
    {
      id: 2,
      type: "single-choice",
      question: "Зачем проходить тестовые разработчику?",
      options: ["Весело", "Показать навыки", "Прикольно", "Просто так"],
    },
    {
      id: 3,
      type: "multi-choice",
      question: "Кандидат подходит?",
      options: ["Да", "Да", "Да", "Да"],
    },

    {
      id: 4,
      type: "multi-choice",
      question: "Кандидат подходит?",
      options: ["Да", "Да", "Да", "Да"],
    },
  ];

  const timeLimit = 300;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    answers.forEach((answer) => {
      if (Array.isArray(answer.answer)) {
        answer.answer.forEach((value, index) => {
          methods.setValue(`question_${answer.questionId}_${index}`, value);
        });
      } else {
        methods.setValue(`question_${answer.questionId}`, answer.answer);
      }
    });

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          console.log("Time is up!");
          setIsTestCompleted(true);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, methods]);

  const handleNext = methods.handleSubmit((data) => {
    const currentQuestion = questions[currentStep];
    let answer;

    if (currentQuestion.type === "multi-choice") {
      answer = currentQuestion.options.map(
        (_, index) => data[`question_${currentQuestion.id}_${index}`] || false
      );
    } else {
      answer = data[`question_${currentQuestion.id}`];
    }

    dispatch(setAnswer({ questionId: currentQuestion.id, answer }));

    methods.reset();

    if (currentStep < questions.length - 1) {
      dispatch(nextStep());
    } else {
      setIsTestCompleted(true);
      console.log("Test completed");
    }
  });

  if (isTestCompleted) {
    return (
      <div className="test-form-container">
        <h2 className="test-form-header">Тест пройден</h2>
        <p>Спасибо за прохождение теста</p>
      </div>
    );
  }

  if (currentStep >= questions.length) {
    return <div>Test completed</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="test-form-container">
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          className="test-form-header"
        >
          <Typography fontWeight={700} variant="h5">
            Тестирование:
          </Typography>
          <div>
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </div>
        </Stack>
        <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
        <form onSubmit={handleNext} className="test-form">
          {questions[currentStep].type === "single-choice" && (
            <SingleChoiceQuestion
              questionId={questions[currentStep].id}
              question={questions[currentStep].question}
              options={questions[currentStep].options}
            />
          )}
          {questions[currentStep].type === "multi-choice" && (
            <MultiChoiceQuestion
              questionId={questions[currentStep].id}
              question={questions[currentStep].question}
              options={questions[currentStep].options}
            />
          )}
          <div className="test-form-footer">
            <Button variant="contained" color="error" type="submit">
              {currentStep === questions.length - 1 ? "Отправить" : "Ответить"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default TestForm;
