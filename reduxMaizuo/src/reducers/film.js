/**
 * Created by zhengguorong on 16/6/28.
 */
import * as types from '../constants/ActionTypes'
import Immutable from 'immutable'

const film=(state={},action) => {
	let obj = null;
  switch (action.type) {
    case types.FETCH_COMING_SOON_SUCCESS:
    	obj = null;
    	obj = Immutable.fromJS(state);
    	obj = obj.merge({'comingSoonFilms': action.comingSoonFilms});
    	return obj.toJS()
      //return Object.assign({}, state, {comingSoonFilms:action.comingSoonFilms})
    case types.FETCH_NOW_PLAYING_SUCCESS:
	    obj = null;
    	obj = Immutable.fromJS(state);
    	obj = obj.merge({nowPlayingFilms: {
		    films: action.nowPlayingFilms.films,
		    page: action.nowPlayingFilms.page,
	    }})
      return obj.toJS()
	  case types.FETCH_MORE_NOW_PLAYING_SUCCESS:
	  	const films = [...state.nowPlayingFilms.films, ...action.nowPlayingFilms.films]
		  const page = action.nowPlayingFilms.page
		  if( state.nowPlayingFilms.page.current > page.count ){
	  		return state;
		  }
		  obj = null;
		  obj = Immutable.fromJS(state);
		  obj = obj.merge({nowPlayingFilms: {
			  films: films,
			  page: page,
		  } })
	  	return obj.toJS();
    case types.FETCH_BILLBOARD_SUCCESS:
	    obj = null;
	    obj = Immutable.fromJS(state);
	    obj = obj.merge({billboards:action.billboards})
	    return obj.toJS();
    case types.FETCH_DETAIL_SUCCESS:
	    obj = null;
	    obj = Immutable.fromJS(state);
	    obj = obj.merge({detail:action.detail})
	    return obj.toJS();
    default:
      return state
  }
}
export default film
