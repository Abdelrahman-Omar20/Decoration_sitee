import { useState } from 'react';
import { Save, Lock } from 'lucide-react';

export default function Settings() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password change not implemented in demo.');
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <div>
                    <h2>Settings</h2>
                    <p>Manage your account settings</p>
                </div>
            </header>

            <div className="content-card" style={{ maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <h3 className="section-title mb-4">Change Password</h3>

                    <div className="form-group">
                        <label>Current Password</label>
                        <div className="input-icon-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="input with-icon"
                                value={formData.currentPassword}
                                onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <div className="input-icon-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="input with-icon"
                                value={formData.newPassword}
                                onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-icon-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                className="input with-icon"
                                value={formData.confirmPassword}
                                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions mt-4">
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} /> Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
