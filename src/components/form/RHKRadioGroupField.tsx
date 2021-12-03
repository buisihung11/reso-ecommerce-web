import {
  FormControlLabel,
  Radio,
  RadioGroupProps,
  RadioGroup,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type Props = Partial<RadioGroupProps> & {
  control: Control<any>;
  name: string;
  label: string;
  options: {
    label: any;
    value: any;
  }[];
};

const RHKRadioGroupField: React.FC<Props> = ({
  name,
  control,
  label,
  options,
  ...props
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={Boolean(fieldState.error)}>
          <RadioGroup {...field} {...(props || {})}>
            {generateRadioOptions()}
            <FormHelperText>
              {fieldState.error && fieldState.error.message}
            </FormHelperText>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default RHKRadioGroupField;
