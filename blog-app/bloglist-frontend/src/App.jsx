import { useState, useEffect, useRef } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { logIn, tokenLoggedIn, logOut } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'



const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
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