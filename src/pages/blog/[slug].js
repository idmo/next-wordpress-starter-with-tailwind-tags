import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getAllPosts, getRelatedPosts, postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

export default function Post({ post, socialImage, relatedPosts }) {
  const {
    title,
    metaTitle,
    description,
    content,
    date,
    author,
    categories,
    tags,

    featuredImage,
    isSticky = false,
  } = post;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
    compactTags: false,
  };

  const { posts: relatedPostsList, title: relatedPostsTitle } = relatedPosts;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <Header>
        <div>
          {featuredImage && (
            <FeaturedImage
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
        </div>
        <Container>
          <h1
            className="pt-8 font-medium md:text-5xl text-paper-700 dark:text-paper-200"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <Metadata
            date={date}
            author={author}
            categories={categories}
            tags={tags}
            options={metadataOptions}
            isSticky={isSticky}
          />
        </Container>
      </Header>

      <Content>
        <Section>
          <Container>
            <div
              className="prose md:prose-lg"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
      </Content>

      <Section>
        <Container>
          {!!relatedPostsList.length && (
            <div>
              {relatedPostsTitle.name ? (
                <span>
                  More from{' '}
                  <Link href={relatedPostsTitle.link}>
                    <a>{relatedPostsTitle.name}</a>
                  </Link>
                </span>
              ) : (
                <span>More Posts</span>
              )}
              <ul>
                {relatedPostsList.map((post) => (
                  <li key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { categories, databaseId: postId } = post;
  const category = categories.length && categories[0];

  let { name, slug } = category;

  return {
    props: {
      post,
      socialImage,
      relatedPosts: {
        posts: await getRelatedPosts(category, postId),
        title: {
          name: name || null,
          link: categoryPathBySlug(slug),
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts();

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
