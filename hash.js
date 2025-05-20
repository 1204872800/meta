const fs = require('fs');
const crypto = require('crypto');

const createHash = (tokenId) => {
  try {
    const buffer = fs.readFileSync(`./metadata/yao/img/${tokenId}.jpg`);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex'); // 使用SHA-256生成图片哈希值
    console.log(hash); // 输出哈希值
    //同步读取对应的json
    let json = fs.readFileSync(`./metadata/yao/json/${tokenId}.json`, "utf8")
    let parjson = JSON.parse(json)
    if (!parjson.attributes.find(item => item.trait_type == 'hash')) {
      parjson.attributes.push({
        trait_type: 'hash',
        value: hash
      })
      //同步写入对应的json
      fs.writeFileSync(`./metadata/yao/json/${tokenId}.json`, JSON.stringify(parjson))
    }
    tokenId += 1;
    createHash(tokenId)
  } catch (err) {}

}

createHash(1)