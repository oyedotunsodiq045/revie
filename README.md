# Revie

> Propery listing api - an assessment by Sodiq Oyedotun for iQube Labs.

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

| Routes                                                                                 | Description                 |
| -------------------------------------------------------------------------------------- | --------------------------- |
| Authentication                                                                         |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/auth/register                                         | Register a user             |
| Properties                                                                             |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/properties                                            | Create New Property         |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties                                             | Get All Properties          |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties/radius/:zipcode/:distance                   | Get Properties By Distance  |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties/:id                                         | Get Single Property         |
| PUT &nbsp; &nbsp; &nbsp; api/v1/properties/:id                                         | Update Property             |
| DELETE &nbsp; &nbsp; &nbsp; api/v1/properties/:id                                      | Delete Property             |
| When you delete a property all the apartments listed for that property is also deleted | Note                        |
| Apartments                                                                             |                             |
| POST &nbsp; &nbsp; &nbsp; api/v1/properties/propertyId/apartments                      | Create Property Apartment   |
| GET &nbsp; &nbsp; &nbsp; api/v1/apartments                                             | Get All Apartments          |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties/propertyId/apartments                       | Get Apartments For Property |
| GET &nbsp; &nbsp; &nbsp; api/v1/apartments/:id                                         | Get Single Apartment        |
| PUT &nbsp; &nbsp; &nbsp; api/v1/apartments/:id                                         | Update Apartment            |
| DELETE &nbsp; &nbsp; &nbsp; api/v1/apartments/:id                                      | Delete Apartment            |
| Reviews                                                                                |                             |
| Users                                                                                  |                             |
