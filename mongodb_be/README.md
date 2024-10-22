# MongoDB - Notes
MongoDB is a popular NoSQL database known for its flexibility, scalability, and performance.

## Basic Concepts:
- **Document-Oriented**: Stores data in flexible JSON-like documents, making it ideal for complex, hierarchical data structures.
- **Schema-Less**: Allows for dynamic data structures, making it easier to adapt to changing requirements.
- **Collections**: Groups of related documents, similar to tables in relational databases.
- **BSON**: The binary representation of JSON used by MongoDB for efficient storage and retrieval.



## Mongoose 
Mongoose is a popular **Object-Data Modeling (ODM)** library for MongoDB in Node.js. It provides a way to interact with MongoDB databases using a more object-oriented approach,
making it easier to work with MongoDB in Node.js applications.


### Key Features :

- **Model Definition**: You define schemas that represent your data structures.
- **Document Creation:** Mongoose automatically converts JavaScript objects into MongoDB documents.
- **Querying:** Provides a fluent API for querying MongoDB collections.
- **Validation:** Enforces data validation rules on your models.
- **Middleware:** Allows you to customize the behavior of Mongoose operations.
- **Plugins:** Extends Mongoose's functionality with plugins.
 
 ### Using Mongoose 

 1.Connect to the MongoDB database.

```js
const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/db_name`);
//mongoose.connect(`mongodb://localhost:27017`)
```

2. Define a schema for the User document with properties like name and age.
```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});
```

3. Create a Mongoose model for the User schema.
- Model actually represents the data structure defined in schema like use in this case.
- User (model) is actually a js class just like schema is an object.
```js
const User = mongoose.model('User', userSchema);
```

4. Create a new user object with data, aka creating a **document**
```js
const newUser = new User({ 
    name:   'John Doe',
    age: 30 
    });
 ```

 ## MongoDB CRUD Operations Cheat Sheet
 - can use models (in mongoose in place of collection)

### 1. Create (Insert Documents)

#### Insert a Single Document:
- Used to add one document to a collection.
```js
db.collection.insertOne({ field1: "value1", field2: "value2" })
```

#### Insert Multiple Documents:
- Allows inserting more than one document at once.
- An array of objects.
```js
db.collection.insertMany([
  { field1: "value1", field2: "value2" },
  { field1: "value3", field2: "value4" }
])

```

---

### 2. Read (Query Documents)

#### Find All Documents in a Collection:
- Retrieves all documents from a collection.
```js
db.collection.find()
```

#### Find Documents Matching a Query:
- Finds documents that match a specific query/filter.
- query is key:value pair of object.
```js
db.collection.find({ field1: "value1" })
```

#### Find One Document Matching a Query:
- Returns the first document that matches the specified filter.
```js
db.collection.findOne({ field1: "value1" })
```

---

### 3. Update (Modify Documents)

#### Update a Single Document:
- Modifies the first document that matches the filter criteria.
```js
db.collection.updateOne(
  { field1: "value1" }, // Filter
  { $set: { field2: "newValue" } } // Update
)
```

#### Update Multiple Documents:
- Updates all documents that match the specified filter.
```js
db.collection.updateMany(
  { field1: "value1" }, // Filter
  { $set: { field2: "newValue" } } // Update
)

```

#### Find One and Update:
- Finds a document and updates it, returning the updated document.
```js
db.collection.findOneAndUpdate(
  { field1: "value1" }, // Filter
  { $set: { field2: "newValue" } }, // Update
  { returnNewDocument: true } // Return the updated document
)

```

---

### 4. Delete (Remove Documents)

#### Delete a Single Document:
- Removes the first document that matches the filter.
```js
db.collection.deleteOne({ field1: "value1" })
```

#### Delete Multiple Documents:
- Deletes all documents that match the given criteria.
```js
db.collection.deleteMany({ field1: "value1" })
```

---

### 5. Additional Operations

#### Count Documents Matching a Query:
- Returns the count of documents matching a query.
```js
db.collection.countDocuments({ field1: "value1" })

```

#### Sort Documents:
- Sorts documents in either ascending or descending order based on a field.
```js
db.collection.find().sort({ field1: 1 }) 
// 1 for ascending, -1 for descending
```

---

### Notes:
- MongoDB uses JSON-like documents for CRUD operations.
- `$set` is a common operator for updating fields.
- Error handling is important when performing CRUD operations in production.



