import { useState, useEffect } from 'react';
import { Mail, RefreshCw } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export default function MessageManagement() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/contact', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <div>
                    <h2>Messages</h2>
                    <p>View and manage contact form submissions</p>
                </div>
                <button className="btn btn-secondary" onClick={fetchMessages}>
                    <RefreshCw size={18} /> Refresh
                </button>
            </header>

            <div className="content-card">
                {loading ? (
                    <div className="loading-state">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="empty-state">No messages found.</div>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>From</th>
                                    <th>Service</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((msg) => (
                                    <tr key={msg.id}>
                                        <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="user-cell">
                                                <span className="name">{msg.name}</span>
                                                <span className="email">{msg.email}</span>
                                            </div>
                                        </td>
                                        <td>{msg.service}</td>
                                        <td className="message-preview" title={msg.message}>{msg.message}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <a href={`mailto:${msg.email}`} className="btn-icon" title="Reply">
                                                    <Mail size={18} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
