import Header from './Header'
import Head from 'next/head'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = ({ title, canonical, children }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header />
    {children}
  </div>
)

export default Layout
