"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostPage() {
    const [addComment, setAddComment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });

    const criarNovoComentario = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments",
                {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    body: form.body.trim()
                });
                setAddComment([response.data, ...addComment]);
                setForm({ name: "", email: "", body: "" });
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao criar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return(
        <div>
            <h1>Criar Comentário</h1>
            <div>
                <input type="text" name="name" value={form.name} onChange={atualizarForm} placeholder="Digite seu nome!" required />
                <br />
                <input type="email" name="email" value={form.email} onChange={atualizarForm} placeholder="Digie seu email!" required />
                <br />
                <textarea name="body" value={form.body} onChange={atualizarForm} placeholder="Digite seu comentário!" required />
                <br />
                <button onClick={criarNovoComentario} disabled={!form.name.trim() || loading}>
                    {loading ? "Criando..." : "Criar Comentário"}
                </button>
            </div>
            {error && <p>❌ Erro ao criar comentário. Tente novamente.</p>}
            <h2>Comentários ({addComment.length})</h2>
            <ul>
                {addComment.map((comment) => (
                    <li key={comment.id}>
                        <hr />
                        <p>{comment.name}</p>
                        <p>{comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}