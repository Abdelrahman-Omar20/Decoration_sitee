# Admin Management Guide 🛡️

This guide explains how to access and use the Administration Panel of your Decoration Site.

## 1. Accessing the Admin Panel
*   **URL**: Open your browser and navigate to `/admin` (e.g., `http://localhost:5173/admin` or `https://your-domain.com/admin`).
*   **Redirect**: If you are not logged in, you will be automatically redirected to the Login Page (`/admin/login`).

## 2. Default Credentials
When the server starts for the first time, it creates a default administrator account:

*   **Email**: `admin@elegancedecor.com`
*   **Password**: `admin123`

> [!IMPORTANT]
> You should change this password immediately after your first login via the **Settings** page for security.

## 3. Dashboard Features

### 📊 Dashboard Home
*   View quick statistics (Total Videos, Categories, Services).
*   See recent messages or activity.

### 🎥 Video Management (`/admin/videos`)
*   **View**: See a list of all videos in the gallery.
*   **Add New**:
    1.  Click **Add Video**.
    2.  Enter **Title** and **Description**.
    3.  **YouTube URL**: Paste the full YouTube link (e.g., `https://www.youtube.com/watch?v=...`) or Embed URL.
    4.  **Category**: Select "Wedding", "Party", etc.
    5.  **Featured**: Check this to show it on the Home Page.
*   **Delete**: Remove videos you no longer want.

### 📂 Category Management (`/admin/categories`)
*   Manage the categories used to filter the Gallery.
*   Default categories (Wedding, Party, Corporate, etc.) are pre-loaded.

### 🛠️ Service Management (`/admin/services`)
*   Update the services shown on the Home and Services pages.
*   Edit titles, descriptions, and icons.

### 📬 Messages (`/admin/messages`)
*   View inquiries submitted via the **Contact Us** form.
*   See details: Name, Email, Phone, and Message content.
*   Use the "Reply" button to open your default email client.

### ⚙️ Settings (`/admin/settings`)
*   **Change Password**: Update your admin login credentials here.

## 4. Troubleshooting
*   **"Login Failed"**: Ensure the backend server is running. Check the server logs for any errors.
*   **"Network Error"**: Verify that the API server (Port 4000) is accessible from the Client (Port 5173).
