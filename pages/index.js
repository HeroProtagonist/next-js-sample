import Link from 'next/link'
import withRedux from 'next-redux-wrapper'

import {
  initStore,
  updateShowList,
} from '../redux/store'

import Layout from '../components/Layout'
import Modal from '../components/Modal'

const Index = (props) => (
  <Layout title="next-index" canonical="index">
    <h1>Batman TV Shows</h1>
    <Modal />
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <a href='#'>{show.name}</a>
          {/*<Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>*/}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function({ store, isServer }) {

  // check state here
  const showList = store.getState().showList
  if (showList) {
    return {
      shows: showList
    }
  }
  await store.dispatch(updateShowList())

  console.log(`Show data fetched. Count: ${store.getState().showList.length}`)

  return {
    shows: store.getState().showList
  }
}

// get initial props vs mapStateToProps

// const mapStateToProps = state => {
//   return {
//     shows: state.showList || [],
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateShowList: list => dispatch(updateShowList(list)),
//   }
// }

export default withRedux(initStore)(Index)
