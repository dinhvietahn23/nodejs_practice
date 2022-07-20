import './App.css';
import {useDispatch} from 'react-redux'
import * as actions from './redux/actions'
import HomePage from './pages/HomePage';
function App() {
  const dispatch = useDispatch();
  dispatch(actions.getPosts.getPostsRequest())
  return <HomePage/>;
}

export default App;
