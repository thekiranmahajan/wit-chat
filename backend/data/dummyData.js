const chats = [
  {
    isGroupChat: true,
    users: [
      {
        name: "Aarav Sharma",
        email: "aarav@example.com",
      },
      {
        name: "Neha Patel",
        email: "neha@example.com",
      },
      {
        name: "Rohan Gupta",
        email: "rohan@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Tea Lovers",
    groupAdmin: {
      name: "Aarav Sharma",
      email: "aarav@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Priya Singh",
        email: "priya@example.com",
      },
      {
        name: "Raj Kumar",
        email: "raj@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Priya & Raj",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Ananya Das",
        email: "ananya@example.com",
      },
      {
        name: "Arjun Reddy",
        email: "arjun@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Ananya & Arjun",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Ishaan Sharma",
        email: "ishaan@example.com",
      },
      {
        name: "Pooja Verma",
        email: "pooja@example.com",
      },
      {
        name: "Vikram Chauhan",
        email: "vikram@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Cooking Club",
    groupAdmin: {
      name: "Ishaan Sharma",
      email: "ishaan@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Sneha Gupta",
        email: "sneha@example.com",
      },
      {
        name: "Vishal Sharma",
        email: "vishal@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Sneha & Vishal",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Nikhil Patel",
        email: "nikhil@example.com",
      },
      {
        name: "Tanvi Shah",
        email: "tanvi@example.com",
      },
      {
        name: "Yash Chopra",
        email: "yash@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Fitness Buddies",
    groupAdmin: {
      name: "Nikhil Patel",
      email: "nikhil@example.com",
    },
  },
];

module.exports = { chats };
