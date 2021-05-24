# Entry Task, Web FE (Black Cat)

## Setup Instructions

- Open terminal and run `git clone gitlab@git.garena.com:dianhao.yap/entry-task.git`.
- Run `npm install`
- Open a terminal / VS Code terminal window and run `npm run dev` for starting the backend mock API.
- Open another terminal / VS Code terminal and run `npm start` to start the frontend. `localhost:3000` should start in a browswer page.

## API Documentation

- `/api/users`: returns all users in the database.
- `/api/events`: returns all events in the database.
- `/api/events/:limit/:offset`: retrieves the events in the database, starting from the `limit`-th event and fetch the next `offset` of them.
- `/api/events/today`:
- `/api/events/tomorrow`:
- `/api/events/thisweek`:
- `/api/events/thismonth`:
- `/api/events/later`:
- `/api/events/channels`:
- `/api/events/:channelName`:
