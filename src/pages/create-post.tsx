import { Form, Formik } from 'formik';
import React from 'react';

import { Box, Button } from '@chakra-ui/react';

import { InputField } from '../components/InputField';
import { TextareaField } from '../components/TextareaField';
import { Wrapper } from '../components/Wrapper';

const CreatePost: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name='title' label='Title' />
            </Box>
            <Box mt={4}>
              <TextareaField name='content' label='Content' />
            </Box>
            <Button mt={8} type='submit' isLoading={isSubmitting} colorScheme='blue'>Create Post</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
