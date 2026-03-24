const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
    // Generic request handler
    async request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    },

    // Auth
    register(formData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    },

    login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    forgotPassword(email) {
        return this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },

    getMe() {
        return this.request('/auth/me');
    },

    // Contact
    submitContact(formData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
    },

    // Blogs
    getBlogs() {
        return this.request('/blogs');
    },

    getBlog(slug) {
        return this.request(`/blogs/${slug}`);
    },

    // Newsletter
    subscribe(email) {
        return this.request('/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },
};

export default api;
