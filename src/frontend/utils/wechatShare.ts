// 微信分享功能
export const handleShareClick = (personalityName: string, personalityCode: string) => {
  // 检查是否在微信浏览器中
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
  
  if (isWeChat) {
    // 在微信中使用原生分享
    if (typeof (window as any).WeixinJSBridge !== 'undefined') {
      (window as any).WeixinJSBridge.invoke('shareTimeline', {
        title: `我是${personalityName}(${personalityCode})`,
        link: window.location.href,
        imgUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20college%20student%20personality%20test%20illustration&image_size=square_hd'
      });
    }
  } else {
    // 在其他浏览器中使用剪贴板复制
    const shareText = `我刚刚做了CBTI-大学生人格测试(jxau版)，结果是${personalityName}(${personalityCode})！快来测测你是什么人格吧！\n链接：${window.location.href}`;
    
    // 尝试使用 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      // 请求剪贴板权限
      navigator.permissions.query({ name: 'clipboard-write' as PermissionName })
        .then(permissionStatus => {
          if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
            navigator.clipboard.writeText(shareText)
              .then(() => {
                alert('分享链接已复制到剪贴板！');
              })
              .catch(err => {
                // 回退到传统方法
                fallbackCopyTextToClipboard(shareText);
              });
          } else {
            // 权限被拒绝，使用回退方法
            fallbackCopyTextToClipboard(shareText);
          }
        })
        .catch(() => {
          // 权限查询失败，使用回退方法
          fallbackCopyTextToClipboard(shareText);
        });
    } else {
      // 不支持 Clipboard API，使用传统方法
      fallbackCopyTextToClipboard(shareText);
    }
  }
};

// 传统的复制方法（回退方案）
function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // 设置样式使其不可见
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    const msg = successful ? '分享链接已复制到剪贴板！' : '复制失败，请手动复制分享链接';
    alert(msg);
  } catch (err) {
    alert('复制失败，请手动复制分享链接');
  } finally {
    document.body.removeChild(textArea);
  }
}