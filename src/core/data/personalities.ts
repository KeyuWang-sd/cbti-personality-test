import { Personality } from '../../types';

// 18个人格完整映射表
export const personalities: Personality[] = [
  {
    id: '1',
    name: '内耗卷王',
    code: 'IMSB',
    dimensions: {
      S: 'negative', // 独处缄默
      L: 'positive', // 激进内卷
      D: 'positive', // 秩序自律
      W: 'positive'  // 现实功利
    },
    description: '默默卷绩点，一边焦虑一边自我攻击精神内耗'
  },
  {
    id: '2',
    name: '卷神傀儡',
    code: 'BOSS',
    dimensions: {
      S: 'negative',
      L: 'positive',
      D: 'positive',
      W: 'positive'
    },
    description: '独来独往默默内卷，表面大佬实则被绩点绑架'
  },
  {
    id: '3',
    name: '死线战神',
    code: 'DDLS',
    dimensions: {
      S: 'negative',
      L: 'positive',
      D: 'negative', // 混沌拖延
      W: 'negative'  // 感性内耗
    },
    description: '平时躺平死寂，DDL前夜爆肝，深夜疯狂情绪崩溃'
  },
  {
    id: '4',
    name: '静默阴卷',
    code: 'MONK',
    dimensions: {
      S: 'negative',
      L: 'positive',
      D: 'positive',
      W: 'negative'
    },
    description: '表面佛系安静，背地里偷偷内卷卷死所有人'
  },
  {
    id: '5',
    name: '佛系旁观',
    code: 'OJBK',
    dimensions: {
      S: 'negative',
      L: 'negative', // 虚无摆烂
      D: 'positive',
      W: 'positive'
    },
    description: '冷眼旁观校园内卷，万事无所谓摆烂通透'
  },
  {
    id: '6',
    name: '遁世搞钱人',
    code: 'POOR',
    dimensions: {
      S: 'negative',
      L: 'negative',
      D: 'negative',
      W: 'positive'
    },
    description: '不卷学业不社交，一心搞钱远离校园纷争'
  },
  {
    id: '7',
    name: '宿舍废人',
    code: 'IMFW',
    dimensions: {
      S: 'negative',
      L: 'negative',
      D: 'negative',
      W: 'negative'
    },
    description: '整天宿舍躺平摆烂，拒绝社交拒绝学习麻木无欲'
  },
  {
    id: '8',
    name: 'emo孤人',
    code: 'SOLO',
    dimensions: {
      S: 'negative',
      L: 'negative',
      D: 'positive',
      W: 'negative'
    },
    description: '独来独往独处，深夜情绪崩溃，抗拒无效社交'
  },
  {
    id: '9',
    name: '社团霸总',
    code: 'MUM',
    dimensions: {
      S: 'positive', // 外放喧嚣
      L: 'positive',
      D: 'positive',
      W: 'positive'
    },
    description: '学生会班委负责人，爱管事控场操心一切事务'
  },
  {
    id: '10',
    name: '表面人精',
    code: 'FAKE',
    dimensions: {
      S: 'positive',
      L: 'positive',
      D: 'positive',
      W: 'negative'
    },
    description: '社交圆滑假面热情，内心冷漠虚伪不爱任何人'
  },
  {
    id: '11',
    name: '社交卷狗',
    code: 'CTRL',
    dimensions: {
      S: 'positive',
      L: 'positive',
      D: 'negative',
      W: 'positive'
    },
    description: '一边疯狂社交团建，一边偷偷内卷绩点拿捏关系'
  },
  {
    id: '12',
    name: '狂欢内耗体',
    code: 'WOC',
    dimensions: {
      S: 'positive',
      L: 'positive',
      D: 'negative',
      W: 'negative'
    },
    description: '白天聚会狂欢热闹，深夜独自emo崩溃虚无'
  },
  {
    id: '13',
    name: '人情世故哥',
    code: 'MALO',
    dimensions: {
      S: 'positive',
      L: 'negative',
      D: 'positive',
      W: 'positive'
    },
    description: '合群社交搞关系，清醒混日子摸鱼不内卷'
  },
  {
    id: '14',
    name: '快乐乐子人',
    code: 'HHHH',
    dimensions: {
      S: 'positive',
      L: 'negative',
      D: 'negative',
      W: 'positive'
    },
    description: '外向爱玩热闹，佛系摆烂嘻嘻哈哈找乐子'
  },
  {
    id: '15',
    name: '恋爱脑神',
    code: 'LOVE-R',
    dimensions: {
      S: 'positive',
      L: 'negative',
      D: 'negative',
      W: 'negative'
    },
    description: '外向人缘好，满心恋爱脑，学习DDL全摆烂'
  },
  {
    id: '16',
    name: '人间摆客',
    code: 'GOGO',
    dimensions: {
      S: 'positive',
      L: 'negative',
      D: 'negative',
      W: 'positive'
    },
    description: '爱闲逛爱玩，随性摆烂随波逐流混完大学四年'
  },
  {
    id: '17',
    name: '装死选手',
    code: 'ZZZZ',
    dimensions: {
      S: 'negative',
      L: 'negative',
      D: 'negative',
      W: 'negative'
    },
    description: '上课宿舍全程躺平，遇事装死消失，能躲就躲能躺就躺',
    isEasterEgg: true
  },
  {
    id: '18',
    name: '喝酒烂人',
    code: 'DRUNK',
    dimensions: {
      S: 'positive',
      L: 'negative',
      D: 'negative',
      W: 'negative'
    },
    description: '爱玩爱聚餐喝酒，随性摆烂，情绪全靠酒精释放',
    isEasterEgg: true
  },
  {
    id: '19',
    name: '均衡发展者',
    code: 'BALANCE',
    dimensions: {
      S: 'neutral',
      L: 'neutral',
      D: 'neutral',
      W: 'neutral'
    },
    description: '各方面都比较均衡，没有特别明显的倾向，适应能力强',
    isEasterEgg: true
  }
];
