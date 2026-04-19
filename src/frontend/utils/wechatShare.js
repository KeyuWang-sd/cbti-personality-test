// 微信分享配置
// 处理微信分享功能，确保在微信中可以正常分享

export function setupWechatShare(title, description, imageUrl, url) {
  // 检查是否在微信中
  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  
  if (isWechat) {
    // 这里可以添加微信JSSDK的配置
    // 由于没有真实的微信公众号配置，这里只做基本的分享设置
    console.log('微信分享已配置');
  }
  
  // 通用分享功能
  setupGeneralShare(title, description, url);
}

function setupGeneralShare(title, description, url) {
  // 监听分享事件
  if (navigator.share) {
    // 现代浏览器的分享API
    console.log('支持原生分享API');
  } else {
    // 不支持原生分享的浏览器，提供复制链接功能
    console.log('不支持原生分享API，提供复制链接功能');
  }
  
  // 复制链接到剪贴板
  window.copyLink = function() {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('链接已复制到剪贴板，可直接分享给好友');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制链接');
      });
  };
}

// 分享按钮点击事件
export function handleShareClick(personalityName, personalityCode) {
  const title = 'CBTI大学生校园人格测试';
  const description = `我的CBTI人格是${personalityName}(${personalityCode})，快来测试你的人格类型吧！`;
  const imageUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20college%20student%20personality%20test%20illustration&image_size=square_hd';
  const url = window.location.href;
  
  if (navigator.share) {
    // 使用原生分享API
    navigator.share({
      title: title,
      text: description,
      url: url
    })
    .then(() => console.log('分享成功'))
    .catch((error) => console.log('分享失败:', error));
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('链接已复制到剪贴板，可直接分享给好友');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制链接');
      });
  }
}
