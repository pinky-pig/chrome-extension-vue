var count = 0

setInterval(() => {
  count= ++count;
  if (count%3000 === 0) {
    chrome.notifications.create(null, {
      type: 'image',
      iconUrl: 'img/icon.png',
      title: '66',
      message: '冲！！12!',
      imageUrl: 'img/sds.png'
    });
  }
}, 1000);

function test() {
  console.log('测试');
  alert('测试');
};
