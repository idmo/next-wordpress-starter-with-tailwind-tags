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
  const { title } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header>
        <div>
          <Link href="/">
            <a>
              <h1 className="pt-12 text-5xl font-black text-red-800 tracking-wides">iDMO</h1>
            </a>
          </Link>
          <p className="font-semibold text-gray-500">Because Simple Isn`t Easy&reg;</p>
          <p className="prose">Product Design &amp; Development</p>
        </div>
      </Header>
      <div className="py-5">
        <Section>
          <Container>
            <h2 className="py-3 text-4xl font-extralight">from the blog...</h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {posts.map((post, i) => {
                return (
                  <div
                    className="relative p-4 border border-gray-200 rounded shadow-sm hover:bg-green-50"
                    key={post.slug}
                  >
                    <div className="text-xs font-bold text-green-900 uppercase">
                      {post.categories && post.categories[0].name}
                    </div>
                    <div className="pb-10 text-lg font-normal">{post.title}</div>
                    <Link href={`/blog/${post.slug}`} key={i}>
                      <a className="absolute self-end px-3 py-1 mt-4 text-sm text-right bg-gray-200 right-3 rounded-2xl bottom-3">
                        Read More &rarr;
                      </a>
                    </Link>
                  </div>
                );
              })}
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
