import PostCard from "../components/PostCard";
import NavbarR from "../components/NavbarR";
import ProfileCard from "../components/ProfileCard";
import axios from "../api/axios";
import FormEdit from "../components/FormEdit";
import FormEditProfile from "../components/FormEditProfile";
import { useEffect, useState } from "react";

function Profile() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
    const [isPostDialogOpen, setPostDialogOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);
    const [postDetailsLoaded, setPostDetailsLoaded] = useState(false);
    const userId = localStorage.getItem("id");

    const handleNameChange = (newName) => {
        setUser((prev) => ({ ...prev, username: newName }));
    };

    const handleEmailChange = (newEmail) => {
        setUser((prev) => ({ ...prev, email: newEmail }));
    };

    useEffect(() => {
        if (postToEdit && !postDetailsLoaded) {
            const fetchPostDetails = async () => {
                try {
                    const response = await axios.get(
                        `/publication/publicationById/${postToEdit._id}`
                    );
                    setPostToEdit(response.data);
                    setPostDetailsLoaded(true);
                    console.log("Fetched post details:", response.data);
                } catch (error) {
                    console.error("Error fetching post details:", error);
                }
            };

            fetchPostDetails();
        }
    }, [postToEdit, postDetailsLoaded]);

    const handleEditClick = (postId) => {
        const post = posts.find((p) => p._id === postId);
        setPostToEdit(post);
        setPostDetailsLoaded(false);
        setPostDialogOpen(true);
    };

    useEffect(() => {
        const fetchPostsAndUser = async () => {
            try {
                const response = await axios.get(
                    `/publication/allPublication/${userId}`
                );
                const { User, posts } = response.data.data;

                setUser(User);
                setPosts(posts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPostsAndUser();
    }, [userId]);

    return (
        <div className="p-4 min-h-screen bg-blue-100">
            <div>
                <NavbarR />
            </div>

            <div className="mt-4">
                <ProfileCard
                    userName={user.username}
                    email={user.email}
                    onEditClick={() => setProfileDialogOpen(true)}
                />
            </div>
            {posts.length === 0 && (
                <div className="mt-4 w-full p-4 border-2 bg-white shadow-md rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        No tienes publicaciones aún
                    </p>
                </div>
            )}

            <div className="flex flex-wrap justify-center mt-4 space-x-4">
                {posts.map((post) => (
                    <div key={post._id} className="flex-shrink-0 ml-4 w-1/2">
                        <PostCard
                            key={post._id}
                            postId={post._id}
                            title={post.title}
                            content={post.content}
                            author={user.username}
                            authorId={user._id}
                            updatedAt={post.updatedAt}
                            image={post.image?.secureUrl}
                            onEditClick={handleEditClick}
                        />
                    </div>
                ))}
            </div>

            {isPostDialogOpen && (
                <FormEdit
                    isOpen={isPostDialogOpen}
                    onClose={() => setPostDialogOpen(false)}
                    title={postToEdit.title}
                    content={postToEdit.content}
                    publicationId={postToEdit._id}
                    setTitle={(newTitle) =>
                        setPostToEdit((prev) => ({ ...prev, title: newTitle }))
                    }
                    setContent={(newContent) =>
                        setPostToEdit((prev) => ({
                            ...prev,
                            content: newContent,
                        }))
                    }
                />
            )}

            {isProfileDialogOpen && (
                <FormEditProfile
                    isOpen={isProfileDialogOpen}
                    onClose={() => setProfileDialogOpen(false)}
                    onSave={(newName, newEmail) => {
                        handleNameChange(newName);
                        handleEmailChange(newEmail);
                    }}
                    initialName={user.username}
                    initialEmail={user.email}
                />
            )}
        </div>
    );
}

export default Profile;
