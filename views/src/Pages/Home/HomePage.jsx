import { useEffect, useState } from "react"
import ContentHeader from "../../Components/ContentHeader"
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

        return () => {
            setPosts([])
        }
    }, [])

    return (
        <div className="home">
            <div className="home--wrapper">
                <ContentHeader label={"Home"} />
                <section>
                    { posts && posts.map(post => (
                        <PostItem key={post.id} id={post.id} image={post.image} description={post.description} author={post.author} likes={post.likes} />
                    ))}
                    { posts.length === 0 && (<div style={{ textAlign: "center" }}>
                        <br />
                        <h1>No Such Post</h1>
                    </div>)}
                </section>
            </div>
        </div>
    )
}

export default HomePage