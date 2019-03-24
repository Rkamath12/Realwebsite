//Requirements
const fire = require('firebase');
const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const firebase = require('firebase-admin');
const bodyParser = require('body-parser');

firebase.initializeApp({
    credential: firebase.credential.cert({
        projectId: 'erecipe-c0df7',
        clientEmail: 'firebase-adminsdk-yaduo@erecipe-c0df7.iam.gserviceaccount.com',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpfqrp4gmFfoZ+\nkW4ivkYJH961/8xzm/oaG2t6q0SbDGAkhTK75jY17SDtUycuiIoV4O2kGbcbLH/p\nK0AhYmtynJYXcj/YpUunRUjqxxuv4KjCt7nHZ+lKwJH63o4fqU9+kmrKD1LaV1lL\nFzE7fQcd4ea4CSWoK52sRxVz9woDwfg0vLKOeMkN/A55OqrnV3rEuxj2ZEwM3AKY\n4sUcKz9NCHa0nl4PhxQNUVSdNUVK5+fD6Xq+pmjtsIpeHnCMbd38RQ9/usvvecih\nghrv0DyC6jd9afSI4lvzcSS+5oBcfpEVCZszj9McAJBRe4cEnqTskWExww8AyhfC\n/TE8gsI/AgMBAAECggEAH/E1pXBIOCxybr8rb3JTN21WNNStHgWxBcBJiEsExCdB\nwc08/wqD0QXDEuRkwE9qgIq4R9JCw+NnDjld+RMzOsckG0oEZPlb66KlUoTxizJz\nM8wZjKdw+Up1zfmDPN6XIuwZ0tGc1oTLkOO31vkIL7TXMMcDkUmCNO62hxo9Ev1D\nqTuPIqOCQ1Rou3ueNwYVt1HZgFuQCmUom7YFws1adYv8UvdRukDrwnHCqRkWkz5e\ngmHfUNL+ntvxeiPni6mFPK7zIyClSYrOxQAOR1hv8LQvxfNtWa/dUwZY25/l3K/m\naVnu1J89/0HcPuSZPfaz2Iv9nr9E3vS2/UnXxLJBxQKBgQD+4YC52KUkpzpPBWAi\n0HV7Lpwc7zXfxbPhiXOWZwOVI8ibmHWDXRAIubCEgXTG2FtGZXVAQnAONG/cOccC\nT1ohgudhbMitqQwYKaTnM4jaOr8iLXymOtVLbjOvh8a8chZV1+PILKYmVS4Ebd+d\n4fHqVuXiXmvPQCARWzKCQL4AywKBgQDqhSA8NL6kw08zvcxZVA0NAmySDwDW7ZAt\n8Rs4cxP0fWKUxNLJjGX/R+CvXHKt+vBKX1BjPYNsRjFhSWhqNeh+hUSAJJHZ6WWr\nynYSW9idfAEYa7Cex+JnmUeu+w274BPSwMHSyGCvJYow1nbi/pzbuoX8L0X0znQH\n+c6Qs3DZ3QKBgD5bqYTOjkjTaR6gMA8UdUm385XYqJOg6QuK926asXOxl4kJ2eZT\nxHJ+C8O/cHSdxmcIt5ELMCMpjRySPjBAfcqpHjblyItESqM2vRObtiW+LbkM6+w3\nhKu5wId3bpX4S6Kg+SemVNgYCvQmdYlJGEi/Des+Mp44ECBu8YKQmGvVAoGARuZK\nUYlMnXkiZ60Yq2TasTUrZ5i7kz6s2QbMSOuZe8+wTvOWGjKk32F2ju1vCiQUIxff\nsLD3G3O5GAVeWMXFbQKTK/5iTbPe9em2emRj/3Bu0Fg2RDp/uvw/DKp/g24B8DQw\nJK5JdInv1kXwGT4KY+9m9E/CYXlM4OBnz51AH80CgYEAq1I7cRpN4iQq7JTKKa93\nUGTJtb5k03aT0khtB0rrFmIaAXECXuYfqdB0nREVlQZsCHuStWS8R512h4Or5Myn\nvU7EQDjje935Kb1etHGI7XuA0FBMdJn3IocPAeRQx5JPIgm57DAgAaCfZvG6qjn8\nAHCG1pXwO8OC7N4bDs8YVEg=\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://erecipe-c0df7.firebaseio.com"
},'admin');

//Initialization
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const index = express();
index.engine('hbs', engines.handlebars);
index.set('views', './views');
index.set('view engine', 'hbs');


index.use(bodyParser.urlencoded({
    extended:true
}));

index.use(bodyParser.json())


//HTTPS GET requests
    //Index render at '/'
index.get('/',(request,response) => {
    response.render('index');
});

//HTTPS POST requests
    //Database interaction when recieving data
index.post('/',(request, response) => {
    addRecipe(request.body.name,request.body.id,request.body.user,request.body.cuisine,request.body.time,
        request.body.serving,request.body.ingredients,request.body.difficulty,request.body.procedure);
        response.send("200 OK");
})

index.post('/update',(req,res)=>{
    updateRating(req.body.key,req.body.value_rating)
    res.send("200 OK")
})

//Database
var database = firebase.database();
var db = firebase.firestore();
var recipeRef = db.collection('recipes');

function addRecipe(name, id, user, cuisine, time, serving, ingredients, difficulty, procedure){
    var addDoc = db.collection('recipes').add({
        name: name,
        id: id,
        user: user,
        cuisine: cuisine,
        time: time,
        serving: serving,
        ingredients: ingredients,
        difficulty: difficulty,
        procedure: procedure,
        num_rating: 0,
        total_rating: 0
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        return 1;
      });
}

//Authentication

var provider = new fire.auth.GoogleAuthProvider();
function googleLogin(){
    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        return 1;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}




//Get Rating

function getRating(total_rating, num_rating){
    rating = total_rating/num_rating
    return rating
}

//Update Rating
function updateRating(key,value_rating){
    var recipeRating = db.collection('recipes').doc(key)
    var transaction = db.runTransaction(t => {
        return t.get(recipeRating)
          .then(doc => {
            var new_num_rating = doc.data().num_rating + 1;
            t.update(recipeRating, {num_rating:new_num_rating});
            var new_total_rating = doc.data().total_rating + value_rating;
            t.update(recipeRating, {total_rating:new_total_rating});
            return 1;
          });
      }).then(result => {
        console.log('Transaction success!');
        return 1;
      }).catch(err => {
        console.log('Transaction failure:', err);
      });
}

//Filter

function filterResults(ingredients){
    var recipes = db.collection('recipe');
    ingredients.forEach(element => {
        recipes = recipes.where('ingredients','array-contains',element)
    });
    return recipes
}

//Search

function searchResults(name){
    var recipes = db.collection('recipe').where('name','==', name)
    return recipes
}


//Exporting 
exports.index = functions.https.onRequest(index);

<script src="https://apis.google.com/js/platform.js" async defer></script>