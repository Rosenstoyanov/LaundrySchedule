module.exports = (function() {
    if(process.env.NODE_ENV === 'prod') return require(__base + 'app/config/config.prod.json');
    return require(__base + 'app/config/config.dev.json');
}());
