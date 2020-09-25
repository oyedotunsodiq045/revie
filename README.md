# Revie

> Revie is a hypothetical platform where users can sign up with their basic information and post reviews about apartments they've previously lived in. These reviews can include optional videos and/or images. The users can give reviews about the landlords, the environment the apartment is situated, and the quality of amenities in the apartment. These reviews can be uniquely marked as helpful by random visitors of the platform. Visitors can also sort these reviews based on the most helpful(by count) or most recent.

## Quick Start

```bash
# Install dependencies
npm i

# Install dev-dependencies
npm i -D nodemon

# Serve on localhost:5000 (development)
npm run dev

# Serve on localhost:5000 (production)
npm start

# Import sample data into mongodb
node seeder -i

# Delete data from mongodb
node seeder -d
```

### Testing

| Routes                                                                      | Description                 |
| --------------------------------------------------------------------------- | --------------------------- |
| Authentication                                                              |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/auth/register                              | Register a user             |
|                                                                             |                             |
| Properties                                                                  |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/properties                                 | Create New Property         |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties                           | Get All Properties          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties/radius/:zipcode/:distance | Get Properties By Distance  |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties/:id                       | Get Single Property         |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties/:id                       | Update Property             |
| DELETE &nbsp;api/v1/properties/:id                                          | Delete Property             |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties/:id/photo                 | Upload Photo                |
|                                                                             |                             |
| Apartments                                                                  |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/properties/propertyId/apartments           | Create Property Apartment   |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/apartments                           | Get All Apartments          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/properties/propertyId/apartments     | Get Apartments For Property |
| GET &nbsp; &nbsp; &nbsp; &nbsp; api/v1/apartments/:id                       | Get Single Apartment        |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; api/v1/apartments/:id                       | Update Apartment            |
| DELETE &nbsp;api/v1/apartments/:id                                          | Delete Apartment            |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; api/v1/apartments/:id/photo                        | Upload Photo                |
|                                                                             |                             |
| Reviews                                                                     |                             |
|                                                                             |                             |
| Users                                                                       |                             |
