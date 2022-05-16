var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('Connected');

    setTimeout(function () {

        axios.get('https://api.binance.com/api/v3/exchangeInfo?symbol=BNBBTC')
            .then(function (response) {
                console.log("Data Send")
                socket.emit('sendData', { description: 'descriptions part', myData: response.data });

            });

    }, 4000);

    socket.on('disconnect', function () {
        console.log('Disconnected');
    });
});


app.get("/getData", function(req, res){
    res.sendFile(__dirname + '/main.html');
})

http.listen(8085, function () {
    console.log('listening on *:8085');
});