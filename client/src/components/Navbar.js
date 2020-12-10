import React, { useContext } from 'react';
import { Link ,useHistory} from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {

  const { state, dispatch } = useContext(UserContext);
  const histroy =useHistory();
  const renderList = () => {
    if (state) {

      return [

        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><Link to="/myfollowerspost">My Following Post</Link></li>,
        <li>
          <button className="btn #c628228 red darken-3"
            onClick={() => {
               localStorage.clear()
               dispatch({type:"CLEAR"})
               histroy.push('/signin')
            } 
            }
          >
            SIGNOUT
          </button>
        </li>

      ]
      
    } else {

      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]

    }
  }

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;