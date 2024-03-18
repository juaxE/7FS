import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { logIn, tokenLoggedIn, logOut } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'



const App = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogFormRef = useRef()
    const dispatch = useDispatch()



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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(logIn(username, password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('wrong credentials', 'error', 5))
        }

    }

    const handleLogOut = () => {
        dispatch(logOut())
    }

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        data-testid="username"
                        onChange={({ target }) => setUsername(target.value)}
                    ></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        data-testid="password"
                        onChange={({ target }) => setPassword(target.value)}
                    ></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogList = () => (
        <div>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    return (
        <div>
            <h2>Blogs</h2>
            <Notification />
            {!user && loginForm()}
            {user &&
                <div>
                    {user.name} logged in
                    <form onSubmit={handleLogOut}>
                        <button type="submit">logout</button>
                    </form>
                </div>}
            {user &&
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm />
                </Togglable>}
            {user && blogList()}
        </div>
    )
}
export default App