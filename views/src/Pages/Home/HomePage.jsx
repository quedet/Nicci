import { useEffect, useState } from "react"
import PostItem from "../../Components/PostItem"

const HomePage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await fetch('http://localhost:1337/posts')
            const data = await response.json()
    
            setPosts([...data])
        }

        fetchPostData()
    }, [])

    return (
        <div className="home">
            <div className="home--wrapper">
                <header className="home--header">
                    <h1 className="home--header--title dot-path"><span>Pictures</span><span className="dot dot-large"></span><span>Home</span></h1>
                </header>
                <section>
                    { posts && posts.map(post => (
                        <PostItem key={post.id} image={post.image} description={post.description} author={post.author} likes={post.likes} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default HomePage