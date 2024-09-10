    # Blog Posting App

## Description
This is a simple blog posting app where:
1. **Admins** can approve or reject blog posts submitted by users.
2. **Users** can sign up, submit blog posts, and view approved posts.

This app uses JWT for authentication. Admins and users can log in using their credentials, and authenticated requests must include the JWT token in the request headers.

The app also stores data persistently using MongoDB.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Authentication**: JWT (JSON Web Tokens)

## Routes

### Admin Routes:
- **POST** `/admin/signup`
  - Description: Creates a new admin account.
  - Input Body: `{ username: 'admin', password: 'pass' }`
  - Output: `{ message: 'Admin created successfully' }`

- **POST** `/admin/signin`
  - Description: Logs in an admin account.
  - Input Body: `{ username: 'admin', password: 'pass' }`
  - Output: `{ token: 'your-token' }`

- **GET** `/admin/blogs`
  - Description: Returns all pending blog posts for approval.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ blogs: [ { id: 1, title: 'Blog Title', content: 'Blog Content', status: 'pending' }, ... ] }`

- **PUT** `/admin/blogs/:id`
  - Description: Approves or rejects a blog post.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Body: `{ status: 'approved' | 'rejected' }`
  - Output: `{ message: 'Blog post updated successfully' }`

### User Routes:
- **POST** `/users/signup`
  - Description: Creates a new user account.
  - Input Body: `{ username: 'user', password: 'pass' }`
  - Output: `{ message: 'User created successfully' }`

- **POST** `/users/signin`
  - Description: Logs in a user account.
  - Input Body: `{ username: 'user', password: 'pass' }`
  - Output: `{ token: 'your-token' }`

- **POST** `/users/blogs`
  - Description: Submits a new blog post.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Body: `{ title: 'Blog Title', content: 'Blog Content' }`
  - Output: `{ message: 'Blog submitted for review', blogId: 'new-blog-id' }`

- **GET** `/users/blogs`
  - Description: Returns all approved blog posts.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ blogs: [ { id: 1, title: 'Blog Title', content: 'Blog Content', status: 'approved' }, ... ] }`

- **GET** `/users/myblogs`
  - Description: Returns all blog posts submitted by the user.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ blogs: [ { id: 1, title: 'Blog Title', content: 'Blog Content', status: 'pending' | 'approved' | 'rejected' }, ... ] }`

## Steps to Run the Project

### Backend Setup
1. Clone the repository.
2. Install the dependencies: `npm install`.
3. Set up the MongoDB database.
4. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
