import { gql } from '@apollo/client';

export const QUERY_ALL_POSTS = gql`
  query AllPosts($site: String!) {
    posts(where: { site: $site, hasPassword: false }, first: 10) {
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          id
          categories {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
            }
          }
          modified
          databaseId
          title
          slug
          isSticky
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      author {
        node {
          avatar {
            height
            url
            width
          }
          id
          name
          slug
        }
      }
      id
      categories {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
      tags {
        edges {
          node {
            databaseId
            id
            name
            slug
          }
        }
      }
      content
      date
      excerpt
      featuredImage {
        node {
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
      }
      modified
      databaseId
      title
      slug
      isSticky
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID = gql`
  query PostsByCategoryId($categoryId: Int!) {
    posts(where: { categoryId: $categoryId, hasPassword: false }) {
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          id
          categories {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          databaseId
          title
          slug
          isSticky
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_TAG_ID = gql`
  query PostsByTagId($tagId: String) {
    posts(where: { tagId: $tagId, hasPassword: false }) {
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          id
          tags {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          categories {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          databaseId
          title
          slug
          isSticky
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_AUTHOR_SLUG = gql`
  query PostByAuthorSlug($slug: String!) {
    posts(where: { authorName: $slug, hasPassword: false }) {
      edges {
        node {
          categories {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                databaseId
                id
                name
                slug
              }
            }
          }
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          id
          modified
          databaseId
          slug
          title
          isSticky
        }
      }
    }
  }
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query PostSEOBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;

export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
