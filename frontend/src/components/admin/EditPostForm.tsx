import PostForm from "@/components/admin/PostForm";
import { Post } from "@/types/post";

interface EditPostFormProps {
    post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
    return <PostForm mode="edit" post={post} />;
}