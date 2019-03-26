const client = require('webpack-hot-middleware/client?noInfo=true&reload=true')
client.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})