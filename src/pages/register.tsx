import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Button } from '@chakra-ui/react';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql'; // without codegen plugin, useMutation
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [, register] = useRegisterMutation(); // graphql codegen plugin created this hook
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='username' label='Username' />
            <Box mt={4}>
              <InputField type='email' name='email' label='Email' />
            </Box>
            <Box mt={4}>
              <InputField type='password' name='password' label='Password' />
            </Box>
            <Button mt={8} type='submit' isLoading={isSubmitting} colorScheme='teal'>register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
