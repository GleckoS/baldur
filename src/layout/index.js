import React, { useEffect, useMemo } from "react"
import Header from "./header"
import Footer from "./footer"
import Breadcrumbs from "./breadcrumbs"

export default function Layout({ breadcrumbs, children }) {
  const locationPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const orphansRegex = useMemo(() => {
    const orphans = ['a', 'i', 'o', 'u', 'w', 'z', 'np.'];
    return new RegExp(` (${orphans.join('|')}) `, 'gi');
  }, []);

  useEffect(() => {
    const paragraphs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, button, span'));
    paragraphs.forEach((paragraph) => {
      Array.from(paragraph.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.replaceAll(orphansRegex, ` $1\u00A0`);
        }
      });
    });
  }, [locationPath, orphansRegex]);
  return (
    <React.Fragment>
      <Header />
      <Breadcrumbs data={breadcrumbs} />
      {children}
      <Footer />
    </React.Fragment>
  )
}