import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { tagPathBySlug } from 'lib/tags';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';

import { FaMapPin } from 'react-icons/fa';
const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
  compactTags: true,
};

const Metadata = ({ author, date, categories, tags, options = DEFAULT_METADATA_OPTIONS, isSticky = false }) => {
  const { compactCategories, compactTags } = options;

  return (
    <div className="flex flex-row space-x-3">
      {author && (
        <div>
          {/* {author.avatar && (
              <img
                className="rounded-full w-[24px] h-[24px]"
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )} */}
          <Link href={authorPathByName(author.name)}>
            <a className="font-medium" rel="author">
              {author.name}
            </a>
          </Link>
        </div>
      )}
      {date && (
        <div>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </div>
      )}

      {Array.isArray(categories) && categories[0] && (
        <div>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <div>
              {categories.map((category) => {
                return (
                  <span key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
      {Array.isArray(tags) && tags[0] && (
        <div>
          {compactTags && (
            <span
              className="inline-flex px-2 p-0.5 bg-green-400 rounded"
              title={tags.map(({ name }) => name).join(', ')}
            >
              <Link href={tagPathBySlug(tags[0].slug)}>
                <a>{tags[0].name}</a>
              </Link>
              {tags.length > 1 && ' and more'}
            </span>
          )}
          {!compactTags && (
            <div>
              {tags.map((tag) => {
                return (
                  <div
                    className="inline-flex items-center space-x-1 text-xs uppercase border-green-900 px-1 py-0.5 hover:bg-green-200"
                    key={tag.slug}
                  >
                    <span className="inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
                    <Link href={tagPathBySlug(tag.slug)}>
                      <a>{tag.name}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {isSticky && (
        <li>
          <FaMapPin aria-label="Sticky Post" />
        </li>
      )}
    </div>
  );
};

export default Metadata;
