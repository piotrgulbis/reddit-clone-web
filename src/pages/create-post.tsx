import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
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
            <InputField name='title' label='Title' />
            <Box mt={4}>
              <InputField name='content' label='Content' />
            </Box>
            <Button mt={8} type='submit' isLoading={isSubmitting} colorScheme='blue'>Create Post</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreatePost;
