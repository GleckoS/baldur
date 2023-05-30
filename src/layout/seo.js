import Head from "next/head";
import { useRouter } from "next/router";
import React from "react"

export default function Seo({ seo: {
  title = 'Baldur',
  opengraphSiteName = 'Baldur',
  metaDesc = '',
  ogImage = '/social.jpg'
} }) {
  const { pathname } = useRouter();
  const canonical = pathname
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="var(--dark-500)" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <meta name="robots" content="noindex" />

      <meta property="og:site_name" content={opengraphSiteName || title} />
      <meta property="og:type" content='website' />
      <meta property="og:locale" content="pl_PL" />

      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />

      <title>{title}</title>
      <meta property="twitter:title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={metaDesc} />
      <meta property="twitter:description" content={metaDesc} />
      <meta property="og:description" content={metaDesc} />

      <meta property="og:image" content={ogImage} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  )
}