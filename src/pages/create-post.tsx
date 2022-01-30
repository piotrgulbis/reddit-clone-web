import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Button } from '@chakra-ui/react';

import { InputField } from '../components/InputField';
import { TextareaField } from '../components/TextareaField';
import { useCreatePostMutation } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';

const CreatePost: React.FC<{}> = ({ }) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values) => {
          await createPost({ input: values });
          router.push('/');
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
