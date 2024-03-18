
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {

    const blogFormRef = useRef()
    const blogs = useSelector(state => state.blogs)
    return (
        <div>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm />
            </Togglable>
        </div>
    )
}

export default BlogList