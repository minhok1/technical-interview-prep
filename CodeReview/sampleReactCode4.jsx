import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// First of all, always add more detailed descriptions in every PR - remember that it makes everyone's life easier if reviewers can understand what you're doing on first glance!
// From what I can tell, this is a chat component that allows the user to send and receive messages.
// This component is unnecessarily large - a general rule of thumb (not always applicable) is to try to keep component files to around 100 lines.
// I would suggest creating separate components for chat display, chat edit, and emoji picker. If there's anything in these child components that is more easily configured on the chat interface level, use React composition

const ChatInterface = ({ currentUser, chatId, onMessageSent }) => {
  // Need prop types - we don't know what currentUser, chatIfd, onMessageSent look like. Remember that explicit typing is almost always better in React!
  // Have you considered what the behavior would be if some of the props are null or have unexpected values? Maybe add a default behavior here?
  // States need types of their own - especially if they're complex data types like objects and arrays. For example, it's not obvious what each message looks like here.
  // This is optional, but when there are this many states, it might be better to include simple comments about what they do
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // It seems like "isTyping" is not used anywhere after being set. Is this state really necessary?
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(true); // isConnected seems like it can be used throughout the entire application - consider creating a custom hook to reuse the logic: useIsConnected
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageHistory, setMessageHistory] = useState([]); // Same thing here, messageHistory is not used anywhere
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]); // It seems like filteredMessages is not used anywhere except for displaying messages that pass a certain filter. In that case, does this really have to be a state and take up resources? Why not just filter it while mapping messages? We're not actually working with filteredMessages here.
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Is this the only component that uses the emoji picker? Maybe you can separate this into custom hooks. Or even better - separate this into a component along with the html as well.
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageOptions, setShowMessageOptions] = useState(false);

  // Load messages when chatId changes
  useEffect(() => {
    if (chatId) {
      loadMessages();
    }
  }, [chatId]);

  // Set up real-time connection
  useEffect(() => {
    // Just a comment on a more architectural level - it seems like this websocket is used only for receiving messages and new messages that the user sends are handled with a POST call. Then is a resource intensive websocket really necessary? Maybe consider handling everything through the websocket or using SSE for receiving messages? Right now you're getting the worst of both worlds!
    const socket = new WebSocket(`ws://localhost:8080/chat/${chatId}`);

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to chat"); // Are console logs really necessary here? Better to use standard logging strategies than just console logs
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleIncomingMessage(data);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Disconnected from chat");
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  // Search messages
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter(
        (msg) =>
          msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered); // Same concern about filteredMessages - this is unnecessary
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

  const loadMessages = async () => {
    // Having the API call within the component works, but it may not be the best practice. Consider these options:
    // 1. If the application is using react-query to handle service calls, then you can use it here
    // 2. If loading messages is a functionality that's used at multiple spots in the application, refactor this into a custom hook
    // 3. Even if both don't apply, you can still factor this call out into a service file. This keeps the component more readable
    try {
      const response = await axios.get(`/api/chats/${chatId}/messages`); // hard coding endpoints like this may not be a great idea - I'd have a static file just for endpoints, separate them into local, uat and prod, then get corresponding endpoints based on the configuration. Also, optionally, having an "ApiClient" ts file to configure endpoints might help in case you need to do any "interceptor" kind of operation before sending out a request.
      setMessages(response.data);
      setMessageHistory(response.data); // Why is this used? Ths serves no purpose
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleIncomingMessage = (data) => {
    if (data.type === "message") {
      // types should not be hard coded in components like this - consider using enums
      setMessages((prev) => [...prev, data.message]);
      setMessageHistory((prev) => [...prev, data.message]); // messageHistory doesn't do anything

      if (data.message.sender.id !== currentUser.id) {
        setUnreadCount((prev) => prev + 1);
      }
    } else if (data.type === "typing") {
      // same here - try using enums
      setTypingUsers((prev) => {
        const filtered = prev.filter((user) => user.id !== data.user.id);
        return [...filtered, data.user];
      });

      // This never gets cleaned up - potential memory leak
      setTimeout(() => {
        setTypingUsers((prev) =>
          prev.filter((user) => user.id !== data.user.id)
        );
      }, 3000); // numbers like this should be stored in a const
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    const message = {
      id: Date.now(), // It's usually not a good idea to use time as id - consider using a uuid
      content: newMessage,
      sender: currentUser, // just for double checking - have you checked that Date.now() corresponds to the date format that the backend is expecting? Sometimes they ask for different formats in string
      timestamp: new Date(),
      chatId: chatId,
    };

    // Optimistic update
    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    try {
      await axios.post(`/api/chats/${chatId}/messages`, {
        content: newMessage,
        senderId: currentUser.id,
      });

      if (onMessageSent) {
        onMessageSent(message);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Revert optimistic update
      setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
      alert("Failed to send message. Please try again."); // Alert works, but it's often a better idea to have your custom error component. Also, this value should not be hard coded. Consider using a json file just for messages like this.
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value); // user inputs like this should be sanitized to prevent XSS attacks

    if (e.target.value.length > 0) {
      setIsTyping(true);
      // Send typing indicator
      sendTypingIndicator();
    } else {
      setIsTyping(false);
    }
  };

  const sendTypingIndicator = useCallback(() => {
    // Debounce typing indicator
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }, []);

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`/api/messages/${messageId}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message");
    }
  };

  const editMessage = async (messageId, newContent) => {
    try {
      await axios.put(`/api/messages/${messageId}`, { content: newContent });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, content: newContent, edited: true }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to edit message:", error);
      alert("Failed to edit message");
    }
  };

  // This function looks like it can be a part of a utils file. That way, it doesn't get redefined every time the component re-renders. Also, it's easier to read.
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Same concern - move this to utils
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today"; // These strings should not be hard coded. Use enums
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    //Interactive elements should have proper aria-labels
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="connection-status">
          <span
            className={`status ${isConnected ? "connected" : "disconnected"}`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
      </div>

      <div className="chat-search">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="chat-messages" id="chat-messages">
        {filteredMessages.map((message, index) => {
          // If we decide to not use filteredMessages, we can just use messages.map then only display messages that pass the filter.
          const showDate =
            index === 0 ||
            formatDate(message.timestamp) !==
              formatDate(filteredMessages[index - 1].timestamp); // showDate uses formatDate every time - can be memoized

          return (
            <div key={message.id}>
              {showDate && (
                <div className="date-divider">
                  {formatDate(message.timestamp)}
                </div>
              )}
              <div
                className={`message ${
                  message.sender.id === currentUser.id ? "own" : "other"
                }`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedMessage(message);
                  setShowMessageOptions(true);
                }}
              >
                <div className="message-content">
                  <div className="message-header">
                    <span className="sender-name">{message.sender.name}</span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-text">
                    {message.content}
                    {message.edited && (
                      <span className="edited-indicator"> (edited)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.map((user) => user.name).join(", ")} is typing...
          </div>
        )}
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
          />
          <button
            className="emoji-btn"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {/* Doesn't seem like a good idea to hard code emojis into the code like this - there are many standardized libraries out there for icons, so use them */}
            😊
          </button>
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
          >
            Send
          </button>
        </div>

        {showEmojiPicker && (
          <div className="emoji-picker">
            {/* same concern here - emojis are hard coded into html here */}
            {["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🎉"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="emoji-option"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {showMessageOptions && selectedMessage && (
        // As discussed, message options can be refactored into a separate component as well
        <div className="message-options-modal">
          <div className="modal-content">
            <h3>Message Options</h3>
            <button
              onClick={() => {
                const newContent = prompt(
                  "Edit message:",
                  selectedMessage.content
                );
                if (newContent && newContent !== selectedMessage.content) {
                  editMessage(selectedMessage.id, newContent);
                }
                setShowMessageOptions(false);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this message?")) {
                  // Move to a json file
                  deleteMessage(selectedMessage.id);
                }
                setShowMessageOptions(false);
              }}
            >
              Delete
            </button>
            <button onClick={() => setShowMessageOptions(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Consider creating error boundaries so that the page doesn't break just because of a single error!

export default ChatInterface;
