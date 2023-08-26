import Head from 'next/head'
import { usePathname } from 'next/navigation'
import React from 'react'

const pageWithCustomMeta = ['/story', '/story-editor']

const title =
  'Shortstories - читать рассказы авторов из народа или написать рассказ и стать лучшим автором'
const description =
  'Читать любительские рассказы, писать рассказы и стать лучшим автором можно только на Shortstories'
const url = 'https://shortstories.io/'
const shareImage = 'https://shortstories.io/images/share.png'
const favicon = '/icons/favicon.png'

function Meta({ router }) {
  const page = usePathname()
  return (
    <Head>
      <meta
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        name="viewport"
      />
      <meta charSet="utf-8" />
      {!pageWithCustomMeta.includes(page) && (
        <>
          <meta content={title} name="title" />
          <meta content={description} name="description" />
          <meta content={title} property="og:site_name" />
          <meta content="website" property="og:type" />
          <meta content={url} property="og:url" />
          <meta content={title} property="og:title" />
          <meta content={description} property="og:description" />
          <meta content={title} name="twitter:title" />
          <meta content={title} name="twitter:text:title" />
          <meta content={description} name="twitter:description" />
          <title>{title}</title>
        </>
      )}
      <meta content="" name="keywords" />
      <link href="/other/manifest.webmanifest" rel="manifest" />
      <meta content="#f7f6fa" name="theme-color" />
      <meta
        content="https://shortstories.io/images/share.png"
        property="og:image"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={shareImage} name="twitter:url" />
      <meta content={shareImage} name="twitter:image:src" />
      <link href={shareImage} rel="image_src" />
      <link href={favicon} rel="shortcut icon" />
      <link href={favicon} rel="apple-touch-icon" />
      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="default" name="apple-mobile-web-app-status-bar-style" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="yes" name="mobile-web-app-capable" />
      <script async src="/scripts/yandex-metrika.js" type="text/javascript" />
    </Head>
  )
}

export default Meta
