import NextLink from 'next/link';
import React from 'react';

import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';

import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (fetching) {

  } else if (!data?.me) {
    body = (
      <Flex alignItems='center'>
        <NextLink href='/login'>
          <Link color='white' mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white'>Register</Link>
        </NextLink>
      </Flex>
    )
  } else {
    body = (
      <Flex alignItems='center'>
        <Button mr={4} variant='link' color='white'>{data.me.username}</Button>
        <Button
          onClick={() => { logout(); }}
          isLoading={logoutFetching}
          variant='link' color='white'>logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg='black' alignItems='center' p={4} position='sticky'>
      <NextLink href='/'>
        <Link color='white' fontWeight={500} mr={2}>reddit-clone</Link>
      </NextLink>
      <Spacer />
      <Box>
        {body}
      </Box>
    </Flex>
  );
};
