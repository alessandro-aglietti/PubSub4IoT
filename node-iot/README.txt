npm install
or
npm install googleapis
npm install atob
npm install btoa

To work you need to patch the node_modules/googleapis/apis/pubsub/v1beta2.js file of googleapis: find the patched file in root of this repos!

cp ../v1beta2.js ./node_modules/googleapis/apis/pubsub/


Setup Edison to Git for update
## INSTALL GIT ON EDISON
https://github.com/mashery/edison-guides/wiki/Installing-Git-on-Intel-Edison

# add user xxxx
# su xxxx
$ cd
$ git clone https://github.com/alessandro-aglietti/PubSub4IoT.git
$ cd PubSub4IoT/node-iot
$ npm install
$ cp ../v1beta2.js ./node_modules/googleapis/apis/pubsub/
$ co your-private.pem /to/path/used/by/your/client
$ node yourfile.njs

Tool to manage Intel Edison over USB
https://www.npmjs.com/package/bloop