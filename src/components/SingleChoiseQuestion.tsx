import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface SingleChoiceQuestionProps {
  questionId: number;
  question: string;
  options: string[];
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  questionId,
  question,
  options,
}) => {
  const { control, watch } = useFormContext();
  const watchedValue = watch(`question_${questionId}`, "");

  return (
    <div>
      <h3>{question}</h3>
      <Controller
        name={`question_${questionId}`}
        control={control}
        defaultValue={watchedValue}
        render={({ field }) => (
          <RadioGroup {...field} value={field.value || ""}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio color="error" />}
                label={option}
              />
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default SingleChoiceQuestion;
