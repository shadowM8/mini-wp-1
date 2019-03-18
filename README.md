# mini wp

## Simple Word-Press

### Word-Press web-app built with Mongoose, Express, and JQuery

## EndPoint List

**user route**

Route|HTTP|Header(s)|Request|Description|Response
|---|---|---|---|---|---|
|/users/register|POST|none|`body`: `{ email: 'anton@mail.com', password: 'secret' , fullName: 'anton wibisono' }`|register for new user| `201`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword' }`
|/users/login|POST|none|`body`: `{ email: 'anton@mail.com', password: 'secret'}`|endpoint for user login into app| `200`:`{token : ... }`
|/users/googleauth|POST|none|`body`:`{idToken: 'hashed by google'}`|endpoint for GoogleSignIn |none
|/users/|GET|token|none|fetch all user data (authenticated user only)|`200`:`[{_id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword'}, {_id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword'} ]`

<br>

**article route**

Route|HTTP|Header(s)|Request|Description|Response
|---|---|---|---|---|---|
|/articles/|POST|token|`body`: `{ title: 'article title', description: 'article short description' , content: 'article content', tags: '[article tag, article tag, ...], author: 'user.id' }`|create new article (registered user only)|`201`:`{ _id: ObjectId(''), title: 'article title', description: 'article short description' , content: 'article content', tags: '[article tag, article tag, ...], author: 'user.id'}`
|/articles/|GET|token|`query`:`{title: 'searched title'}` | get all articles  (registered user only)|`200`:`[{ _id: ObjectId(''),title: 'searched title, description: 'article short description' , content: 'article content', tags: '[article tag, article tag, ...], author: 'user.id'}]`
|/articles/:id|GET|token|`params`:`{id: 'article id'}`| find specific article (registered user only)|`200`:`{ _id: ObjectId(''),title: 'searched title, description: 'article short description' , content: 'article content', tags: '[article tag, article tag, ...], author: 'user.id'}`
|/articles/:id|PUT|token|`params`:`{id: 'article id'}`,`body`: `{ title: 'updated article title', description: ' updated article short description' , content: 'updated article content', tags: '[ updated article tag, article tag, ...], author: 'user.id' }` | update specific article (owner of specific task only)| `200`:`{ title: 'updated article title', description: ' updated article short description' , content: 'updated article content', tags: '[ updated article tag, article tag, ...], author: 'user.id' }`
|/articles/:id|DELETE|token|`params`:`{id: 'article id'}`| delete specific article (owner of specific task only)|`200`:`{ title: 'deleted article title', description: ' deleted article short description' , content: 'deleted article content', tags: '[ deleted article tag, article tag, ...], author: 'user.id' }`

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