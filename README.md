
# Revie

> Backend API for the Revie application to manage properties, apartments, reviews, users and authentication. An assessment by Sodiq Oyedotun for iQube Labs.

## Indices

* [Apartments](#apartments)

  * [Create Property Apartment](#1-create-property-apartment)
  * [Delete Apartment](#2-delete-apartment)
  * [Get All Apartments](#3-get-all-apartments)
  * [Get Apartments For Property](#4-get-apartments-for-property)
  * [Get Single Apartment](#5-get-single-apartment)
  * [Update Apartment](#6-update-apartment)
  * [Upload Photo](#7-upload-photo)

* [Authentication](#authentication)

  * [Login User](#1-login-user)
  * [Register User](#2-register-user)
  * [Update  Password](#3-update--password)
  * [Update User Details](#4-update-user-details)

* [Properties](#properties)

  * [Create New Property](#1-create-new-property)
  * [Delete Property](#2-delete-property)
  * [Get All Properties](#3-get-all-properties)
  * [Get Properties By Distance](#4-get-properties-by-distance)
  * [Get Single Property](#5-get-single-property)
  * [Update Property](#6-update-property)
  * [Upload Photo](#7-upload-photo-1)

* [Reviews](#reviews)

  * [Add Review For Property](#1-add-review-for-property)
  * [Delete Review](#2-delete-review)
  * [Get All Reviews](#3-get-all-reviews)
  * [Get Reviews For Property](#4-get-reviews-for-property)
  * [Get Single Review](#5-get-single-review)
  * [Update Review](#6-update-review)


--------


## Apartments
Create, read, update and delete apartments



### 1. Create Property Apartment


Create an apartment for a specific property


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/properties/5d713a66ec8f2b88b8f830b8/apartments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Love by Gbolahan",
    "bedroom": 5,
    "kitchen": 2,
    "bathroom": 5,
    "cinema": true,
    "terrace": true,
    "lounge": true,
    "isAutomated": true,
    "penthouse": true,
    "pentSwimmingPool": true,
    "amenities": ["Lux Appliances", "wifi", "Swimming Pool"],
    "isAvailable": true
}
```



### 2. Delete Apartment


Remove apartment from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/apartments/5d725a4a7b292f5f8ceff789
```



### 3. Get All Apartments



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/apartments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get Apartments For Property


Get the specific apartments for a property


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/properties/5d713995b721c3bb38c1f5d0/apartments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 5. Get Single Apartment


Get a single apartment by its ID


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/apartments/5d725a4a7b292f5f8ceff792
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Update Apartment


Update apartment in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/apartments/5d725a4a7b292f5f8ceff789
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "price": 77000,
    "isAutomated": false
}
```



### 7. Upload Photo


Route to upload an apartment photo


***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/v1/apartments/5d725a4a7b292f5f8ceff789/photo
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



## Authentication
Routes for user authentication including register, login, reset password, etc



### 1. Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email": "oyedotunsodiq045@gmail.com",
    "password": "123456"
}
```



### 2. Register User


Add user to database with encrypted password


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Sodiq Oyedotun",
    "email": "oyedotunsodiq045@gmail.com",
    "password": "123456",
    "role": "broker"
}
```



### 3. Update  Password


Update logged in user password, send in the body currentPassword, and newPassword


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "currentPassword": "1234567",
    "newPassword": "123456"
}
```



### 4. Update User Details


Update logged in user name and email


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Sodiq Oyedotun",
    "email": "oyedotunsodiq045@gmail.com"
}
```



## Properties
Properties CRUD functionality



### 1. Create New Property


Add new property, must be authenticated and must be broker or admin


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/properties
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "owner": "Ifeoluwa Skyscrapers by Stark",
    "description": "Stark was founded in 2005 and today is one of the leading real estate firms in Nigeria. Our goal has been the same since the beginning: to be an innovative company with a commitment to improve quality of living by providing outstanding real estate opportunities. Today the J.S. Realty portfolio spans over 6.5 million square feet of real estate, and reflects the aspirations of a broad range of property buyers, encompassing medium to large-scale developments, mixed use schemes, waterfront developments and golf estates. We focus on providing exceptional real estate in premium locations in Lagos and a few other cities. We work together with world-class architects and developers to create high quality real estate that make lasting impact on the landscape of our communities.",
    "website": "https://www.oyedotunsodiq045.glitch.me/",
    "phone": "+2348175044840",
    "email": "sales@oyedotunsodiq045.glitch.me",
    "address": "233 Ikorodu Road, Ilupeju, Town Planning, Lagos, Nigeria",
    "listings": ["Duplex", "Skyscraper", "Penthouse"]
}
```



### 2. Delete Property


Delete property from database


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/properties/5f6cc8533bbb1e203bedb185
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Get All Properties


Fetch all properties from database. Include pagination, filtering etc


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/properties
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get Properties By Distance


Get properties within a radius of a specific radius


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/properties/radius/71000/100
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 5. Get Single Property


Get single property by ID


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/properties/5d713a66ec8f2b88b8f830b8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Update Property


update single property in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/properties/5f6cc286364e2f1bf87b0997
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email": "sales@brookstone.com"
}
```



### 7. Upload Photo


Route to upload a property photo


***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/v1/properties/5d713a66ec8f2b88b8f830b8/photo
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



## Reviews
Manage apartment reviews



### 1. Add Review For Property


Insert review for a specific property


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/properties/5d725a1b7b292f5f8ceff788/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title": "Awesome apartment!",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices. Curabitur scelerisque bibendum ligula, quis condimentum libero fermentum in. Aenean erat erat, aliquam in purus a, rhoncus hendrerit tellus. Donec accumsan justo in felis consequat sollicitudin. Fusce luctus mattis nunc vitae maximus. Curabitur semper felis eu magna laoreet scelerisque",
    "rating": "8"
    }
```



### 2. Delete Review


Remove review from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/reviews/5f6f07eb197aba55e160fb2d
```



### 3. Get All Reviews


Get all reviews from database and populate with property owner, name, email, phone, and location


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get Reviews For Property


Fetch the review for a specific property


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/properties/5d725a1b7b292f5f8ceff788/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 5. Get Single Review


Fetch a review from the database by id and populate property owner, and description


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews/5d7a514b5d2c12c7449be027
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Update Review


Update review in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/reviews/5f6f07eb197aba55e160fb2d
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title": "Updated apartment"
}
```



---
[Back to top](#revie)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-09-26 16:16:12 by [docgen](https://github.com/thedevsaddam/docgen)
