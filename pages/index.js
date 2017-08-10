import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'

import {
  initStore,
  updateShowList,
  toggleModal,
} from '../redux/store'

import Layout from '../components/Layout'
import Modal from '../components/Modal'

const Index = (props) => (
  <Layout title="next-index" canonical="index">
    <h1>Batman TV Shows</h1>
    <Modal
      visible={props.modalVisible}
      toggleModal={props.toggleModal}
      show={props.showDetails[props.currentId]}
    />
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <a
            href={`/p/${show.id}`}
            onClick={e => props.toggleModal(e, show.id)}
          >
            {show.name}
          </a>
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
    shows: store.getState().showList,
  }
}

// get initial props vs mapStateToProps

const mapStateToProps = state => {
  return {
    modalVisible: state.modalVisible,
    currentId: state.currentId,
    showDetails: state.showDetails || {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: (e, id) => {
      e.preventDefault()

      if (id) {
        Router.push(`/?photoId=${id}`, `/p/${id}`)
      } else {
        Router.push('/')
      }
      dispatch(toggleModal(id))
    },
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
