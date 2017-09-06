
const path = require('path'),
      express = require('express'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;
var   app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`chat app is now listening on PORT: ${port}`);
});