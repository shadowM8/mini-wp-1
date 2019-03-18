# mini wp

## Simple Word-Press

### Word-Press web-app built with Mongoose, Express, and JQuery

## EndPoint List

**user route**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/users/register|POST|none|email = body.email(String), password = body.password(String), role = body.role(String), fullName = body.fullName(String)|register for new user|
|/users/login|POST|none|email = body.email(String), password = body.password(String)|endpoint for user login into app|
|/users/googleauth|POST|none|idToken = body.idToken(String)|endpoint for GoogleSignIn |
|/users/|GET|token|none|fetch all user data (authenticated user only)|

<br>

**article route**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/articles/|POST|token|title = body.title(String), description = body.description(String), content = body.content(String), tags = body.tags(String) , author = user.id(String)|create new article (registered user only)|
|/articles/|GET|token| title = query.title(String)| get all articles  (registered user only)|
|/articles/:id|GET|token| id = params.id(String)| find specific article (registered user only)|
|/articles/:id|PUT|token| id = params.id(String), title = body.title(String), description = body.description(String), content = body.content(String), tags = body.tags(String) , author = user.id(String) | update specific article (owner of specific task only)|
|/articles/:id|DELETE|token| id = params.id(String) | delete specific article (owner of specific task only)|

<br>



**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

server : http://35.197.158.62 
client : http://mini-wp.greensnorlax.xyz/