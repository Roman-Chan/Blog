import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import NavbarR from "../components/NavbarR";
import FormPost from "../components/FormPost";
import PostCard from "../components/PostCard";
import EditDialog from "../components/FormEdit";
import Modal from "../components/Modal";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);
    const [postDetailsLoaded, setPostDetailsLoaded] = useState(false); // Estado para verificar si los detalles se han cargado
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const userId = localStorage.getItem("id");

    const handleTitleChange = (newTitle) => {
        setPostToEdit((prev) => ({ ...prev, title: newTitle }));
    };

    const handleContentChange = (newContent) => {
        setPostToEdit((prev) => ({ ...prev, content: newContent }));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get("/publication/all");

                setPosts(postsResponse.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (postToEdit && !postDetailsLoaded) {
            const fetchPostDetails = async () => {
                try {
                    const response = await axios.get(
                        `/publication/publicationById/${postToEdit._id}`
                    );
                    setPostToEdit(response.data);
                    setPostDetailsLoaded(true); // Marcar como cargados los detalles
                } catch (error) {
                    console.error("Error fetching post details:", error);
                }
            };

            fetchPostDetails();
        }
    }, [postToEdit, postDetailsLoaded]); // Solo recargar cuando postToEdit cambia y los detalles no se han cargado

    const handleCommentSubmit = async (commentData) => {
        try {
            await axios.post("/comment/create", commentData);
        } catch (error) {
            console.error(
                "Error submitting comment:",
                error.response?.data || error.message
            );
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            formData.append("author", userId);
            await axios.post("/publication/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setModalMessage("Publicación añadida con éxito!");
            setShowModal(true);
            setTimeout(() => window.location.reload(), 1000); // Recargar después de 1 segundo
        } catch (error) {
            console.error("Error al enviar la publicación:", error);
            setModalMessage(
                "Error al enviar la publicación. Intente de nuevo."
            );
            setShowModal(true);
        }
    };

    const handleEditClick = (postId) => {
        const post = posts.find((p) => p._id === postId);
        setPostToEdit(post);
        setPostDetailsLoaded(false); // Resetear los detalles cargados para permitir la recarga
        setDialogOpen(true);
    };

    return (
        <div className="p-4 min-h-screen bg-blue-100">
            <NavbarR />
            <div className="mt-4">
                <FormPost onSubmit={handleFormSubmit} />
            </div>

            {posts.length === 0 && (
                <div className="mt-4 w-full p-4 border-2 bg-white shadow-md rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        No hay publicaciones aún
                    </p>
                </div>
            )}
            <div className="flex flex-wrap justify-center mt-4 space-x-4">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="flex-shrink-0 ml-4 max-w-xs sm:max-w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4"
                    >
                        <PostCard
                            postId={post._id}
                            title={post.title}
                            content={post.content}
                            author={post.author.username}
                            authorId={post.author._id}
                            updatedAt={post.updatedAt}
                            image={post.image?.secureUrl}
                            onEditClick={handleEditClick}
                        />
                    </div>
                ))}
            </div>
            {isDialogOpen && (
                <EditDialog
                    isOpen={isDialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title={postToEdit.title}
                    content={postToEdit.content}
                    publicationId={postToEdit._id}
                    setTitle={handleTitleChange}
                    setContent={handleContentChange}
                />
            )}
            {showModal && (
                <Modal
                    show={showModal}
                    message={modalMessage}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;
