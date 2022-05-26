import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const pn = 1

function App() {
  const [pagedata, setPagedata] = useState([])
  const [page, setPage] = useState(pn)

  useEffect(() => {
    axios
      .get('https://api.github.com/repos/facebook/react/issues')
      .then(({ data }) => {
        setPagedata([...pagedata, data])
      })
  }, [page])


  function scrollToEnd() {
    setPage(page + 1)
  }

  window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      scrollToEnd()
    }
  }

  return (
    <div className='App'>
      <div className='gitpage'>
        <div className='navbar'>
          <div className='navbar-left'>
            <p>Open</p>
            <p>Closed</p>
          </div>
          <div className='navbar-right'>
            <p>Author</p>
            <p>Label</p>
            <p>Projects</p>
            <p>Milestones</p>
            <p>Assignee</p>
            <p>Sort</p>
          </div>
        </div>
        {pagedata &&
          pagedata.map((page) => {
            return page.map((pg) => {
              return (
                <div className='container' key={pg.id}>
                  <div className='container-lp'>
                    <p className='container-lp-mh'>{pg.title}</p>
                    <p className='container-lp-sh'>
                      #{pg.id} is raised by {pg.user.login} on{' '}
                      {pg.created_at.split('T')[0]}
                    </p>
                  </div>
                  <div className='container-rp'>
                    <img src={pg.user.avatar_url} />
                    <p>Comments: {pg.comments}</p>
                  </div>
                </div>
              )
            })
          })}
      </div>
    </div>
  )
}

export default App
