## Overview

- Use the RADIO framework

## Requirements

- Divide this into functional requirements (absolutely required core flow) and non-functional requirements (performance and scalability)
- Other questions to consider:
  - Devices to support
  - Who are the main users?
  - What are the performance requirements?

## Architecture

- Focus on the frontend architecture
  - Server as a black box
  - View is for the frontend components with subviews - basically what the user sees
  - Controller is what responds to user interactions. All user interaction goes from view to controller to server, and all data go from server to controller then to view.
  - Store is where the data lives. For interview purpose, this tends to be app-wide. Think about it as redux store.

## Data model

- Define the data that we need in the app
  - Make sure to distinguish between server-originated data and client-originated data
  - Be prepared to add more fields as you go along

## Interface definition

- Define the calls to be made to the API and define their methods (HTTP, GraphQL, etc)
- Individual calls can do either REST API or GraphQL
  - Use REST API when we need a structure. REST uses HTTP verbs to deal with data. REST is better when you have a smaller application with less complex data, or all clients use similar data and operation (so for example, if web and mobile of my app use similar requests and responses, REST might be better).
  - Use GraphQL when we need flexibility for complex data. GraphQL uses query to get read-only data, and it also contains subscription to receive streaming data. Using GraphQL is better when your requests/responses vary significantly from one another, you have multiple data sources that you merge at the API level, or you have limited bandwidth so you want to minimize the number of requests
- Continuous communication can do Long Polling, Websockets or Server Sent Events
  - Short polling: At short intervals, client requests info from server. Server returns it if it's available.
  - Long polling: Client sends request to server, the server then holds the request until it becomes available. Then, client requests again to the server immediately afterwards. The server then does the same thing. This is easy to implement but creating a new connection every time is costly for the server.
  - Websockets: single, long-lived communication between client and server. Both sides can send data through websockets. This has low latency. Heartbeats are often used to determine if the connection is still good. Terminated conditions don't automatically recovered for websockets though.
  - Server Sent Events: Push server updates to client (One way). So ideal for when client needs to be updated real-time without sending data to the server. Think of this as a regular HTTP request where the server doesn't finish after sending back the response, but instead keeps trickling down different responses over time. Advantage of SSE is that it is transported through simple HTTP protocol instead of a custom one

## Optimization

- Performance
  - Splitting Javascript code so that each page/component will only load JS and CSS files that are required for that specific page/component
  - Lazy loading within a page - only load the essentials upon initialization, then keep loading the rest in parallel as the user starts interacting. There can be multiple layers of lazy loading, where each layer of more importance gets loaded first
  - Infinite scrolling for feeds: Implement a "scroll" event listener that fires once the scrollbar is past a certain threshold, then fetch the next set of items. But this has a problem - As more items get attached to the store, the DOM keeps increasing and slows down the page. So implement virtualized lists, where you only render posts that are within the viewport.
- User Experience
  - Shimmer loading indicators instead of a spinner to show the general outline of the page while still indicating that we're fetching the data
  - Remind users to refresh the page if the content is real-time so that they know to fresh for new contents.
  - Keyboard shortcuts
  - Tabbing between contents and buttons
- Network
- Accessibility
  - Colour contrast
- Multilingual support
- Multi-device support
- Security
