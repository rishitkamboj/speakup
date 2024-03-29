
import { ComBlog } from "../components/ComBlog";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading) {
        return <div>
        loading.......
        </div>
    }
    return <div>
        <ComBlog blog={blog} />
    </div>
}