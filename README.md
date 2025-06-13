# 🏋️ Click Fit

Click Fit is a simple and responsive single-page sport & fitness website created as part of a technical test for the Junior Full Stack Developer position at **On Wave Group**.

## 🚀 Features

- Responsive UI (HTML, CSS, Bootstrap)
- Animated design elements for a smooth user experience
- Fetches a fitness-related fact using jQuery AJAX from [http://numbersapi.com/1/30/date?json](http://numbersapi.com/1/30/date?json)
- Drag & drop or click-to-select image upload functionality
- Uploaded images are stored locally in the `/upload_images` folder (no cloud storage)
- Backend built using Node.js and Express
- MySQL database with a `users` table and a stored procedure `addUser` for inserting new users

## 🛠 Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5, jQuery
- **Backend:** Node.js, Express, Multer
- **Database:** MySQL

## 📸 Image Upload

Users can either:
- Drag and drop an image into the upload area
- Or click to select an image from their device

After selection, the image is uploaded via AJAX and stored in the `public/upload_images` directory on the server.

## 🧪 How to Run the Project

### 1. Install dependencies

```bash
npm install

node backend/server.js
