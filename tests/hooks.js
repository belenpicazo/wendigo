"use strict";

const dummyServer = require('../dummy_server/index.js');
const Wendigo = require('../lib/wendigo');

before(() => {
    return dummyServer(3456);
});

after(() => {
    Wendigo.stop();
    dummyServer.close();
});
