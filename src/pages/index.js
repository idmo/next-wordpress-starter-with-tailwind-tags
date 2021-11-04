import Link from 'next/link';
import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';

export default function Home({ posts }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header>
        <div>
          <Link href="/">
            <a>
              <h1>{title}</h1>
            </a>
          </Link>
          <p>{description}</p>
        </div>
      </Header>
      <div>
        <Section>
          <Container>
            <h2>from the blog...</h2>

            {posts.map((post, i) => {
              return (
                <div key={post.slug}>
                  <div>{post.categories && post.categories[0].name}</div>
                  <div>{post.title}</div>
                  <Link href={`/blog/${post.slug}`} key={i}>
                    <a>Read More &rarr;</a>
                  </Link>
                </div>
              );
            })}

            <Link href="/blog">
              <a>Read More from the Blog &rarr;</a>
            </Link>
          </Container>
        </Section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts();
  return {
    props: {
      posts: posts.slice(0, 3),
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
