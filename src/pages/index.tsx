import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <Wrapper>
        Welcome to the jungle!
        {!data ? (
          <div>loading...</div>
        ) : data.posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
