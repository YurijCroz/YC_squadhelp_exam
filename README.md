### start project
start-dev.sh
#### or
sudo docker-compose --file docker-compose-dev.yaml up
### moderator account
#### login:
moderator@gmail.com
#### pass:
moderator
### bank card
#### Name:
yriy
#### Card Number:
4111 1111 1111 1111
#### Expires:
09/26
#### CVC:
505
### Other accounts are created by hand :)

#### Initial commit: [Link](https://github.com/YurijCroz/YC_squadhelp_exam/tree/a7465087e0518b52f2da840b6b3b024b9bc59244)

### Progress report:
#### FrontEnd:
+ Editing styles of all pages and components, including adaptive design.
+ Creating components for repetitive blocks.
+ Creating components/functions for complex blocks.
+ Creating components for the new "How It Works" page.
+ Creating components for the new "Events" page, including timer logic,
  localStorage functionality, and notification upon timer completion.
+ Creating the ButtonGroup component.
#### BackEnd:
+ Organizing files.
+ Removing errors that prevented the server from starting.
+ Adding error logger.
+ Adding daily log backups with a change in the log format.
#### FullStack:
+ Adding the moderator role, where contests and offers go through
  moderation before publication.
+ Utilized ready-made components as much as possible and edited them
  to remove unnecessary features for moderators.
  Moderator decisions are sent to the user's email.
+ Moving the chat from MongoDB to PostgreSQL and creating controllers
  so that the client-side code didn't need to be extensively rewritten.
+ Fixing websocket functionality.
+ Implementing refreshToken. The token is stored in the Users table
  in the database's corresponding column, so the account can only
  be connected to one device.