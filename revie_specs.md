# Revie Backend API Specifications

All of the functionality below has been fully implmented in this project.

### Properties

- List all properties in the database
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Search properties by radius from zipcode
  - Use a geocoder to get exact location and coords from a single address field
- Get single property
- Create new property
  - Authenticated users only
  - Must have the role "broker" or "admin"
  - Only one property per broker (admins can create more)
  - Field validation via Mongoose
- Upload a photo for property
  - Owner only
  - Photo will be uploaded to local filesystem
- Update properties
  - Owner only
  - Validation on update
- Delete Property
  - Owner only
- Calculate the average cost of all apartments for a property
- Calculate the average rating from the reviews for a property

### Apartments

- List all apartments for property
- List all apartments in general
  - Pagination, filtering, etc
- Get single apartment
- Create new apartment
  - Authenticated users only
  - Must have the role "broker" or "admin"
  - Only the owner or an admin can create a apartment for a property
  - Brokers can create multiple apartments
- Update apartment
  - Owner only
- Delete apartment
  - Owner only

### Reviews

- List all reviews for a property
- List all reviews in general
  - Pagination, filtering, etc
- Get a single review
- Create a review
  - Authenticated users only
  - Must have the role "user" or "admin" (no brokers)
- Update review
  - Owner only
- Delete review
  - Owner only

### Users & Authentication

- Authentication will be done using JWT/cookies
  - JWT and cookie should expire in 30 days
- User registration
  - Register as a "user" or "broker"
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

## Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Documentation

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment (Digital Ocean)

- Push to Github
- Create a droplet - https://m.do.co/c/5424d440c63a
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt
