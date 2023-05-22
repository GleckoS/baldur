import { gql } from "@apollo/client";
import client from "../apollo/apollo-client";
import { PAGE_ITEM_COUNT } from "../constants/blog-item-counts";

function uriTransform(uri) {
  if (uri.endsWith('/')) {
    return uri.slice(0, -1)
  }
  return uri
}

function generateSiteMap({ categories, productCategories, products, blogPages, posts }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>http://baldur.shop</loc>
     </url>
     <url>
       <loc>http://baldur.shop/kontakt</loc>
     </url>
     <url>
       <loc>http://baldur.shop/jak-wybieramy-materialy</loc>
     </url>
     <url>
       <loc>http://baldur.shop/koszyk</loc>
     </url>
     <url>
       <loc>http://baldur.shop/mapa-strony</loc>
     </url>
     <url>
       <loc>http://baldur.shop/o-nas</loc>
     </url>
     <url>
       <loc>http://baldur.shop/polityka-prywatnosci</loc>
     </url>
     <url>
       <loc>http://baldur.shop/regulamin</loc>
     </url>
     <url>
       <loc>http://baldur.shop/sklep</loc>
     </url>
     ${productCategories.map(({ slug }) => {
    return `
       <url>
           <loc>${`http://baldur.shop/sklep/${slug}`}</loc>
       </url>
     `;
  }).join('')}
  ${products.map(({ uri }) => {
    return `
    <url>
        <loc>${`http://baldur.shop${uriTransform(uri)}`}</loc>
    </url>
  `;
  }).join('')}
     <url>
       <loc>http://baldur.shop/blog</loc>
     </url>
     ${blogPages.map(({ page }) => {
    return `
       <url>
           <loc>${`http://baldur.shop/blog/strona/${page}`}</loc>
       </url>
     `;
  }).join('')}
     ${posts.map(({ uri }) => {
    return `
       <url>
           <loc>${`http://baldur.shop${uriTransform(uri)}`}</loc>
       </url>
     `;
  }).join('')}

   ${categories.map(({ slug }) => {
    return `
     <url>
         <loc>${`http://baldur.shop/blog/${slug}`}</loc>
     </url>
   `;
  }).join('')}
  ${categories.map(({ pages, slug }) => {
    return pages?.map(({ page }) => {
      return `
      <url>
          <loc>${`http://baldur.shop/blog/${slug}/strona/${page}`}</loc>
      </url>
    `;
    }).join('')
  }).join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const { data: { categories, productCategories, products, posts } } = await client.query({
    query: gql`
    query Sitemap {
      posts(first: 1000) {
        nodes {
          uri
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      products(first: 1000) {
        nodes {
          uri
        }
      }
      productCategories(first: 1000) {
        nodes {
          slug
        }
      }
      categories(first: 1000) {
        nodes {
          slug
          posts {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      }
    }
  `,
    context: {
      fetchOptions: {
        next: { revalidate: .1 },
      },
    }
  })

  let blogPages = []
  for (let i = 2; i <= Math.ceil(posts.pageInfo.offsetPagination.total / PAGE_ITEM_COUNT); i++) {
    arr.push({
      page: i
    })
  }

  const catFormated = categories.nodes.map(el => {
    const pages = []
    for (let i = 2; i <= Math.ceil(el.posts.pageInfo.offsetPagination.total / PAGE_ITEM_COUNT); i++) {
      pages.push({
        page: i
      })
    }

    return { ...el, pages }
  });

  console.log(categories.nodes)
  const sitemap = generateSiteMap({
    productCategories: productCategories.nodes,
    products: products.nodes,
    blogPages: blogPages,
    posts: posts.nodes,
    categories: catFormated,
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() { }