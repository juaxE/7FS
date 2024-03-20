import { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { tokenLoggedIn } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'



const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())

    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(tokenLoggedIn(user))
        }
    }, [])

    return (
        <div>
            <h2>Blogs</h2>
            <Router>
                {user && <Menu />}
                <Notification />
                {user ?
                    <Routes>
                        <Route path="/" element={<BlogList />} />
                        <Route path="/blogs/:id" element={<BlogView />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                    :
                    <LoginForm />
                }
            </Router>
        </div>
    )
}
export default App