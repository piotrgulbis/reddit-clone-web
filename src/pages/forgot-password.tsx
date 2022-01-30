import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';

import { Box, Button, Link } from '@chakra-ui/react';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({ }) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => complete
          ? (
            <Box>
              <Box mb={2}>Password reset request sent.</Box>
              <NextLink href='/login'>
                <Link>Back to Login</Link>
              </NextLink>
            </Box>
          )
          : (
            <Form>
              <InputField name='email' label='Email' type='email' />
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                colorScheme='red'>Request new password</Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
