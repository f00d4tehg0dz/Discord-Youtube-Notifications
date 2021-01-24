const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Discord Listening");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});


const discord = require("discord.js")
const client = new discord.Client()
const { TOKEN, CHANNEL_ID, SERVER_CHANNEL_ID } = require("./config.json");
const YouTubeNotifier = require('youtube-notification');


client.on("ready", () => {
  console.log("Watching " + CHANNEL_ID.length  + " Channels")
})

const notifier = new YouTubeNotifier({
  hubCallback: 'https://xxx/yt',
  secret: ''
});


notifier.on('notified', data => {
  console.log('New Content');
  client.channels.cache.get(SERVER_CHANNEL_ID).send(
    `**${data.channel.name}** just uploaded a new video or went live. I dunno what do you want from me? - **${data.video.link}**`
  );
});
 
notifier.subscribe(CHANNEL_ID);

app.use("/yt", notifier.listener());


client.login(TOKEN)
