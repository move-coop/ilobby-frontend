### 1. What was the goal and what were the requirements?
The goal was to create an MVP for a tool to explore state legislators and to take and track action towards them on a legislative campaign.
Here is the [original pitch deck](https://docs.google.com/presentation/d/1ysjUC7hWQ2r5MOTxKt7yuFZpMtZg2H_W1nobDoV0woI/edit#slide=id.p). 

### 2. How does the work meet (or not meet) the goal and requirements?
The work meets the primary goals:
* Users can browse and filter a list of elected officials and a map of their districts
* Users can select one or more legislators
* Users can take and track action towards those legislators and associate those actions with a specific legislative campaign

The key incomplete MVP feature relates to user accounts: 
Auto-login functionality, which looks for a valid token in `localStorage` and, finding one, allows a session to continue until a user logs out, is buggy. It seems to stem from a backend problem decoding tokens, and is currently disabled. 
As a result, in the version deployed here (ilobby.thisjames.com) has these conditions:
Users are automatically logged into a dummy account `james@thisjames.com`.
Users can log out and signup or sign in with a separate account, but the user-data loaded will still be that which is associated with the default dummy account, and a hard refresh will switch the user back to the dummy account.

### 3. How does it work? (big picture: think about how you would describe this to someone who was going to review the code or add functionality, to get them started) 
The back and front ends are deployed separately from each other.

The backend is a Rails API that serves up both reference data that is universal for all users, and campaign-specific, user-generated data that is private to each user account. The reference data comes from the Open States API, which regularly scrapes the websites of state legislatures and maintains a GraphQL database of each legislative, its chambers, members, committees, districts and so forth. A seed file contains scripts to query Open States, parse the response and populate the iLobby backend (Postgres) database. This must be run manually by a developer to capture any updates to Open States’ data. A collection of Twitter handles has also been manually collected for legislators and stored in the db. The user-generated data is akin to a CRM and has 4 related tables campaigns, actions, calls, call lists.

The front end is a single-page React / Redux app. Users can sign up and log in with a JWT-encrypted password. Upon user validation, the app queries the backend and loads all the reference data and campaign data specific to the current user. *(See note above about incomplete user-related functionality).*
From there, users can browse elected officials and see their political districts visualized using the Google Maps API. 
Users can view a profile modal of each elected official that includes their contact information, committee assignments and an embedded Twitter feed.
Users can filter elected officials by name, district, party, chamber and committee assignment. Filters impact both the list and the rendering of districts on the map. This is achieved by toggling a visibility value on each legislator stored in array in the store from which both the textual list component and the map polygons are rendered.
The map will automatically zoom in as far as it can to show all the districts that match the filter criteria.
The map has hover functionality, that highlights the currently moused-over district and displays the district’s legislator the the upper left of the map.
The map also has click functionality to zoom / unzoom on a specific district.
Users can also select legislators to include in an action. There is a select all / select none button that applies to all current filter results. 
If one or more legislators are selected, users can click the “Take Action” button which opens a modal to select a campaign and an action to take.
The MVP includes just one action, which is to generate a call list.
Users can use call lists to track calls made to legislators’ offices and the outcomes of those calls. 
A Campaigns dashboard allows for the browsing, filtering, creation, editing and deletion of campaigns and call lists.

### 4. Who did you work on this with, and which parts were you responsible for? (If there is no commit or ticket history to review, please be extra explicit here)
This was a solo engineering project. 
I wrote a [blog post](https://medium.com/swlh/four-foundational-lessons-from-solo-coding-f47a306b0a34?source=friends_link&sk=298c99ab8ce0be939e80040b2ae051f8) on some learnings from solo-coding.
A lot of the domain knowledge and some of the design ideas come from years of work at the Advocacy institute, collaborating with many grassroots and community organizations lobbying for social justice legislation.

### 5. If you were to do it again, what would you do differently? OR, If you could spend more time, what would you add/improve? 
I generally think this is off to a strong start. 
The point was to create a robust foundation for exploring and selecting legislators, upon which other features and datasets could be layered.

The current roadmap, which is loosely articulated through [this Trello board](https://trello.com/b/9C6jGF7k/ilobby), prioritizes these updates and new features
* Account and Login Functionality: fix bug with auto-login and allow for proper storage and retrieval of user data for each account
* Implement a forgotten password / password reset feature
* Implement better error catching, which is missing in some key places
* Implement test coverage. There is none currently and this should be backfilled before scaling the project much further
* Refactor the reducer and some components with overlapping functionality
* Add the ability to add staffers to the database and select them for taking action
* Add administrative tools to manage data updates for specific admin users
* Create more forms of action that users can take, including scheduling and tracking meetings with elected officials, tweeting at and sending emails to elected officials and staff
* Ability to add custom notes to elected officials and share them with allied users
* Ability to browse multiple states. The initial version was built using data for New York. The app can be rewired for another state by changing just a handful of variables on the backend. Expose this capability to the user.
*  Include data sets about votes on legislative bills, election results and campaign finance history.

### 6. How do I run this code on my own webserver so I can try it out?
See Existing Readme 
