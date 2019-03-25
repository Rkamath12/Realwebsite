const functions = require('firebase-functions');
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: firebase.credential.cert({
        projectId: 'erecipe-c0df7',
        clientEmail: 'firebase-adminsdk-yaduo@erecipe-c0df7.iam.gserviceaccount.com',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpfqrp4gmFfoZ+\nkW4ivkYJH961/8xzm/oaG2t6q0SbDGAkhTK75jY17SDtUycuiIoV4O2kGbcbLH/p\nK0AhYmtynJYXcj/YpUunRUjqxxuv4KjCt7nHZ+lKwJH63o4fqU9+kmrKD1LaV1lL\nFzE7fQcd4ea4CSWoK52sRxVz9woDwfg0vLKOeMkN/A55OqrnV3rEuxj2ZEwM3AKY\n4sUcKz9NCHa0nl4PhxQNUVSdNUVK5+fD6Xq+pmjtsIpeHnCMbd38RQ9/usvvecih\nghrv0DyC6jd9afSI4lvzcSS+5oBcfpEVCZszj9McAJBRe4cEnqTskWExww8AyhfC\n/TE8gsI/AgMBAAECggEAH/E1pXBIOCxybr8rb3JTN21WNNStHgWxBcBJiEsExCdB\nwc08/wqD0QXDEuRkwE9qgIq4R9JCw+NnDjld+RMzOsckG0oEZPlb66KlUoTxizJz\nM8wZjKdw+Up1zfmDPN6XIuwZ0tGc1oTLkOO31vkIL7TXMMcDkUmCNO62hxo9Ev1D\nqTuPIqOCQ1Rou3ueNwYVt1HZgFuQCmUom7YFws1adYv8UvdRukDrwnHCqRkWkz5e\ngmHfUNL+ntvxeiPni6mFPK7zIyClSYrOxQAOR1hv8LQvxfNtWa/dUwZY25/l3K/m\naVnu1J89/0HcPuSZPfaz2Iv9nr9E3vS2/UnXxLJBxQKBgQD+4YC52KUkpzpPBWAi\n0HV7Lpwc7zXfxbPhiXOWZwOVI8ibmHWDXRAIubCEgXTG2FtGZXVAQnAONG/cOccC\nT1ohgudhbMitqQwYKaTnM4jaOr8iLXymOtVLbjOvh8a8chZV1+PILKYmVS4Ebd+d\n4fHqVuXiXmvPQCARWzKCQL4AywKBgQDqhSA8NL6kw08zvcxZVA0NAmySDwDW7ZAt\n8Rs4cxP0fWKUxNLJjGX/R+CvXHKt+vBKX1BjPYNsRjFhSWhqNeh+hUSAJJHZ6WWr\nynYSW9idfAEYa7Cex+JnmUeu+w274BPSwMHSyGCvJYow1nbi/pzbuoX8L0X0znQH\n+c6Qs3DZ3QKBgD5bqYTOjkjTaR6gMA8UdUm385XYqJOg6QuK926asXOxl4kJ2eZT\nxHJ+C8O/cHSdxmcIt5ELMCMpjRySPjBAfcqpHjblyItESqM2vRObtiW+LbkM6+w3\nhKu5wId3bpX4S6Kg+SemVNgYCvQmdYlJGEi/Des+Mp44ECBu8YKQmGvVAoGARuZK\nUYlMnXkiZ60Yq2TasTUrZ5i7kz6s2QbMSOuZe8+wTvOWGjKk32F2ju1vCiQUIxff\nsLD3G3O5GAVeWMXFbQKTK/5iTbPe9em2emRj/3Bu0Fg2RDp/uvw/DKp/g24B8DQw\nJK5JdInv1kXwGT4KY+9m9E/CYXlM4OBnz51AH80CgYEAq1I7cRpN4iQq7JTKKa93\nUGTJtb5k03aT0khtB0rrFmIaAXECXuYfqdB0nREVlQZsCHuStWS8R512h4Or5Myn\nvU7EQDjje935Kb1etHGI7XuA0FBMdJn3IocPAeRQx5JPIgm57DAgAaCfZvG6qjn8\nAHCG1pXwO8OC7N4bDs8YVEg=\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://erecipe-c0df7.firebaseio.com"
},'admin');

var messagesRef = firebase.database().ref('messages');

document.getElementById('Form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
var cooking time = getInputVal('cooking time');
var prep time = getInputVal('prep time');
var difficulty = getInputVal('difficulty');
var cuisine = getInputVal('cuisine');
var ingredients= getInputVal('ingredients');
var procudure = getInputVal('procudure');
var file upload = getInputVal('file upload');
  
  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name,cooking time,prep time,difficulty,cuisine,serving size,ingredients,procudure,file upload){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
name:name
cooking time:cooking time
prep time:prep time
difficulty:difficulty
cuisine:cuisine
serving size:ingredients
ingredients:ingredients
procudure:procudure
file upload:file upload
  });

//Exporting 
exports.index = functions.https.onRequest(index);

