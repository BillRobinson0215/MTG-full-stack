MTG Full-Stack-Project

### Deployed Site

https://billrobinson0215.github.io/MTG-Full-Stack-Client

### Deployment Requirements
1.  [√]  Host on your public Github page, not Github Enterprise.
2.  [√]  Deploy client application on GH pages.
3.  [√]  Deploy server application on Heroku.

### Documentation Requirements
1. [√]  Create 2 Github repos (one for your front-end and one for your back-end)
2. [√] Front end README.md must include wireframes and user stories.
3. [√]  Back end README.md must include link or visual of Entity Relationship Diagram (ERD).
4. [√]  Both README.md must include an explanation of the app.
5. [√]  Both README.md must include a link the deployed application.

### Auth Specifications 
1.  [√] User must be able to sign up
2.  [√] User must be able to sign in
3.  [√] Signed in user must be able to sign out
4.  [√] Signed in user user must be able to start a tic tac toe game
5.  [√] Signup and Signin must only be available to not signed in users.
6.  [√] Logout and Change password must only be available to signed in users.
7.  [√] Give feedback to the user after each action's success or failure.
8.  [√] All forms must clear after submit success and user sign-out

### CRUD Specifications 
1. [√]  User must be able to create a new resource
2. [√]  User must be able to update a resource
3. [√]  User must be able to delete a resource
4. [√]  User must be able to view a single or multiple resource(s)
5. [√]  All resource actions that change data must only be available to a signed in user.
6. [√]  Give feedback to the user after each action's success or failure.
7. [√]  All forms must clear after submit success and user sign-out

### API Requirements

1. [√] Build an API using Express and Mongodb.
2. [√] Create at least 4 RESTful routes for handling GET, POST, PUT/PATCH, and DELETE requests.
3. [√] Any actions which change data must be authenticated and the data must be "owned" by the user performing the change.
4. [√] Have at least 1 resource that has a relationship to User

### site link:


### User Stories
User Stories:
Users should be able to create an account
Users should be able to sign in
Signed in users should be able to change their password
Signed in users should be able to sign out
Signed in users should be able to add cards to their collections
Signed in users should be able to see their collections and update them in real time

### Site Overview

This Trading Card Game collection tracking app allows users to digitally track their card collections. By creating an account uses are provided a blank collection that they are then able to add cards to. 

Once cards are added to the users collection the collection box will show the cards in the collection and a button allowing the user to remove the card from their collection.

### Entity Relationship

ERD:

!['ERD'](photos/ERD.png)
