import { getAllTags, getTagBySlug } from 'lib/tags';
import { getPostsByTagId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Tag({ tag, posts }) {
  console.log('tag ', tag, 'posts: ', posts);
  const { name, description, slug } = tag;

  const { metadata } = usePageMetadata({
    metadata: {
      ...tag,
      description: description || tag.og?.description || `Read ${posts.length} posts from ${name}`,
    },
  });

  return <TemplateArchive title={name} Title={<Title title={name} />} posts={posts} slug={slug} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { tag } = await getTagBySlug(params?.slug);
  const { posts } = await getPostsByTagId(tag.name);

  return {
    props: {
      tag,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { tags } = await getAllTags();

  const paths = tags.map((tag) => {
    const { slug } = tag;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
