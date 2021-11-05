import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { tagPathBySlug } from 'lib/tags';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
  compactTags: true,
};

const Metadata = ({ author, date, categories, tags, options = DEFAULT_METADATA_OPTIONS }) => {
  const { compactCategories } = options;

  console.log(author);

  return (
    <>
      <div className="text-sm md:text-base">
        {date && (
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        )}
        <span className="text-primary-600">{' / '}</span>
        {author && (
          <Link href={authorPathByName(author.name)}>
            <a className="font-medium" rel="author">
              {author.name}
            </a>
          </Link>
        )}
      </div>
      <div className="inline-flex flex-row px-2 py-1 my-2 space-x-2 text-sm rounded-lg shadow bg-paper-100 md:text-base dark:bg-paper-700 dark:text-paper-200">
        {Array.isArray(categories) && categories[0] && (
          <div>
            {compactCategories && (
              <p className="tracking-wide uppercase" title={categories.map(({ name }) => name).join(', ')}>
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
          <div className="flex flex-row">
            {tags.map((tag) => {
              return (
                <div key={tag.slug}>
                  <span className="inline-flex w-2 h-2 mx-1 text-sm rounded-xl bg-cyan-500"></span>
                  <Link href={tagPathBySlug(tag.slug)}>
                    <a>{tag.name}</a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Metadata;
