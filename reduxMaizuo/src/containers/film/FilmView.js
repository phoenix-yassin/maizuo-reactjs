import React from 'react'
import { connect } from 'react-redux'
import NowPlayingView from './NowPlayingView'
import ComingSoonView from './ComingSoonView'
import { changeTab,fetchComingSoonLists,fetchNowPlayingLists, fetchMoreNowPlayingLists} from '../../actions'
import './FilmView.less'

class FilmView extends React.Component {

  componentDidMount(){
    const { dispatch, nowPlayingFilms } = this.props
	  const {current} = nowPlayingFilms.page
	  if(current === 1){
      dispatch(fetchNowPlayingLists(1,8))
	  }
	  dispatch(fetchNowPlayingLists(1,8))
	  dispatch(fetchComingSoonLists(1,10))
  }

  componentDidUpdate(){
    console.log('....componentDidUpdate')
  }


  render() {
    const {dispatch, curTab, nowPlayingFilms, comingSoonFilms, nowPlayingFilmsPage} = this.props
	  const current = (nowPlayingFilmsPage && nowPlayingFilmsPage.current) || 1;
    let nowPlayingStyle='now-playing'
    let comingSoonStyle='coming-soon'
    if(curTab==='NOW_PLAYING'){
      nowPlayingStyle=nowPlayingStyle+' choosing'
    }else{
      comingSoonStyle=comingSoonStyle+' choosing'
    }
    return (
      <section className="film-view">
        <div className="film-list-wrap">
          <div className="film-list-nav">
            <a href="javascript:void(0);"  onClick={()=>dispatch(changeTab('NOW_PLAYING'))}>
              <div className={nowPlayingStyle}>正在热映</div>
            </a>
            <a href="javascript:void(0);" onClick={()=>dispatch(changeTab('COMING_SOON'))}>
              <div className={comingSoonStyle}>即将上映</div>
            </a>
          </div>
          {this.props.curTab==='NOW_PLAYING'?<NowPlayingView films={nowPlayingFilms.films} />:<ComingSoonView films={comingSoonFilms}/>}
	        {this.props.curTab==='NOW_PLAYING'?<div><button className="center" onClick={()=>dispatch(fetchMoreNowPlayingLists(current+1,8))}>More...</button></div>:null}
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state) =>{
  const curTab = state.app.curTab||'NOW_PLAYING'
  const nowPlayingFilms = state.film.nowPlayingFilms||{}
  const comingSoonFilms = state.film.comingSoonFilms||[]
	const nowPlayingFilmsPage = nowPlayingFilms.page || {}
  return {
    curTab,
    comingSoonFilms,
    nowPlayingFilms,
	  nowPlayingFilmsPage
  }
}

export default connect(mapStateToProps)(FilmView)
