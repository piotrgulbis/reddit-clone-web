import { useField } from 'formik';
import React, { TextareaHTMLAttributes } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export const TextareaField: React.FC<TextareaFieldProps> = ({label, ...props}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
