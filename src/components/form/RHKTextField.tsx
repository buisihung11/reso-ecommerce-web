import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = Partial<TextFieldProps> & {
  control: Control<any>;
  name: string;
  label: string;
};

const RHKTextField = ({ name, control, label, ...props }: Props) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...(props || {})}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error && fieldState.error.message}
          label={label}
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default RHKTextField;
