# Blogify

Blogify is Blogging website, where users can share there blogs, add comments.

### Features

- Sign in / up & JWT Authorization
</br>Users can sign up & sign in, there data is protected and password is hashed before being stored in MongoDb.
</br>JWT token is created for users session & verifies token before evey other request is made to backend. Token is erased when user logs out.
- Add Blog
</br>Users can add blog: Title, Description & CoverImg.
- Comments
</br>Users can add comments to blogs
- Responsive
</br>The entire application is responsive and works on mobile also, styled with Tailwind CSS.

### How to run?
- Clone the repo
- Backed: </br>
```
cd backend
npm start
```
- Frontend:</br>
```
cd frontend
npm start
```
- env <br />
Create a .env file inside backend at same level as package.json<br/>
Create MONGODB_URL and add your monogodb connection string.<br/>
A collection by name blogify will be created


### Tools
- React
- Express
- Typescript
- Mongoose
- Zod
- Tailwind CSS
