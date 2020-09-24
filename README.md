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

| Routes                                                               | Description                |
| -------------------------------------------------------------------- | -------------------------- |
| POST &nbsp; &nbsp; &nbsp; api/v1/auth/register                       | Register a user            |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties                           | Get All Properties         |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties/radius/:zipcode/:distance | Get Properties By Distance |
| GET &nbsp; &nbsp; &nbsp; api/v1/properties                           | Get Single Property        |
| PUT &nbsp; &nbsp; &nbsp; api/v1/properties                           | Update Property            |
| DELETE &nbsp; &nbsp; &nbsp; api/v1/properties                        | Delete Property            |
