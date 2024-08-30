## Overview

- Use the RADIO framework
- Start off with asking what the expected outcome is - I know it's up to me to define these, but there must be certain overview of what you expect to see at the end of this. What would that be? Is it more data flow centred?

## Requirements

- Divide this into functional requirements (absolutely required core flow) and non-functional requirements (performance and scalability)
  - Functional requirements: Should contain important info like what the UI should look like and what each major component should do and how the user is supposed to interact with the documents and what kinds of data types are supported - Think about what IT SHOULD DO as a part of its core functionalities E.G infinite scrolling, core functionalities, etc
  - Non-functional: Browsers to be supported, devices (or screen sizes) to support, performance requirements (e.g. should it work with short network band? How fast should it load?), offline mode (application loads images that are already loaded even if it goes offline)
- Other questions to consider:
  - Who are the main users?

## Architecture

- Start off by quickly drawing out the UI in an abstract way (with different screen sizes)
- Then do a quick frontend hierarchy -> this is different from the MVC model with controller. You can still have the client store, but focus more on dividing app into multiple views and the control, and their own sub components. Controls should be responsible for actions and View should have different views. You can later expand this diagram to include the controller between client and server, server as black box, and specify what kinds of normalized store there is
- Application can have shared components and pages (or router routes)
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
- Calls often have api key, user id, timestamp (if real-time), and whatever parameters that fit the requirements
- Individual calls can do either REST API or GraphQL
  - Use REST API when we need a structure. REST uses HTTP verbs to deal with data. REST is better when you have a smaller application with less complex data, or all clients use similar data and operation (so for example, if web and mobile of my app use similar requests and responses, REST might be better).
  - But first, talk about the difference between HTTP1 and HTTP2. This can be used in the optimization section as well.
    - HTTP1: Limited number of connections, plain text, need to explicitly close the connection, single TCP sends one data at a time.
    - HTTP2: Multiple requests in parallel possible, more than just plain text, one TCP sends multiple data over a stream
  - Use GraphQL when we need flexibility for complex data. GraphQL uses query to get read-only data, and it also contains subscription to receive streaming data. Using GraphQL is better when your requests/responses vary significantly from one another, you have multiple data sources that you merge at the API level, or you have limited bandwidth so you want to minimize the number of requests. For the purpose of requirements that I've set forth, I don't think graphQL is required, but in the actual application with a lot more concerns and data than what I see in first glance, I wouldn't be surprised if GraphQL is used instead.
- Continuous communication can do Long Polling, Websockets or Server Sent Events
  - Short polling: At short intervals, client requests info from server. Server returns it if it's available.
  - Long polling: Client sends request to server, the server then holds the request until it becomes available. Then, client requests again to the server immediately afterwards. The server then does the same thing. This is easy to implement but creating a new connection every time is costly for the server. Also, there's a significant latency. If your non-functional requirement restricts latency (which it likely does), then this should not be used.
  - Websockets: single, long-lived communication between client and server. Both sides can send data through websockets. This has low latency. Heartbeats are often used to determine if the connection is still good. Terminated conditions don't automatically recovered for websockets though.
  - Server Sent Events: Push server updates to client (One way). So ideal for when client needs to be updated real-time without sending data to the server. Think of this as a regular HTTP request where the server doesn't finish after sending back the response, but instead keeps trickling down different responses over time. Advantage of SSE is that it is transported through simple HTTP protocol instead of a custom one (which is also why it can have all the HTTP2 benefits). We also receive only a piece of data in text format, and is therefore very fast. It's easier to load balance. When you use websockets, think about whether SSE from server to client + HTTP post from client to server can be used instead.
- Once you select the call methods, draw the data layer where you determine at which frontend component data is fetched, which writes the data into central store, which provides the data to the relevant component. Also show how different parts of that data trickle down to that component's children as well.
  - Normalized store: Instead of having the huge nested data, you can have normalized store where different data types are saved individually and indexed by id (so instead of comments belonging to a post, posts and comments are stored separately and filtered by id). This helps with store efficiency and accessing the data quickly.

## Optimization

- Performance
  - Lazy loading within a page - only load the essentials upon initialization, then keep loading the rest in parallel as the user starts interacting. There can be multiple layers of lazy loading, where each layer of more importance gets loaded first
  - Infinite scrolling for feeds: Implement a "scroll" event listener (use Intersection observer API) that fires once the scrollbar is past a certain threshold, then fetch the next set of items. But this has a problem - As more items get attached to the store, the DOM keeps increasing and slows down the page. So implement virtualized lists, where you only render posts that are within the viewport.
    - Top and bottom sentinel -> when viewport intersects with the bottom sentinel, load the next round of items. In the case of pins (Pinterest), we will have a pins queue, where the first few elements are shifted out and new ones are added. Don't forget to leave a row or two above the viewport to make sure they're ready if the user scrolls back up quickly. Also, unless it's a linear one like facebook news feed, make sure to position these UI elements absolutely within the div and translate them up and down when scrolling. Otherwise, removing and adding DOM elemtns are very expensive.
  - Hashtags and mentions need their own data format
  - Draft.js is a popular WYSIWYG text editor - I use it for Speculum Mundi as well
  - For rendering images, you can use CDN (Content Delivery Network) to host and load images. A lot of modern applications also serve images in the webp format for efficiency. Consider using Image Optimization service where the component requests for image url and viewport to the service, then this service returns optimized images. But have CDN cache in the middle so that the images that are already optimized for that url and viewport don't even need to go through the service, and we can just use the cached image in CDN.
  - Optimistic update: When the client assumes and pre-loads successful case response, which should be the case for the most part anyways
- User Experience
  - Shimmer loading indicators instead of a spinner to show the general outline of the page while still indicating that we're fetching the data
  - Slow appearance of components instead of sudden popping up
  - Remind users to refresh the page if the content is real-time so that they know to fresh for new contents.
  - Keyboard shortcuts
  - Tabbing between contents and buttons (Also for accessibility)
- Javascript performance improvements
  - Splitting Javascript code so that each page/component will only load JS and CSS files that are required for that specific page/component
  - Move more things to async from sync - the more sync JS stuff we have, the slower the app becomes. Move as much into async as possible.
  - Cache anything too heavy. In React context, this could mean using useMemo for memoizing heavy calculation works and implementing useCallback for doing the same for functions - basically the function would return cached value unless its parameters change.
- Network Performance
  - Header zipping -> GZIP but Brotli is more efficient
  - Batch requests instead of sending them one by one every time
  - Use HTTP2 instead of HTTP1 if the application supports it
- Accessibility
  - Toolbar tips and helps
  - Colour contrast - better contrast helps those with colour related disabilities
  - aria-labelledby, aria-role, aria-label, etc to the correct DOM elements so that assistive technologies can be used to track the contents of the page
- Multilingual support
- Multi-device support
- Security
