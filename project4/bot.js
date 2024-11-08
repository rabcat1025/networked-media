// import the .env file so that we can keep our password outside of our script
require("dotenv").config();

// importing the masto library to interface with our mastodon server
const m = require("masto");

const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/", // this is our mastodon server
  accessToken: process.env.TOKEN,
});

const stream = m.createStreamingAPIClient({
  accessToken: process.env.TOKEN,
  streamingApiUrl: "wss://networked-media.itp.io", // special url we use for sockets
});

async function makeStatus(text) {
  const status = await masto.v1.statuses.create({
    status: text,
    visibility: "public",
  });

  console.log(status.url);
}

async function reply() {
  // finding the specific route to watch for notifications
  // based off the stream client and the notification path
  const notificationSubscription = await stream.user.notification.subscribe();

  // makes sure objects exist in the returned obj before going through array
  for await (let notif of notificationSubscription) {
    // printing the structure to the console to see how to access data
    // console.log(notif.payload.type);

    // local variables for each piece of data i want
    let type = notif.payload.type;
    let acct = notif.payload.account.acct;
    let replyId = notif.payload.status.id;

    // if the type of notification is a mention
    if (notif.payload.type == "mention") {
      // create a status
      const status = await masto.v1.statuses.create({
        status: `@${acct} 🌐! `, // reply to user that originally mentioned
        visibility: "public",
        in_reply_to_id: replyId, // id # of the mention post so that you reply in the thread
      });
    }
  }
}

// call the reply function so it can always wait for notifications
reply();

function multipleStatuses() {
  // if you want to make an external req, do it here
  let emojis = ["!૮ ˶ᵔ ᵕ ᵔ˶ ა", "(˶˃ ᵕ ˂˶)!!", "`⎚⩊⎚´ -✧!", "!!"];
  let rand = Math.floor(Math.random() * emojis.length);
  let post = emojis[rand];

  makeStatus(post);
}
setInterval(multipleStatuses, 15 * 60 * 1000);
