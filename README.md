# Quoteables

**This project was initialized using an express generator, thus folder skeletons were auto-created**

- To run locally, the application must be connected to a MySQL or MySQL compatible database, for simplicitiy it was initially built on SQLite.
- On the web, this application has a limited database storage of 5MB, thus I clear this database every 24-48hrs.
  - If the database is full at the time of usage, submitting new quotes will appear to do nothing.
  
 /----- Summary of routes -----/
 
 Dad Jokes
  - An API called from: https://icanhazdadjoke.com/
  - Calls are random
  
 Advice
  - An API called from https://api.adviceslip.com/
  - Calls are random
  
 Inspiration
  - Connected to a MySQL database (clearDB, initialized in my application through use of the ORM Sequelize)
  - Displays whichever (randomly selected) quotes are in the database
    - Display caps at 200 characters
  - New quotes can be added on the 'Inspiration-all' route, accessed by clicking the 'View All' button
  - Quotes here can also be edited, deleted
 
 /----- Technologies Utilized -----/
  
  - HTML
  - CSS
    - Bootstrap
  - JQuery (simple animations)
  - SQL (simple CRUD)
  - NodeJS
    - Express
  - RESTful API calls
  - Jade/Pug (HTML Templates)
  
  In Progress --> Convert Bootstrap cards to React components
