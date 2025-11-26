const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:12345@cluster0.vgamzlj.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  await client.connect();

  const db = client.db("collegeDBsst");
  const students = db.collection("students");

  await students.insertMany([
    { name: "Abhinay", marks: 95 },
    { name: "Teja", marks: 88 },
    { name: "Sai", marks: 92 },
    { name: "Ravi", marks: 67 },
    { name: "Manu", marks: 85 }
  ]);

  // Find all students
  const all = await students.find().toArray();
  console.log("All students:", all);

  // Find first 2 students
  const limited = await students.find().limit(2).toArray();
  console.log("First 2 students:", limited);

  // Find all students sorted by marks descending
  const sorted = await students.find().sort({ marks: -1 }).toArray();
  console.log("Students sorted by marks (desc):", sorted);

  // Create index on name
  const indexName = await students.createIndex({ name: 1 });
  console.log("Created index:", indexName);

  // Average marks for all students
  const avg = await students.aggregate([
    { $group: { _id: null, avgMarks: { $avg: "$marks" } } }
  ]).toArray();
  console.log("Average marks:", avg);

  // Drop the students collection
  await students.drop();
  console.log("students collection dropped");

  // Drop the database
  await db.dropDatabase();
  console.log("collegeDBs database dropped");

  await client.close();
}

run();


use('collegeesssiopppp');

db.createCollection("students");

db.students.insertMany([
  { rollNo: 1, name: "Abhinay", branch: "CSE", marks: 85 },
  { rollNo: 2, name: "Teja",    branch: "ECE", marks: 78 },
  { rollNo: 3, name: "Sai",     branch: "CSE", marks: 92 },
  { rollNo: 4, name: "Ravi",    branch: "EEE", marks: 67 },
  { rollNo: 5, name: "Manu",    branch: "CSE", marks: 88 }
]);

db.students.drop();

db.dropDatabase();

use('collegeesssiopppp')

db.students.insertMany([
  { rollNo: 1, name: "Abhinay", branch: "CSE", marks: 85 },
  { rollNo: 2, name: "Teja",    branch: "ECE", marks: 78 },
  { rollNo: 3, name: "Sai",     branch: "CSE", marks: 92 },
  { rollNo: 4, name: "Ravi",    branch: "EEE", marks: 67 },
  { rollNo: 5, name: "Manu",    branch: "CSE", marks: 88 }
]);

db.students.find();
db.students.find({ branch: "CSE" });
db.students.find({}, { _id: 0, name: 1, marks: 1 });

db.students.find().limit(3);

db.students.find().sort({ marks: 1 });
db.students.find().sort({ marks: -1 });

db.students.createIndex({ rollNo: 1 });
db.students.dropIndex("rollNo_1");
db.students.createIndex({ rollNo: 1 }, { unique: true });

db.students.aggregate([
  { $group: { _id: "$branch", avgMarks: { $avg: "$marks" } } }
]);

db.students.aggregate([
  { $match: { branch: "CSE" } },
  { $sort: { marks: -1 } }
]);