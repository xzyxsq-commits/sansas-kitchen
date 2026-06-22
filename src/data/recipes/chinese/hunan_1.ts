import type { Recipe } from '@/types'

export const hunanRecipes1: Recipe[] = [
  {
    id: 'hun-001',
    name: '剁椒鱼头',
    nameEn: 'Chopped Chili Fish Head',
    emoji: '🐟',
    image: '/recipes/default/hun-001.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    calories: 380,
    protein: 35,
    fat: 22,
    carbs: 8,
    requiredIngredients: ['鲈鱼', '剁椒', '辣椒', '大蒜', '生姜'],
    requiredSeasonings: ['盐', '料酒', '生抽', '蚝油', '食用油', '胡椒粉'],
    requiredTools: ['蒸锅', '炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理鱼头',
        description: '将鲈鱼头从中间劈开但不要切断，去除鳃和黑膜，用清水冲洗干净。在鱼头两面各划三刀，抹上3g盐和15ml料酒腌制10分钟。',
        emoji: '🔪',
        time: 10
      },
      {
        title: '准备剁椒酱',
        description: '将200g剁椒沥去部分汁水，50g新鲜红辣椒切碎，30g大蒜和15g生姜切末备用。',
        emoji: '🌶️',
        time: 5
      },
      {
        title: '炒制酱料',
        description: '炒锅中加入30ml食用油烧至六成热，下入姜末、蒜末爆香，再加入剁椒和鲜辣椒碎翻炒2分钟，加入10ml蚝油、10ml生抽和2g白糖调味，炒出红油。',
        emoji: '🍳',
        time: 3
      },
      {
        title: '铺酱蒸制',
        description: '将腌好的鱼头摆入盘中，将炒好的剁椒酱均匀铺在鱼头上。蒸锅加水烧开后放入鱼头，大火蒸12分钟。',
        emoji: '♨️',
        time: 12
      },
      {
        title: '淋油点缀',
        description: '蒸好的鱼头取出，撒上葱花。另起锅烧20ml食用油至冒烟，浇在鱼头上激发出香气，撒上少许胡椒粉即可。',
        emoji: '🔥',
        time: 2
      }
    ],
    tips: [
      '鱼头一定要选新鲜的，鱼眼清澈透亮为佳，肉质才鲜嫩不腥',
      '剁椒本身有咸味，调味时注意盐的用量，避免过咸',
      '蒸鱼时间控制在10-12分钟，时间过长鱼肉会变老发柴',
      '最后淋热油是点睛之步，油温一定要高才能激发出剁椒的香味'
    ],
    tags: ['湘菜', '鱼头', '剁椒', '辣', '蒸菜'],
    description: '剁椒鱼头是湘菜头牌名菜，鲜嫩的鲈鱼头铺上红亮的剁椒酱，经过大火蒸制，鱼肉吸饱了辣椒的鲜辣精华，入口鲜香麻辣，令人欲罢不能。'
  },
  {
    id: 'hun-002',
    name: '小炒黄牛肉',
    nameEn: 'Stir-fried Yellow Beef',
    emoji: '🥩',
    image: '/recipes/default/hun-002.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 8,
    totalTime: 28,
    servings: 3,
    calories: 420,
    protein: 38,
    fat: 26,
    carbs: 6,
    requiredIngredients: ['牛肉', '辣椒', '大蒜', '生姜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '蚝油', '料酒', '淀粉', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '切肉腌制',
        description: '将300g黄牛肉逆着纹路切成2mm厚的薄片，加入5g盐、15ml生抽、5ml老抽、10ml料酒、5g淀粉和5ml食用油抓匀，腌制15分钟。',
        emoji: '🥩',
        time: 15
      },
      {
        title: '准备配料',
        description: '将100g青尖椒和50g红尖椒斜切成圈，30g大蒜拍碎切末，20g生姜切丝备用。',
        emoji: '🌶️',
        time: 5
      },
      {
        title: '滑炒牛肉',
        description: '炒锅烧热加入30ml食用油烧至七成热，下入腌好的牛肉快速滑炒至变色约40秒，立即盛出控油。',
        emoji: '🔥',
        time: 1
      },
      {
        title: '爆香配料',
        description: '锅中留底油15ml，下入姜丝、蒜末爆香，再下入青红椒圈大火翻炒1分钟至表皮微焦出香味。',
        emoji: '🌶️',
        time: 1
      },
      {
        title: '合炒出锅',
        description: '将滑好的牛肉回锅，加入10ml蚝油、2g白糖和2g胡椒粉，大火快速翻炒30秒，沿锅边淋入5ml香醋，翻炒均匀即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '黄牛肉必须逆纹切，否则口感会老硬嚼不动',
      '牛肉腌制时加入少许食用油可以锁住水分，炒出来更嫩滑',
      '炒牛肉全程大火快炒，变色即盛出，二次回锅时间不超过30秒',
      '青红椒炒到表皮微焦有虎皮纹时最香，不要炒得太软'
    ],
    tags: ['湘菜', '牛肉', '小炒', '辣', '下饭菜'],
    description: '小炒黄牛肉是湘菜馆点击率最高的家常菜之一，嫩滑的牛肉片与鲜辣的青红椒在猛火中快速翻炒，镬气十足，香辣过瘾，是当之无愧的米饭杀手。'
  },
  {
    id: 'hun-003',
    name: '农家一碗香',
    nameEn: "Farmer's One-Bowl Fragrance",
    emoji: '🥘',
    image: '/recipes/default/hun-003.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 3,
    calories: 520,
    protein: 30,
    fat: 32,
    carbs: 28,
    requiredIngredients: ['猪肉', '鸡蛋', '辣椒', '大蒜', '青椒', '豆芽'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将200g五花肉切成薄片，3个鸡蛋打入碗中加2g盐打散，100g青椒和50g红椒切圈，30g大蒜拍碎，100g豆芽洗净沥干。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '煎鸡蛋',
        description: '炒锅中加20ml食用油烧热，倒入蛋液快速划散炒成嫩蛋，盛出备用。',
        emoji: '🥚',
        time: 2
      },
      {
        title: '煸炒五花肉',
        description: '锅中加10ml油，下入五花肉片中火煸炒3分钟至出油微卷，加入10ml料酒去腥，炒至金黄焦香盛出。',
        emoji: '🥩',
        time: 3
      },
      {
        title: '爆香合炒',
        description: '锅中留底油，下入蒜末和青红椒圈大火爆香1分钟，加入豆芽翻炒30秒，再将炒好的鸡蛋和五花肉回锅。加入15ml生抽、5ml老抽、2g盐和2g胡椒粉，大火翻炒1分钟即可。',
        emoji: '🔥',
        time: 2
      }
    ],
    tips: [
      '五花肉要煸出油脂才香，煸炒到表面微焦卷起口感最佳',
      '鸡蛋先炒好盛出，避免与肉同炒时间过长变老',
      '豆芽最后放保持脆嫩口感，翻炒30秒即可',
      '这道菜的精华在于肉香、蛋香和辣椒香的融合，调味不宜过重'
    ],
    tags: ['湘菜', '农家菜', '下饭菜', '猪肉', '家常菜'],
    description: '农家一碗香是湖南乡村的经典土菜，五花肉、鸡蛋和辣椒一锅同炒，三种食材的香气在高温中完美融合，朴实无华却滋味无穷，每一口都是浓浓的农家风味。'
  },
  {
    id: 'hun-004',
    name: '外婆菜炒蛋',
    nameEn: "Grandma's Pickled Vegetable with Eggs",
    emoji: '🥚',
    image: '/recipes/default/hun-004.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 8,
    totalTime: 18,
    servings: 3,
    calories: 280,
    protein: 16,
    fat: 20,
    carbs: 12,
    requiredIngredients: ['鸡蛋', '酸豆角', '辣椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将4个鸡蛋打入碗中加2g盐打散备用。150g酸豆角用清水冲洗一下去除多余盐分，挤干水分后切成5mm小段。3个红尖椒切碎，15g大蒜切末。',
        emoji: '🔪',
        time: 5
      },
      {
        title: '炒鸡蛋',
        description: '炒锅中加20ml食用油烧至七成热，倒入蛋液快速划散炒成金黄色的鸡蛋碎，盛出备用。',
        emoji: '🥚',
        time: 2
      },
      {
        title: '炒酸豆角',
        description: '锅中加10ml油烧热，下入蒜末和辣椒碎爆香30秒，再加入酸豆角丁大火翻炒2分钟，炒干水分出香味。',
        emoji: '🌶️',
        time: 2
      },
      {
        title: '合炒调味',
        description: '将炒好的鸡蛋回锅，加入10ml生抽和1g胡椒粉，大火翻炒1分钟使味道充分融合即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '酸豆角本身咸味重，用前一定要冲洗并挤干水分，炒的时候不需再加盐',
      '鸡蛋炒得稍微老一些呈金黄色，与酸豆角搭配口感更好',
      '酸豆角要炒干水分才香，炒到表面微微起皱即可',
      '这道菜冷吃热吃都美味，配粥、配饭、夹馒头都很搭'
    ],
    tags: ['湘菜', '外婆菜', '鸡蛋', '酸豆角', '快手菜'],
    description: '外婆菜炒蛋是湖南人童年的味觉记忆，酸香脆嫩的酸豆角与金黄松软的鸡蛋在锅中相遇，酸辣开胃，简单朴实却最是治愈人心，三五分钟就能端上桌的家常美味。'
  },
  {
    id: 'hun-005',
    name: '辣椒炒肉',
    nameEn: 'Hunan Chili Pork Stir-fry',
    emoji: '🌶️',
    image: '/recipes/default/hun-005.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 3,
    calories: 450,
    protein: 28,
    fat: 34,
    carbs: 10,
    requiredIngredients: ['猪肉', '辣椒', '青椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '蚝油', '料酒', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将250g带皮五花肉切成3mm厚的薄片。150g螺丝椒和50g红椒去蒂洗净，用刀背拍松后斜切成段。20g大蒜拍碎切末。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '煸炒肉片',
        description: '炒锅烧热不放油，直接下入五花肉片中火煸炒4分钟，炒出多余油脂，肉片微卷出焦边时加入10ml料酒去腥，盛出备用。',
        emoji: '🥩',
        time: 4
      },
      {
        title: '煸炒辣椒',
        description: '锅中留15ml底油，下入青红椒段，用铲子按压煸炒2分钟至表皮起皱呈虎皮状，加2g盐让辣椒入味。',
        emoji: '🌶️',
        time: 2
      },
      {
        title: '爆香合炒',
        description: '将肉片回锅，加入蒜末大火爆香30秒，加入15ml生抽、5ml老抽、10ml蚝油和2g胡椒粉，大火翻炒1分钟使味道均匀裹在肉片上即可出锅。',
        emoji: '🔥',
        time: 1
      }
    ],
    tips: [
      '螺丝椒皮薄肉厚辣味足，是这道菜的最佳选择，没有可用尖椒代替',
      '五花肉先干煸出油，吃起来肥而不腻，多余的油倒出留作他用',
      '辣椒要用铲子按压煸炒，让椒皮受热均匀起虎皮，口感最好',
      '这道菜一定要用带皮五花肉，纯瘦肉炒出来不够香'
    ],
    tags: ['湘菜', '辣椒炒肉', '下饭菜', '猪肉', '经典湘菜'],
    description: '辣椒炒肉是湖南人餐桌上的灵魂菜，薄切五花肉煸出焦香油脂，与虎皮青椒大火爆炒，肉香椒辣交融渗透，咸香浓郁，是湖南家家户户百吃不厌的家常第一菜。'
  },
  {
    id: 'hun-006',
    name: '湘西腊肉炒蒜苗',
    nameEn: 'Xiangxi Cured Pork with Garlic Sprouts',
    emoji: '🥓',
    image: '/recipes/default/hun-006.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 3,
    calories: 480,
    protein: 25,
    fat: 38,
    carbs: 10,
    requiredIngredients: ['腊肉', '大蒜', '辣椒', '荷兰豆'],
    requiredSeasonings: ['食用油', '生抽', '料酒', '白糖'],
    requiredTools: ['炒锅', '蒸锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理腊肉',
        description: '将200g湘西腊肉用温水刷洗表面烟尘，放入蒸锅大火蒸15分钟至变软，取出切成3mm厚的薄片。',
        emoji: '🥓',
        time: 18
      },
      {
        title: '准备配料',
        description: '将200g蒜苗洗净，蒜白部分斜切成段，蒜叶部分切成长段。3个干红辣椒切段，15g生姜切丝。',
        emoji: '🔪',
        time: 5
      },
      {
        title: '煸炒腊肉',
        description: '炒锅中加10ml食用油烧热，下入腊肉片中火煸炒2分钟至出油卷曲，加入10ml料酒翻炒去腥，盛出备用。',
        emoji: '🔥',
        time: 2
      },
      {
        title: '爆香合炒',
        description: '锅中留底油，下入姜丝和干辣椒段爆香15秒，先下蒜白段翻炒1分钟，再下蒜叶部分翻炒30秒。将腊肉回锅，加入10ml生抽和2g白糖，大火翻炒30秒即可出锅。',
        emoji: '🥬',
        time: 2
      }
    ],
    tips: [
      '湘西腊肉烟熏味浓郁，食用前一定要先蒸软，否则口感太硬',
      '腊肉本身盐分很重，这道菜不需要额外加盐',
      '蒜白和蒜叶要分开下锅，蒜白耐炒先下，蒜叶易熟后放',
      '腊肉炒到透明卷曲出油时最香，油太多可以倒出一些'
    ],
    tags: ['湘菜', '腊肉', '蒜苗', '湘西', '熏肉'],
    description: '湘西腊肉炒蒜苗是湖南西部山区的传统美味，经过松烟熏制的腊肉切片晶莹透亮，与翠绿蒜苗同炒，腊香浓郁、蒜香清雅，烟熏风味在唇齿间久久不散。'
  },
  {
    id: 'hun-007',
    name: '酸豆角炒肉末',
    nameEn: 'Pickled Beans with Minced Pork',
    emoji: '🥬',
    image: '/recipes/default/hun-007.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 3,
    calories: 350,
    protein: 22,
    fat: 26,
    carbs: 12,
    requiredIngredients: ['猪肉', '酸豆角', '辣椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '食用油', '白糖'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将200g猪前腿肉先切条再剁成肉末，不用剁太细保留颗粒感。200g酸豆角用清水冲洗后切成5mm小段，4个红尖椒切圈，20g大蒜切末。',
        emoji: '🔪',
        time: 5
      },
      {
        title: '炒肉末',
        description: '炒锅中加20ml食用油烧热，下入肉末大火翻炒2分钟至变色散开，加入10ml料酒翻炒去腥，继续炒1分钟至表面微焦出油，盛出备用。',
        emoji: '🥩',
        time: 3
      },
      {
        title: '炒酸豆角',
        description: '锅中加10ml油，下入蒜末和辣椒圈爆香30秒，加入酸豆角丁大火翻炒2分钟，炒干水分至表面微微发白。',
        emoji: '🌶️',
        time: 2
      },
      {
        title: '合炒调味',
        description: '将肉末回锅，加入15ml生抽、3ml老抽和3g白糖，大火翻炒1分钟使味道充分融合，撒入少许葱花即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '肉末要带一点肥肉才香，纯瘦肉炒出来口感偏干柴',
      '酸豆角一定要炒干水分，酸香味才能完全释放出来',
      '这道菜咸酸味重，生抽用量要控制，不需额外加盐',
      '用生菜叶包着吃是经典吃法，清爽解腻别有一番风味'
    ],
    tags: ['湘菜', '酸豆角', '肉末', '下饭菜', '酸辣'],
    description: '酸豆角炒肉末是湖南人最爱的下饭菜之一，酸香脆爽的腌豆角与焦香肉末在热油中碰撞交融，酸辣开胃，舀一勺拌进白米饭里，能吃三大碗。'
  },
  {
    id: 'hun-008',
    name: '麻辣子鸡',
    nameEn: 'Spicy Chicken Hunan Style',
    emoji: '🍗',
    image: '/recipes/default/hun-008.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'hard',
    prepTime: 25,
    cookTime: 15,
    totalTime: 40,
    servings: 3,
    calories: 460,
    protein: 35,
    fat: 30,
    carbs: 12,
    requiredIngredients: ['鸡', '辣椒', '大蒜', '鸡蛋', '面粉'],
    requiredSeasonings: ['盐', '生抽', '料酒', '淀粉', '花椒粉', '食用油', '胡椒粉', '白糖'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理鸡肉',
        description: '将半只仔鸡（约500g）剁成2cm见方的小块，用清水浸泡10分钟去除血水，沥干后加入3g盐、15ml料酒、15ml生抽、5g姜末、1个蛋清和10g淀粉抓匀，腌制15分钟。',
        emoji: '🔪',
        time: 15
      },
      {
        title: '准备香料',
        description: '将20个干红辣椒剪成小段去籽，15g花椒备用。30g大蒜切片，15g生姜切片，2根香葱切段。',
        emoji: '🌶️',
        time: 5
      },
      {
        title: '炸鸡块',
        description: '炒锅中倒入200ml食用油烧至六成热，下入腌好的鸡块中火炸3分钟至金黄定型，捞出。油温升至八成热复炸1分钟至酥脆，沥油备用。',
        emoji: '🔥',
        time: 5
      },
      {
        title: '爆香麻辣',
        description: '锅中留30ml底油，小火下入干辣椒段和花椒慢慢煸炒2分钟至辣椒颜色变深、麻辣香味飘出，注意不要炒糊。',
        emoji: '🌶️',
        time: 2
      },
      {
        title: '合炒出锅',
        description: '转大火，下入姜片、蒜片爆香15秒，加入炸好的鸡块快速翻炒，加入5g白糖、2g花椒粉和2g胡椒粉调味，最后撒入葱段翻炒10秒即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '选用仔鸡口感才嫩滑，老鸡适合炖汤不适合做麻辣子鸡',
      '腌制时加蛋清和淀粉能让炸出的鸡块外酥里嫩',
      '炸鸡块要复炸一次，第一次定型熟透，第二次酥脆上色',
      '炒辣椒花椒时一定要用小火，火大了容易炒糊发苦'
    ],
    tags: ['湘菜', '麻辣', '子鸡', '香辣', '下酒菜'],
    description: '麻辣子鸡是湘菜馆的招牌硬菜，外酥里嫩的仔鸡块在红亮辣椒和麻香花椒的簇拥下翻滚入味，麻辣鲜香层层递进，咬一口酥脆作响，麻辣过瘾让人停不下筷子。'
  },
  {
    id: 'hun-009',
    name: '红烧肉',
    nameEn: 'Hunan Red Braised Pork',
    emoji: '🍖',
    image: '/recipes/default/hun-009.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 90,
    totalTime: 105,
    servings: 4,
    calories: 580,
    protein: 22,
    fat: 48,
    carbs: 16,
    requiredIngredients: ['猪肉', '鸡蛋', '辣椒', '大蒜', '生姜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '冰糖', '八角', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '砂锅', '菜刀', '砧板'],
    steps: [
      {
        title: '焯水定型',
        description: '将500g带皮五花肉切成3cm见方的方块。冷水下锅加入15ml料酒和3片姜，大火煮开后焯水3分钟，捞出用温水冲净浮沫。',
        emoji: '🥩',
        time: 8
      },
      {
        title: '炒糖色',
        description: '炒锅中加20ml油和30g冰糖，小火慢炒至冰糖融化变成枣红色冒细密气泡时，迅速下入五花肉块翻炒2分钟，使每块肉均匀裹上糖色。',
        emoji: '🔥',
        time: 5
      },
      {
        title: '调味炖煮',
        description: '加入30ml料酒、30ml生抽、15ml老抽、2颗八角和5片姜翻炒出香味，倒入没过肉块的开水，大火烧开后转小火慢炖60分钟。',
        emoji: '🍲',
        time: 60
      },
      {
        title: '加蛋收汁',
        description: '将4个煮熟去壳的鸡蛋表面划几刀放入锅中，继续炖20分钟。转大火收汁，不停翻动防止粘锅，汤汁收至浓稠挂在肉上时撒入2g胡椒粉即可。',
        emoji: '🥚',
        time: 22
      }
    ],
    tips: [
      '五花肉要选肥瘦相间的三层肉，太瘦的肉炖出来不够香糯',
      '炒糖色要用小火慢炒，注意观察颜色变化，变深红色立刻下肉，否则会发苦',
      '炖肉一定要加开水不能加冷水，加冷水会让肉质紧缩变硬',
      '最后大火收汁是关键，收到汤汁浓稠包裹住每块肉，色泽红亮诱人'
    ],
    tags: ['湘菜', '红烧肉', '五花肉', '下饭菜', '经典菜'],
    description: '湘式红烧肉色泽红亮如琥珀，五花肉炖得酥软入味、肥而不腻，瘦而不柴，搭配吸饱肉汁的卤蛋，每一口都是浓郁醇厚的满足感，是湖南人过年过节必备的压轴大菜。'
  },
  {
    id: 'hun-010',
    name: '干锅肥肠',
    nameEn: 'Dry Pot Pork Intestine',
    emoji: '🥘',
    image: '/recipes/default/hun-010.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 25,
    totalTime: 55,
    servings: 3,
    calories: 520,
    protein: 20,
    fat: 42,
    carbs: 14,
    requiredIngredients: ['辣椒', '大蒜', '洋葱', '青椒', '土豆'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '豆瓣酱', '食用油', '花椒粉', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理肥肠',
        description: '将500g处理好的猪大肠翻面用盐和淀粉反复搓洗去除异味，冲洗干净后冷水下锅，加入20ml料酒、5片姜和3颗八角，大火煮开后转中火煮25分钟至筷子可以穿透。',
        emoji: '🔪',
        time: 30
      },
      {
        title: '切配配料',
        description: '将煮好的肥肠捞出晾凉，斜切成3cm长的滚刀块。1个土豆切条，1个洋葱切块，100g青红椒切块，50g大蒜整瓣拍松，30g生姜切片。',
        emoji: '🥔',
        time: 8
      },
      {
        title: '炸土豆',
        description: '炒锅中加200ml食用油烧至六成热，下入土豆条中火炸3分钟至表面金黄微焦，捞出沥油备用。',
        emoji: '🍟',
        time: 4
      },
      {
        title: '爆炒肥肠',
        description: '锅中留30ml底油，下入姜片、整蒜瓣和15g豆瓣酱小火炒出红油约1分钟，转大火下入肥肠块爆炒2分钟至表面焦香，加入15ml料酒和10ml生抽翻炒。',
        emoji: '🔥',
        time: 3
      },
      {
        title: '干锅收汁',
        description: '加入洋葱块、青红椒块和炸好的土豆条翻炒2分钟，加入5ml老抽上色、2g花椒粉和2g胡椒粉调味，大火翻炒至汤汁收干即可转入烧热的干锅上桌。',
        emoji: '🥘',
        time: 2
      }
    ],
    tips: [
      '肥肠清洗是关键，用盐和淀粉反复揉搓能有效去除异味',
      '肥肠一定要煮透煮软，否则嚼不动影响口感',
      '豆瓣酱要小火炒出红油后再下其他食材，香味才足',
      '干锅配菜可以加入洋葱和土豆，吸收肥肠的油脂后格外美味'
    ],
    tags: ['湘菜', '肥肠', '干锅', '辣', '下酒菜'],
    description: '干锅肥肠是湘菜馆的明星菜品，处理干净的猪大肠先煮后炒，在滚烫的干锅中与辣椒香料热烈共舞，肥肠外焦里嫩、嚼劲十足，麻辣鲜香层层叠叠，越吃越过瘾。'
  },
  {
    id: 'hun-011',
    name: '香辣蟹',
    nameEn: 'Spicy Crab Hunan Style',
    emoji: '🦀',
    image: '/recipes/default/hun-011.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'hard',
    prepTime: 20,
    cookTime: 20,
    totalTime: 40,
    servings: 3,
    calories: 340,
    protein: 28,
    fat: 22,
    carbs: 10,
    requiredIngredients: ['螃蟹', '辣椒', '大蒜', '生姜', '洋葱'],
    requiredSeasonings: ['盐', '生抽', '料酒', '淀粉', '豆瓣酱', '食用油', '胡椒粉', '白糖'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理螃蟹',
        description: '将3只鲜活的梭子蟹（约600g）刷洗干净，掀开蟹盖去除蟹腮和蟹胃，将蟹身对半斩开，蟹钳用刀背拍裂。在切面沾上一层薄薄的淀粉。',
        emoji: '🦀',
        time: 10
      },
      {
        title: '准备配料',
        description: '将100g干红辣椒剪段，50g大蒜拍碎，30g生姜切片，1个洋葱切块，2根香葱切段。',
        emoji: '🔪',
        time: 5
      },
      {
        title: '炸螃蟹',
        description: '炒锅中加入200ml食用油烧至七成热，下入螃蟹块中火炸2分钟至壳变红，捞出控油。',
        emoji: '🔥',
        time: 3
      },
      {
        title: '炒制香辣酱',
        description: '锅中留30ml底油，小火下入干辣椒段和15g花椒炒香约1分钟，加入姜片、蒜瓣、洋葱块和20g豆瓣酱炒出红油约2分钟。',
        emoji: '🌶️',
        time: 3
      },
      {
        title: '合炒调味',
        description: '转大火，下入炸好的螃蟹快速翻炒1分钟，加入15ml料酒、15ml生抽、5g白糖和2g胡椒粉调味，翻炒均匀后撒入葱段，再炒30秒即可出锅。',
        emoji: '🍳',
        time: 2
      }
    ],
    tips: [
      '螃蟹一定要选鲜活的，死蟹不能食用且腥味重',
      '蟹钳用刀背拍裂方便入味，吃的时候也容易剥开',
      '螃蟹切面沾淀粉可以锁住蟹黄蟹膏，炸的时候不会流失',
      '炒辣椒花椒要用小火，才能充分释放香味而不炒糊'
    ],
    tags: ['湘菜', '螃蟹', '香辣', '海鲜', '下酒菜'],
    description: '湘式香辣蟹将海鲜的鲜美与湘菜的香辣完美结合，饱满的蟹肉裹着麻辣鲜香的酱汁，掰开蟹壳的瞬间香气四溢，麻辣过瘾中透着蟹肉的清甜甘美，让人吮指回味。'
  },
  {
    id: 'hun-012',
    name: '腊味合蒸',
    nameEn: 'Steamed Assorted Cured Meats',
    emoji: '🥩',
    image: '/recipes/default/hun-012.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 40,
    totalTime: 55,
    servings: 4,
    calories: 550,
    protein: 30,
    fat: 44,
    carbs: 8,
    requiredIngredients: ['腊肉', '腊肠', '腊鸭腿'],
    requiredSeasonings: ['料酒', '生抽', '食用油', '白糖'],
    requiredTools: ['蒸锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理腊味',
        description: '将150g湘西腊肉、150g腊肠和1只腊鸭腿用温水刷洗干净，分别放入碗中加15ml料酒，上蒸锅大火蒸20分钟至回软。',
        emoji: '🥓',
        time: 22
      },
      {
        title: '切片摆盘',
        description: '将蒸好的腊肉切成3mm薄片，腊肠斜切成片，腊鸭腿斩成小块。取一个深盘，将三种腊味按扇形整齐码放在盘中，中间放入浸泡好的50g干豆角。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '调汁淋入',
        description: '小碗中混合15ml生抽、5g白糖、10ml食用油和20ml蒸腊味的原汤，搅匀后均匀淋在腊味上。',
        emoji: '🥣',
        time: 2
      },
      {
        title: '二次蒸制',
        description: '将摆好盘的腊味放入蒸锅，大火蒸20分钟使各种腊味的油脂和香气充分融合渗透，出锅后撒上少许葱花即可。',
        emoji: '♨️',
        time: 20
      }
    ],
    tips: [
      '腊味一定要先蒸一次再切片，否则太硬切不动且口感差',
      '不同腊味搭配蒸制，腊肉提供油脂、腊肠提供甜香、腊鸭提供腊香，层次丰富',
      '蒸腊味的原汤不要倒掉，加入调料中淋回去，味道更醇厚',
      '盘底垫上干豆角或芋头，吸收腊味滴下的油脂，非常美味'
    ],
    tags: ['湘菜', '腊味', '合蒸', '湘西', '传统菜'],
    description: '腊味合蒸是湘菜中一道经典的蒸菜，湘西腊肉、腊肠和腊鸭三种腊味同盘而蒸，各色腊味的油脂和香气在高温中交融渗透，腊香浓郁、咸鲜适口，是湖南年夜饭上不可或缺的传统美味。'
  },
  {
    id: 'hun-013',
    name: '酸辣土豆丝',
    nameEn: 'Hot and Sour Shredded Potatoes',
    emoji: '🥔',
    image: '/recipes/default/hun-013.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 12,
    cookTime: 5,
    totalTime: 17,
    servings: 3,
    calories: 180,
    protein: 4,
    fat: 8,
    carbs: 26,
    requiredIngredients: ['土豆', '辣椒', '大蒜'],
    requiredSeasonings: ['盐', '醋', '生抽', '食用油', '花椒粉', '白糖'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '切丝浸泡',
        description: '将2个大土豆（约400g）去皮，先切成薄片再切成均匀的细丝，放入清水中浸泡10分钟洗去多余淀粉，捞出沥干水分。',
        emoji: '🔪',
        time: 12
      },
      {
        title: '准备配料',
        description: '将5个干红辣椒切段去籽，20g大蒜切末，2根干红辣椒剪成细丝备用。',
        emoji: '🌶️',
        time: 3
      },
      {
        title: '爆香辣椒',
        description: '炒锅烧热加入25ml食用油，小火下入干辣椒段慢慢煸炒30秒至颜色变深出香味，注意不要炒糊。',
        emoji: '🔥',
        time: 1
      },
      {
        title: '快炒出锅',
        description: '转大火，下入蒜末爆香10秒，倒入沥干的土豆丝快速翻炒1分钟，沿锅边淋入20ml醋，加入3g盐、10ml生抽、2g白糖和2g花椒粉，再大火翻炒1分钟至土豆丝断生即可出锅。',
        emoji: '🍳',
        time: 2
      }
    ],
    tips: [
      '土豆丝切好后一定要泡水去除淀粉，炒出来才能爽脆不粘锅',
      '醋要沿锅边淋入，高温激发出醋香而不是单纯的酸味',
      '全程大火快炒是这道菜的灵魂，炒久了土豆丝就不脆了',
      '干辣椒小火煸出香味后再大火炒，麻辣味才足'
    ],
    tags: ['湘菜', '酸辣', '土豆丝', '快手菜', '素菜'],
    description: '湘式酸辣土豆丝讲究的是酸辣爽脆，土豆丝切得粗细均匀，在猛火中快炒而出，醋香与辣椒香交织缠绕，入口酸辣清脆，是一道素而不淡、开胃下饭的家常小炒。'
  },
  {
    id: 'hun-014',
    name: '虎皮青椒',
    nameEn: 'Tiger Skin Green Peppers',
    emoji: '🫑',
    image: '/recipes/default/hun-014.jpg',
    category: 'side',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 8,
    cookTime: 8,
    totalTime: 16,
    servings: 3,
    calories: 120,
    protein: 3,
    fat: 8,
    carbs: 10,
    requiredIngredients: ['青椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '醋', '食用油', '白糖'],
    requiredTools: ['平底锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理青椒',
        description: '将300g大青椒（二荆条或螺丝椒）去蒂洗净，用刀背将青椒拍扁拍松，不需要去籽，用厨房纸吸干表面水分。',
        emoji: '🫑',
        time: 5
      },
      {
        title: '煎出虎皮',
        description: '平底锅中加20ml食用油烧至六成热，下入青椒中小火煎制，用铲子不时按压青椒使其均匀受热，煎2分钟后翻面再煎2分钟，至两面出现焦褐色的虎皮斑纹。',
        emoji: '🔥',
        time: 4
      },
      {
        title: '调味出锅',
        description: '将青椒拨到一边，下入15g蒜末爆香15秒，加入15ml生抽、10ml醋、2g盐和3g白糖，大火快速翻炒30秒使调料均匀裹在青椒上即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '青椒一定要吸干水分再下锅，否则油花四溅且煎不出虎皮',
      '煎的过程中用铲子按压青椒，让椒皮紧贴锅面才能煎出漂亮的虎皮纹',
      '不喜欢太辣可以用大个的菜椒，喜欢辣味用螺丝椒或二荆条',
      '调味汁中的糖和醋比例要适中，酸甜平衡才能衬托青椒的本味'
    ],
    tags: ['湘菜', '虎皮青椒', '素菜', '快手菜', '下饭菜'],
    description: '虎皮青椒是湘菜中最朴实却最迷人的素菜，青椒在油锅中煎至表面起皱如虎皮，再用蒜蓉酱汁快速烹炒，焦香软嫩中透着辣椒的清甜微辣，简单的食材往往最考验厨艺。'
  },
  {
    id: 'hun-015',
    name: '口味虾',
    nameEn: 'Hunan Flavor Crayfish',
    emoji: '🦐',
    image: '/recipes/default/hun-015.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 25,
    totalTime: 55,
    servings: 4,
    calories: 320,
    protein: 26,
    fat: 20,
    carbs: 12,
    requiredIngredients: ['虾仁', '辣椒', '大蒜', '生姜', '洋葱', '黄瓜'],
    requiredSeasonings: ['盐', '生抽', '料酒', '豆瓣酱', '食用油', '花椒粉', '胡椒粉', '白糖', '五香粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理小龙虾',
        description: '将1000g小龙虾用刷子逐只刷洗腹部和头部，剪去虾须虾脚，从尾部中间抽出虾线。用清水冲洗两遍沥干。',
        emoji: '🦐',
        time: 20
      },
      {
        title: '准备香料',
        description: '将100g干红辣椒剪段，50g大蒜拍碎，30g生姜切片，1个洋葱切块，50g去皮大蒜整瓣备用。1根黄瓜切条垫在盘底。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '过油爆香',
        description: '炒锅中加入300ml食用油烧至七成热，下入小龙虾大火炸2分钟至壳变红，捞出沥油。锅中留50ml底油。',
        emoji: '🔥',
        time: 3
      },
      {
        title: '炒制底料',
        description: '底油中加入姜片、蒜瓣、洋葱块和30g豆瓣酱，小火炒5分钟至出红油，再加入干辣椒段和15g花椒继续炒2分钟出香。',
        emoji: '🌶️',
        time: 7
      },
      {
        title: '焖煮入味',
        description: '倒入炸好的小龙虾大火翻炒2分钟，加入30ml料酒、30ml生抽、10g白糖、3g盐、3g五香粉和2g胡椒粉，倒入500ml啤酒没过小龙虾，大火烧开后转中火焖煮10分钟，最后大火收汁即可装盘。',
        emoji: '🍳',
        time: 12
      }
    ],
    tips: [
      '小龙虾要逐个刷洗干净，抽去虾线能去除大部分腥味',
      '过油后的龙虾肉质更紧实弹牙，焖煮时不容易散',
      '用啤酒代替水焖煮可以去腥增香，麦芽的香气和麻辣味非常搭',
      '吃口味虾一定要备足纸巾，双手剥虾、满嘴油光才是正确的打开方式'
    ],
    tags: ['湘菜', '口味虾', '小龙虾', '麻辣', '夜市美食'],
    description: '口味虾是湖南夜宵文化的灵魂代表，饱满的小龙虾在麻辣红亮的汤汁中焖煮入味，剥开虾壳露出紧实弹牙的虾肉，蘸上浓郁香辣的汤汁，配上冰镇啤酒，就是湖南人最惬意的夏日夜晚。'
  },
  {
    id: 'hun-016',
    name: '茄子煲',
    nameEn: 'Hunan Eggplant Clay Pot',
    emoji: '🍆',
    image: '/recipes/default/hun-016.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 3,
    calories: 260,
    protein: 6,
    fat: 18,
    carbs: 22,
    requiredIngredients: ['茄子', '猪肉', '辣椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '蚝油', '豆瓣酱', '淀粉', '食用油', '白糖'],
    requiredTools: ['砂锅', '炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理茄子',
        description: '将2根长茄子（约400g）洗净，不去皮切成5cm长的条，撒上3g盐抓匀腌制5分钟，挤去多余水分后表面撒上10g淀粉抓匀。',
        emoji: '🍆',
        time: 8
      },
      {
        title: '煎茄子',
        description: '平底锅中加30ml食用油烧至六成热，下入茄条中火煎3分钟至两面金黄变软，盛出备用。',
        emoji: '🔥',
        time: 4
      },
      {
        title: '炒肉末',
        description: '锅中加10ml油，下入50g猪肉末炒散至变色，加入15g蒜末和20g豆瓣酱小火炒出红油约1分钟。',
        emoji: '🥩',
        time: 2
      },
      {
        title: '砂锅焖煮',
        description: '砂锅烧热，倒入炒好的肉末和煎好的茄条，加入15ml生抽、5ml老抽、10ml蚝油、3g白糖和50ml清水，大火烧开后转小火焖3分钟，淋入少许水淀粉勾芡，撒上青红椒圈和葱花即可。',
        emoji: '🍲',
        time: 4
      }
    ],
    tips: [
      '茄子不去皮可以保持形状完整，煎的时候不易散烂',
      '腌过的茄子挤去水分再煎，不吸油且口感更紧实',
      '用砂锅盛装上桌保温效果好，滋滋冒油的声音让人食欲大增',
      '豆瓣酱要选郫县豆瓣，红油多且咸味适中'
    ],
    tags: ['湘菜', '茄子煲', '砂锅菜', '下饭菜', '家常菜'],
    description: '湘式茄子煲将软糯的茄子与咸香的肉末在滚烫的砂锅中交融，茄条吸饱了豆瓣酱汁和肉香，入口绵软即化、咸鲜微辣，砂锅保温的方式让整道菜从第一口到最后一口都热气腾腾。'
  },
  {
    id: 'hun-017',
    name: '蒜苗炒肉',
    nameEn: 'Garlic Sprouts with Pork',
    emoji: '🥬',
    image: '/recipes/default/hun-017.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'easy',
    prepTime: 12,
    cookTime: 8,
    totalTime: 20,
    servings: 3,
    calories: 380,
    protein: 24,
    fat: 28,
    carbs: 10,
    requiredIngredients: ['猪肉', '大蒜', '辣椒', '荷兰豆'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将200g猪里脊肉切成2mm薄片，加入5ml料酒、10ml生抽和3g淀粉抓匀腌制5分钟。300g蒜苗洗净，蒜白拍松斜切成段，蒜叶切段。3个红尖椒斜切圈。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '滑炒肉片',
        description: '炒锅中加20ml食用油烧至六成热，下入腌好的肉片快速滑炒至变色约40秒，盛出备用。',
        emoji: '🥩',
        time: 1
      },
      {
        title: '炒蒜苗',
        description: '锅中加10ml油，先下入蒜白段大火翻炒1分钟，再加入蒜叶段和红椒圈翻炒30秒。',
        emoji: '🥬',
        time: 2
      },
      {
        title: '合炒调味',
        description: '将肉片回锅，加入5ml老抽上色和2g胡椒粉，大火快速翻炒30秒使所有食材均匀裹上酱色，沿锅边淋入少许香醋增香，翻炒均匀即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '蒜白和蒜叶要分开下锅，蒜白耐炒先下出香，蒜叶后下保持翠绿',
      '里脊肉切薄片并用淀粉腌制，炒出来才嫩滑不柴',
      '这道菜火候是关键，全程大火快炒，蒜苗断生即可出锅',
      '红椒圈主要起点缀和增辣作用，可以用干辣椒代替'
    ],
    tags: ['湘菜', '蒜苗', '猪肉', '快手菜', '家常菜'],
    description: '蒜苗炒肉是一道看似简单却极其讲究火候的湘菜小炒，嫩滑的肉片与清香的蒜苗在烈火中快炒而出，蒜香扑鼻、肉香四溢，翠绿的蒜叶与酱色的肉片交相辉映，清新中透着浓郁。'
  },
  {
    id: 'hun-018',
    name: '豆角茄子',
    nameEn: 'Green Beans and Eggplant Stir-fry',
    emoji: '🥬',
    image: '/recipes/default/hun-018.jpg',
    category: 'side',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 3,
    calories: 200,
    protein: 6,
    fat: 14,
    carbs: 18,
    requiredIngredients: ['茄子', '豆芽', '辣椒', '大蒜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '蚝油', '淀粉', '食用油', '白糖'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '准备食材',
        description: '将200g长茄子洗净不去皮切成5cm长的条，200g四季豆去两头撕去老筋掰成5cm段。茄子撒上2g盐腌制5分钟后挤干水分，拍上10g淀粉。',
        emoji: '🔪',
        time: 8
      },
      {
        title: '煎炸处理',
        description: '炒锅中加100ml食用油烧至六成热，先下入四季豆中火炸3分钟至表面起皱捞出控油。再将茄条下锅炸2分钟至金黄变软捞出。',
        emoji: '🔥',
        time: 5
      },
      {
        title: '爆香炒制',
        description: '锅中留20ml底油，下入15g蒜末和3个切段的干辣椒爆香30秒，下入炸好的四季豆和茄条大火翻炒1分钟。',
        emoji: '🌶️',
        time: 1
      },
      {
        title: '调味出锅',
        description: '加入15ml生抽、5ml老抽、10ml蚝油和3g白糖，大火翻炒1分钟使调料均匀裹在食材上，淋入少许水淀粉勾薄芡，翻炒均匀即可出锅。',
        emoji: '🍳',
        time: 1
      }
    ],
    tips: [
      '四季豆一定要炸熟炸透，生四季豆有毒不能食用',
      '茄子先腌后炸可以大大减少吸油量，成品清爽不油腻',
      '两种食材分开炸制，成熟度不同不能一锅下',
      '最后勾薄芡让味道更好地挂在食材表面，口感更浓郁'
    ],
    tags: ['湘菜', '豆角茄子', '素菜', '下饭菜', '家常菜'],
    description: '豆角茄子是湘菜素菜中的经典搭配，翠绿的四季豆与紫亮的茄条经过油炸再同炒，软糯与脆嫩在口中形成奇妙的反差，浓郁的酱汁包裹着每一根菜条，素菜也能吃出满满的幸福感。'
  },
  {
    id: 'hun-019',
    name: '野山椒炒牛肉',
    nameEn: 'Mountain Pepper Beef Stir-fry',
    emoji: '🥩',
    image: '/recipes/default/hun-019.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 8,
    totalTime: 28,
    servings: 3,
    calories: 400,
    protein: 36,
    fat: 24,
    carbs: 8,
    requiredIngredients: ['牛肉', '辣椒', '大蒜', '剁椒'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '淀粉', '蚝油', '食用油', '胡椒粉'],
    requiredTools: ['炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '切肉腌制',
        description: '将300g牛里脊肉逆纹切成2mm薄片，加入3g盐、15ml生抽、5ml老抽、10ml料酒、5g淀粉和5ml食用油抓匀，腌制15分钟。',
        emoji: '🥩',
        time: 15
      },
      {
        title: '准备配料',
        description: '将80g野山椒（泡椒）从中间切开，50g青尖椒切圈，30g大蒜切片，20g生姜切丝，2根香芹切段。',
        emoji: '🌶️',
        time: 5
      },
      {
        title: '滑炒牛肉',
        description: '炒锅烧热加入30ml食用油烧至七成热，下入腌好的牛肉片快速滑炒至变色约40秒，立即盛出控油。',
        emoji: '🔥',
        time: 1
      },
      {
        title: '爆香合炒',
        description: '锅中留底油15ml，下入姜丝、蒜片和野山椒大火爆香30秒，再加入青椒圈翻炒30秒。将牛肉回锅，加入10ml蚝油和2g胡椒粉，大火快速翻炒30秒，撒入香芹段翻炒几下即可出锅。',
        emoji: '🍳',
        time: 2
      }
    ],
    tips: [
      '野山椒是泡制的，带有独特的酸辣风味，是这道菜的灵魂',
      '牛肉腌制时要加食用油锁住水分，炒出来才嫩滑多汁',
      '野山椒本身有咸味和酸味，调味时注意盐和醋的用量',
      '香芹最后放入稍微翻炒即可，保持脆嫩的口感和清新的香气'
    ],
    tags: ['湘菜', '牛肉', '野山椒', '酸辣', '下饭菜'],
    description: '野山椒炒牛肉是湘菜中酸辣风味的代表作，嫩滑的牛肉片与金黄酸辣的野山椒在热油中共舞，泡椒特有的酸香与牛肉的鲜美完美融合，酸辣开胃、回味悠长，是一道让人胃口大开的下饭利器。'
  },
  {
    id: 'hun-020',
    name: '剁椒蒸排骨',
    nameEn: 'Steamed Ribs with Chopped Chili',
    emoji: '🍖',
    image: '/recipes/default/hun-020.jpg',
    category: 'main',
    cuisine: '湘菜',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    servings: 3,
    calories: 420,
    protein: 28,
    fat: 32,
    carbs: 6,
    requiredIngredients: ['排骨', '剁椒', '辣椒', '大蒜', '生姜'],
    requiredSeasonings: ['盐', '生抽', '老抽', '料酒', '蚝油', '淀粉', '食用油', '白糖'],
    requiredTools: ['蒸锅', '炒锅', '菜刀', '砧板'],
    steps: [
      {
        title: '处理排骨',
        description: '将500g猪肋排斩成4cm长的小段，用清水浸泡20分钟去除血水，捞出沥干。加入3g盐、15ml料酒、10ml生抽、5ml老抽和5g淀粉抓匀，腌制15分钟。',
        emoji: '🔪',
        time: 20
      },
      {
        title: '炒制剁椒酱',
        description: '炒锅中加20ml食用油烧热，下入20g蒜末和15g姜末爆香30秒，加入100g剁椒和30g切碎的红辣椒，小火炒3分钟出红油，加入10ml蚝油和5g白糖调味。',
        emoji: '🌶️',
        time: 4
      },
      {
        title: '铺酱蒸制',
        description: '将腌好的排骨整齐码入深盘中，将炒好的剁椒酱均匀铺在排骨上。蒸锅加水烧开后放入排骨，大火蒸30分钟。',
        emoji: '♨️',
        time: 30
      },
      {
        title: '出锅点缀',
        description: '蒸好的排骨取出，撒上葱花。另起锅烧15ml食用油至冒烟，浇在排骨上激发出剁椒和葱花的香气即可上桌。',
        emoji: '🔥',
        time: 2
      }
    ],
    tips: [
      '排骨要选肉多骨小的肋排，浸泡去血水可以有效去除腥味',
      '腌制时加入淀粉可以让蒸出来的排骨更嫩滑多汁',
      '剁椒酱先炒再蒸，香味比直接蒸更浓郁，红油也更丰富',
      '蒸的时间不宜超过35分钟，否则排骨肉会脱骨散烂失去口感'
    ],
    tags: ['湘菜', '排骨', '剁椒', '蒸菜', '下饭菜'],
    description: '剁椒蒸排骨是湘菜蒸菜中的经典之作，鲜嫩的肋排铺满红亮咸香的剁椒酱，经过大火蒸制后排骨软烂脱骨、入味至深，剁椒的鲜辣与排骨的肉香完美交织，每一块都让人齿颊留香。'
  }
]
