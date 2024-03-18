import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        dispatch(createBlog(blogObject, user))
        dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 5))

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        data-testid="title"
                        onChange={({ target }) => setTitle(target.value)}
                    ></input>
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        data-testid="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    ></input>
                </div>
                <div>
                    <label>Url:</label>
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        data-testid="url"
                        onChange={({ target }) => setUrl(target.value)}
                    ></input>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm