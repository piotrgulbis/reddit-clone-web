import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Layout variant='regular'>
        {!data ? (
          <div>loading...</div>
        ) : data.posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
