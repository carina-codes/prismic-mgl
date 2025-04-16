import React from 'react';
import Link from 'next/link';

import { ButtonLink } from './ButtonLink';
import { Logo } from './Logo';
import { createClient } from '@/prismicio';
import { PrismicLink } from "@prismicio/react";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className='header-nav'>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link href="/">
              <Logo className="header-logo"/>
            </Link>
          </div>
          <nav className="col" aria-label="Header">
            <ul className="mobile-hide">
              {settings?.data?.navigation?.map((item, index) => (
                <li key={index}>
                  <PrismicLink field={item.link}>
                    {item.link?.text || 'Untitled'}
                  </PrismicLink>
                </li>
              ))}
            </ul>
            <ButtonLink href="/" icon="cart" aria-label="Cart (1)" className="mobile-hide">
              Cart (1)
            </ButtonLink>
            <ButtonLink href="/" aria-label="Open mobile menu" className="mobile-menu-btn">
              Menu
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  )
}