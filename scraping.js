const fs = require("fs");
const client = require("cheerio-httpcli");
var exports = require("./exports.js");

var array = [];
// プロミスによる制御
client.fetch(exports.url1)
    .then(function(result) {
        var data = getFoundData(result);
        array.push(data);
        return client.fetch(exports.url2);
    })
    .then(function(result) {
        var data = getFoundData(result);
        array.push(data);
    })
    .catch(function(err) {
        console.log(err);
    })
    .finally(function() {
        fs.writeFile(exports.json, JSON.stringify(array, null, '    '));
    });



// ファンド情報のテーブルから必要な基本情報を抜き出す
function getFoundData(result) {
    var $ = result.$;
    // var itemName = exports.itemname;
    var title = $(exports.titile).text();
    // // ファンド情報
    var target = $(exports.foundtable);
    // 基準価額
    // var baseCostTitle = target.find(exports.foundbase).eq(0).text();
    var baseCost = target.find(exports.foundbasedata).eq(0).text();
    // 純資産額
    // var assetsTitle = target.find(exports.foundbase).eq(1).text();
    var assets = target.find(exports.foundbasedata).eq(1).text();
    // 直近分配金
    // var dividendTitle = target.find(exports.foundbase).eq(2).text();
    var dividend = target.find(exports.foundbasedata).eq(2).text();

    var data = {
        "商品名": title,
        "基準価額": baseCost,
        "純資産額": assets,
        "直近分配金": dividend
    };
    return data;
}



// var url = fs.readFileSync("./urllist.txt").toString();
// var urllist = url.split(",");
//
// //
// var outPuts = [];
// client.fetch(urllist[1], {}, function(err, $, res, body) {
//     var title = $("title").text();
//     // // ファンド情報
//     var target = $("table[class='tbl-fund-summary']");
//     // 基準価額
//     var baseCost = target.find("td[class='br0'] > span").eq(0).text();
//     // 純資産額
//     var assets = target.find("td[class='br0'] > span").eq(1).text();
//     // 直近分配金
//     var dividend = target.find("td[class='br0'] > span").eq(2).text();
//
//     var data = {
//         "商品名": title,
//         "基準価額": baseCost,
//         "純資産額": assets,
//         "直近分配金": dividend
//     };
//     fs.writeFile("./write.json", JSON.stringify(data, null, '    '));
// });


// SJISのファイルをUTF-8に変換して読み込む
// var rs = fs.createReadStream("./urllist.csv")
//     .pipe(iconv.decodeStream("SJIS"))
//     .pipe(iconv.encodeStream("UTF-8"))
//     .pipe(csv.parse())
//     .pipe(csv.transform(function(record) {
//         return record.map(function(value) {
//             return value
//         });
//     }))
//     .pipe(csv.stringify())
//     .pipe(process.stdout);
