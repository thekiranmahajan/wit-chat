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
