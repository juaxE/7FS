import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const padding = {
        paddingRight: 5
    }
    const handleLogOut = () => {
        dispatch(logOut())
    }
    return (
        <div>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <div>
                {user.name} logged in
                <form onSubmit={handleLogOut}>
                    <button type="submit">logout</button>
                </form>
            </div>
        </div>
    )
}



export default Menu