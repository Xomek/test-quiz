import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import type { MultiChoiceQuestionProps } from "../types/MultiChoiceQuestion.types";

const MultiChoiceQuestion: React.FC<MultiChoiceQuestionProps> = ({
  questionId,
  question,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <h3>{question}</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {options.map((option, index) => (
            <Controller
              key={index}
              name={`question_${questionId}_${index}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox {...field} checked={field.value} color="error" />
                  }
                  label={option}
                />
              )}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default MultiChoiceQuestion;
