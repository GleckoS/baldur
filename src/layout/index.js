import React from "react"
import Header from "./header"
import Footer from "./footer"
import Breadcrumbs from "./breadcrumbs"

export default function Layout({ breadcrumbs, children }) {
  return (
    <React.Fragment>
      <Header />
      <Breadcrumbs data={breadcrumbs} />
      {children}
      <Footer />
    </React.Fragment>
  )
}