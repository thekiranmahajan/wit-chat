export const getSender = (users, loggedUser) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages?.length - 1 &&
    (messages[index + 1]?.sender?._id !== message?.sender?._id ||
      messages[index + 1]?.sender?._id === undefined) &&
    messages[index]?.sender?._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages?.length - 1 &&
    messages[messages?.length - 1]?.sender?._id !== userId &&
    messages[messages?.length - 1]?.sender?._id
  );
};

export const isSameSenderMargin = (messages, message, index, userId) => {
  if (
    index < messages?.length - 1 &&
    messages[index + 1]?.sender?._id === message?.sender?._id &&
    messages[index]?.sender?._id !== userId
  )
    return 34;
  else if (
    (index < messages?.length - 1 &&
      messages[index + 1]?.sender_id !== message?.sender?._id &&
      messages[index]?.sender?._id !== userId) ||
    (index === messages?.length - 1 && messages[index]?.sender?._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, message, index) => {
  return index > 0 && messages[index - 1]?.sender?._id === message?.sender?._id;
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const shouldIncreaseSize = (content) => {
  const emojiRegex = /^(\p{Emoji}){1,2}$/u;
  return emojiRegex.test(content.trim());
};
