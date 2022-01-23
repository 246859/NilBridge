var levelup = require('level');

class LeveDB {
    constructor(dbpath) {
        this.db = levelup(dbpath);
    }
    put(key, value, callback) {
        if (key && value) {
            this.db.put(key, value, function (error) {
                callback(error);
            })
        } else {
            callback('no key or value');
        }
    }
    get(key, callback) {
        if (key) {
            this.db.get(key, function (error, value) {
                callback(error, value);
            })
        } else {
            callback('no key', key);
        }
    }
    del(key, callback) {
        if (key) {
            this.db.del(key, function (error) {
                callback(error);
            })
        } else {
            callback('no key');
        }
    }
    batch(arr, callback) {
        if (Array.isArray(arr)) {
            var batchList = [];
            arr.forEach(item =>
            {
                var listMember = {};
                if (item.hasOwnProperty('type')) {
                    listMember.type = item.type;
                }
                if (item.hasOwnProperty('key')) {
                    listMember.key = item.key;
                }
                if (item.hasOwnProperty('value')) {
                    listMember.value = item.value;
                }
                if (listMember.hasOwnProperty('type') && listMember.hasOwnProperty('key') && listMember.hasOwnProperty('value')) {
                    batchList.push(listMember);
                }
            })
            if (batchList && batchList.length > 0) {
                this.db.batch(batchList, function (error) {
                    callback(error, batchList);
                })
            } else {
                callback('array Membre format error');
            }
        } else {
            callback('not array');
        }
    }
    find(find, callback) {
        var option = { keys: true, values: true, revers: false, limit: 20, fillCache: true };
        if (!find)
            return callback('nothing', null);
        else {
            if (find.prefix) {
                option.start = find.prefix;
                option.end = find.prefix.substring(0, find.prefix.length - 1)
                    + String.fromCharCode(find.prefix[find.prefix.length - 1].charCodeAt() + 1);
            }

            if (find.limit)
                option.limit = find.limit;
            this.db.createReadStream(option).on('data', function (data) {
                data && callback(data.key, data.value);
            }).on('error', function (err) {
            }).on('close', function () {
            }).on('end', function () {
                return callback(null, Date.now());
            });
        }
    }
}





module.exports = LeveDB;