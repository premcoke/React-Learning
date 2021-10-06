const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


const uri = "mongodb+srv://premkumar_madhanraj:Hubl3231@logindetails.psxb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function getDetails(value) {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const result = await client.db('LoginDetails').collection('LoginValues').findOne(value);
        return { loginDetails: result };
    } catch (error) {
        return { error: error.message };
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function addUser(details) {
    try {
        // Connect to the MongoDB cluster
        const emailChecker = await getDetails({email: details.email});
        if (emailChecker.loginDetails != null) {
            throw new Error('Email id already exist');
        }
        const mobileChecker = await getDetails({mobile: details.mobile});
        console.log(mobileChecker);
        if (mobileChecker.loginDetails != null) {
            throw new Error('Mobile number already exist');
        }
        await client.connect();
        const dataObject = {
            name: details.name,
            mobile: details.mobile,
            isVerified: details.isVerified,
            passWord: details.passWord,
            email: details.email,
            type: details.type
        };
        const result = await client.db('LoginDetails').collection('Sample_Test').insertOne(dataObject);
        return { updated: result };
    } catch (error) {
        return { error: error.message };
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

app.post("/api/loginDetails", async (req, res) => {
    res.send(await getDetails({email: req.body.email}));
    res.end();
});

app.post("/api/addUser", async (req, res) => {
    console.log(req.body.details);
    res.send(await addUser(req.body.details));
    res.end();
});

app.listen(5000);
