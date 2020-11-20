# The task was to develop a simple UI listing the available campaigns & allow to create a new one.

To develop the interface I used React with Hooks, Material-UI & Typescript with Javascript.

The interface has two functions:
- to list the table of campaigns (using Material-UI Data Grid) and shows as many campaigns as possible in the viewport. 
To achieve that the autoPageSize prop is passed to Data Grid (allows to auto-scale the pageSize to match the container height and the max number of rows that can be displayed without a vertical scroll bar).

- to add new campaigns in a simple modal with validation on the input of name(required) to prevent users from creating “invalid” campaigns.

Alert is shown on errors with API calls.

To avoid CORS error on localhost start chrome: google-chrome --disable-web-security --user-data-dir="D:\chrome"

# API (provided) 
Attached is a small server written in Python that serves the “static” directory and exposes 2 APIs managing an internal campaign bidding system.

Change the Python APIs where necessary.
a. “/campaigns”: returns a json array of all the campaigns
b. “/new_campaign”:POST json to create a new campaigns
c. Start the server and go to “ http://localhost:5000/index.html ”
The output should be a working server, if any code was compiled, provide the source & the compiled version.

