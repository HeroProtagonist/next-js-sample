import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

import withRedux from 'next-redux-wrapper'

import {
  initStore,
  updateShowDetails,
} from '../redux/store'

const Post = ({ canonical, show, title }) => (
    <Layout title={title} canonical={canonical}>
       <h1>{show.name}</h1>
       <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={show.image.medium}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { store } = context
  const { id } = context.query

  // check state here
  const showDetails = store.getState().showDetails

  if (showDetails && showDetails[id]) {
    return {
      show: showDetails[id],
      canonical: `post-${id}`,
      title: id,
    }
  }
  await store.dispatch(updateShowDetails(id))

  console.log(`Fetched show: ${store.getState().showDetails[id].name}`)

  return {
    show: store.getState().showDetails[id],
    canonical: `post-${id}`,
    title: id,
  }
}

export default  withRedux(initStore)(Post)
