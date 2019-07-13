import Parse from 'parse';

let install = new Parse.Installation();
install.set("deviceType", navigator.userAgent);

install.save()
    .then((resp) => {
        console.log('Created install object', resp);
    }, console.error();
    )