import Link from 'next/link';
import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Logo from 'components/Logo/Logo';

export default function Home({ posts }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header>
        <Container>
          <Link href="/">
            <a>
              <h1>
                <Logo>{title}</Logo>
              </h1>
            </a>
          </Link>
          <p>{description}</p>
        </Container>
      </Header>
      <div>
        <Section>
          <Container>
            <div className="py-6">
              <h4>from the blog...</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {posts.map(({ title, categories, id, slug }) => {
                  return (
                    <div key={id} className="relative p-2 border-2 rounded-md border-paper-200 bg-paper-50">
                      <div className="text-sm font-semibold tracking-wide uppercase text-secondary-500">
                        {categories && categories[0].name}
                      </div>
                      <Link href={`/blog/${slug}`}>
                        <a className="inline-block pt-2 pb-4 text-xl font-medium md:leading-6 md:text-2xl text-paper-700">
                          {title}
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

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
