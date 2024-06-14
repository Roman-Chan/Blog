import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Modal from "../components/Modal"; // Importa el modal que acabamos de crear
import { FaEllipsisV } from "react-icons/fa";

function PostCard({
    postId,
    title,
    content,
    author,
    authorId,
    updatedAt,
    image,
    onSubmitComment,
    onEditClick,
}) {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const userId = localStorage.getItem("id");

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const onDeleteClick = async (postId) => {
        setModalMessage("¿Estás seguro de eliminar esta publicación?");
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowModal(false);
        try {
            const response = await axios.delete(
                `/publication/delete/${postId}`
            );
            if (response.status === 200) {
                setModalMessage("Publicación eliminada exitosamente.");
                setShowModal(true);
                setTimeout(() => window.location.reload(), 1000); // Reload after 1 second
            } else {
                console.error("Error deleting post:", response);
                setModalMessage(
                    "Error al eliminar la publicación. Intente de nuevo."
                );
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            setModalMessage(
                "Error al eliminar la publicación. Intente de nuevo."
            );
            setShowModal(true);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            setModalMessage("Debe escribir un comentario antes de enviarlo.");
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post(`/comment/create`, {
                content: newComment,
                author: userId,
                publication: postId,
            });

            setComments([response.data, ...comments]);
            setNewComment("");
            setModalMessage("Comentario enviado exitosamente.");
            setShowModal(true);
            setTimeout(() => window.location.reload(), 1000); //
        } catch (error) {
            console.error("Error posting comment:", error);
            setModalMessage("Error al enviar el comentario. Intenta de nuevo.");
            setShowModal(true);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            try {
                const response = await axios.get(
                    `/comment/publication/${postId}`
                );
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoadingComments(false);
            }
        };

        if (showComments) {
            fetchComments();
        }
    }, [postId, showComments]);

    const isAuthor = userId === authorId;

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="w-full mt-2 p-2 border bg-white shadow-sm rounded-lg space-y-1 overflow-auto">
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div>
                    {new Date(updatedAt).toLocaleString()} Por: {author}
                </div>
                {isAuthor && (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-500 hover:text-gray-700 transition duration-300"
                        >
                            <FaEllipsisV />
                        </button>
                        {dropdownVisible && (
                            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 shadow-lg rounded-lg">
                                <button
                                    onClick={() => onEditClick(postId)}
                                    className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-600 overflow-auto">{content}</p>
            {image && (
                <img
                    src={image}
                    alt="Publicación"
                    className="w-full h-32 object-cover rounded my-1"
                />
            )}
            <div className="flex items-center gap-1">
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Comentario..."
                    className="w-full p-1 text-xs border border-gray-300 rounded"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 text-white px-1 py-0.5 rounded-full text-xs"
                >
                    Enviar
                </button>
            </div>
            <div className="flex justify-end mt-1">
                <button
                    onClick={toggleComments}
                    className="text-gray-700 hover:text-gray-900 text-xs"
                >
                    {showComments ? "Ocultar" : "Mostrar"} comentarios
                </button>
            </div>
            {showComments && (
                <div className="mt-1 border-t border-gray-300 pt-1 max-h-48 overflow-auto">
                    <h4 className="text-xs font-semibold">Comentarios</h4>
                    {loadingComments ? (
                        <p className="text-xs">Cargando...</p>
                    ) : comments.length === 0 ? (
                        <p className="text-xs">No hay comentarios aún.</p>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="mt-1 p-1 border-b border-gray-300"
                            >
                                <p className="text-black-500 font-medium text-xs">
                                    {comment.author.username}
                                </p>
                                <p className="text-gray-700 text-xs">
                                    {comment.content}
                                </p>
                                <small className="text-gray-500 text-xs">
                                    {new Date(
                                        comment.updatedAt
                                    ).toLocaleString()}
                                </small>
                            </div>
                        ))
                    )}
                </div>
            )}
            <Modal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default PostCard;
