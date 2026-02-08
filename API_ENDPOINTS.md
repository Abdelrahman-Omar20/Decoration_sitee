# Elegance Decor - API Endpoints Reference

All API endpoints are prefixed with `/api`.

## 🔐 Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Public | Login with email and password |
| `GET` | `/auth/me` | Admin | Get current logged-in user profile |

## 🎬 Videos
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/videos` | Public | Get all videos (Query Params: `categoryId`, `featured`, `limit`) |
| `GET` | `/videos/:id` | Public | Get specific video details |
| `POST` | `/videos` | Admin | Add a video (Accepts `multipart/form-data`) |
| `PUT` | `/videos/:id` | Admin | Update video details |
| `DELETE` | `/videos/:id` | Admin | Remove a video |

## 📂 Categories
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Public | List all video categories (English & Arabic) |
| `POST` | `/categories` | Admin | Create a new category |
| `DELETE` | `/categories/:id` | Admin | Delete a category |

## 🛠️ Services
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/services` | Public | List all decoration services offered |
| `POST` | `/services` | Admin | Create a new service entry |
| `PUT` | `/services/:id` | Admin | Update service details (Title/Description EN/AR) |
| `DELETE` | `/services/:id` | Admin | Remove a service entry |

## 📩 Contact & Messages
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/contact` | Public | Submit the contact form (Name, Email, Message, etc.) |
| `GET` | `/contact` | Admin | View all received messages |
| `PATCH` | `/contact/:id/read`| Admin | Mark a message as read |
| `DELETE` | `/contact/:id` | Admin | Delete a message |

## ⚙️ System
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Server health check and timestamp |

---

### Authentication Headers
Admin endpoints require the following header:
```http
Authorization: Bearer <your_jwt_token>
```
You can obtain the token by logging in at `/api/auth/login`.

### Default Credentials (Development)
- **Email**: `admin@elegancedecor.com`
- **Password**: `admin123`
