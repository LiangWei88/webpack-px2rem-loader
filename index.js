var _ = require('lodash');
var utils = require('loader-utils');


module.exports = function (source) {
    if (_.isUndefined(this.cacheable)) return source;
    this.cacheable();
    var query = utils.parseQuery(this.query),
        basePx = !_.isUndefined(query.basePx) ? query.basePx : 10,
        min = !_.isUndefined(query.min) ? query.min : 0,
        floatWidth = !_.isUndefined(query.floatWidth) ? query.floatWidth : 3,
        matchPXExp = /([0-9,.]+px)([;| |}|'|"])/g;
    return source.replace(matchPXExp, function (match, m1, m2) {
        var pxValue = parseFloat(m1.slice(0, m1.length - 2));
        if (pxValue <= min) return match;
        var remValue = pxValue / basePx;
        if (pxValue % basePx != 0)
            remValue = (pxValue / basePx).toFixed(floatWidth);
        return remValue + 'rem' + m2;
    });

};

