import React from 'react';
import Link from 'next/link';

import { createClient } from '@/prismicio';
import { Logo } from './Logo';
import { PrismicNextLink } from '@prismicio/next';

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer>
      <div className="container">
        <Link href="/">
          <Logo className="footer-logo"/>
        </Link>
        <ul>
          {settings.data.navigation.map((item)=>(
            <li key={item.link.text}>
              <PrismicNextLink field={item.link} />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}