var socket = io();

socket.on('connect', function() {
    socket.emit('splash', function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error on splash');
        }
    });
});

socket.on('updateRoomList', function(roomList) {
    var ol = jQuery('<ol></ol>');
    console.log(roomList);
    if (roomList.length > 0) {
        roomList.forEach(function (room) {
            ol.append(jQuery('<li></li>').text(room));
        });
        jQuery('#rooms').html(ol);
    } else {
        ol.append(jQuery('<li></li>').text("No occupied rooms"));
        jQuery('#rooms').html(ol);
    }
});
