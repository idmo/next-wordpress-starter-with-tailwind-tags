import Link from 'next/link';
import { Fragment } from 'react';

const items = [
  {
    id: 0,
    uri: '/',
    label: 'Home',
    active: false,
  },
  {
    id: 1,
    uri: '/blog',
    label: 'Blog',
    active: false,
  },
  {
    id: 2,
    uri: '/about',
    label: 'About',
    active: false,
  },
];

const GlobalMenu = () => {
  return (
    <Fragment>
      {items.map(({ id, label, uri }) => (
        <Link key={id} href={uri}>
          <a>{label}</a>
        </Link>
      ))}
    </Fragment>
  );
};

export default GlobalMenu;
