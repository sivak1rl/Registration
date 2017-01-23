# Registration
The most important thing to note when attempting to publish this application is that the connection string to the database will need to be changed, and the database will need to be updated to use the correct schema. The included '*.sql' files, when run in numeric order, will create the database and tables.

In the application's web.config file, it is important to change the connection string near the bottom between the "<connectionStrings>" and "</connectionStrings>" tags. Be sure to change the 'data source=VANESSA\SQLEXPRESS' to the DB Server you will be using, and if you've changed the name of the database (I named it CourseRegistration) change it appropriately in the 'initial catalog' section of the connection string. This connection string assumes that the user running the application will have read and write access to the database.

Important note: when a Student is logging into this app, they will user their Student Id, e.g., in the sample data, the numbers like 100010 or 100019. In addition, a password must be provided. The password does not have any requirements though. Just type whatever you want into the password field, and it will allow you to "login".

Everything else in the application should work without any change.
