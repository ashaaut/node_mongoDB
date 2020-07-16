const MongoClient=require('mongodb').MongoClient
const dboper=require('./operations')
const assert=require('assert')
const url="mongodb://localhost:27017";
const dbname="confusion";

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log("correctly connected to server");
    const db=client.db(dbname);
    // const collection=db.collection('dishes')

    dboper.insertDocument(db,{"name":"vikas","village":"shirasi"},"dishes",(result)=>{
        console.log("Insert Document: \n",result.ops)
    })
    dboper.findDocuments(db,"dishes",(docs)=>{
        console.log("Found Documents:\n",docs)
    })
    dboper.updateDocument(db,{"name":"vikas"},{"village":"mangalwedha"},"dishes",(result)=>{
        console.log("Updated Document:\n", result.result);
        
    })
    dboper.findDocuments(db,"dishes",(docs)=>{
        console.log(" Updated Found Documents:\n",docs)
    })
    db.dropCollection("dishes", (result) => {
        console.log("Dropped Collection: ", result);

        client.close();
    });
})