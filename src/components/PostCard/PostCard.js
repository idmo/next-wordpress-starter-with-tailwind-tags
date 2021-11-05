import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import { FaMapPin } from 'react-icons/fa';
const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, tags, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  if (!excludeMetadata.includes('tags')) {
    metadata.tags = tags;
  }

  return (
    <div>
      {isSticky && <FaMapPin aria-label="Sticky Post" />}
      <Link href={postPathBySlug(slug)}>
        <a>
          <h3
            className="pt-4 pb-1 text-2xl font-bold text-paper-700 dark:text-paper-400 md:text-4xl"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </a>
      </Link>
      <Metadata {...metadata} />
      {excerpt && (
        <div
          className="pb-4 mb-2 border-b border-paper-200"
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
