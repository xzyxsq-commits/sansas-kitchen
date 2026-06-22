export interface Recipe {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  image: string;
  category: string;
  cuisine: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  requiredIngredients: string[];
  requiredSeasonings: string[];
  requiredTools: string[];
  steps: RecipeStep[];
  tips: string[];
  tags: string[];
  description: string;
}

export interface RecipeStep {
  title: string;
  description: string;
  emoji: string;
  time?: number;
}

export const italianRecipes: Recipe[] = [
  {
    id: 'ita-001',
    name: '经典卡邦尼意面',
    nameEn: 'Carbonara',
    emoji: '🍝',
    image: '/recipes/default/ita-001.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 2,
    calories: 620,
    protein: 28,
    fat: 35,
    carbs: 48,
    requiredIngredients: ['意面', '鸡蛋', '培根', '芝士'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油'],
    requiredTools: ['汤锅', '平底锅', '菜刀', '砧板'],
    steps: [
      { title: '煮意面', description: '大汤锅加水烧开，加盐，放入意面煮至弹牙（比包装时间少1分钟）。留一杯煮面水备用。', emoji: '🍝', time: 10 },
      { title: '准备酱料', description: '碗中打入2个全蛋和2个蛋黄，加入磨碎的帕玛森芝士和黑胡椒，搅拌均匀。', emoji: '🥚', time: 3 },
      { title: '煎培根', description: '平底锅中火加热，不放油，将切块的培根煎至金黄酥脆，逼出油脂。', emoji: '🥓', time: 5 },
      { title: '混合', description: '关火，将煮好的意面直接夹入培根锅中，稍微冷却30秒后倒入蛋液，快速翻拌。', emoji: '🔄', time: 2 },
      { title: '调整浓稠度', description: '分次加入煮面水调整酱汁浓稠度，直到酱汁丝滑包裹每根面条。', emoji: '💧', time: 1 },
      { title: '装盘', description: '盛入温热的盘中，撒上额外帕玛森芝士和黑胡椒碎，立即享用。', emoji: '🍽️', time: 1 }
    ],
    tips: [
      '蛋液倒入时锅一定要离火，否则会变成炒蛋',
      '使用Guanciale（猪脸颊肉）比培根更正宗',
      '正宗的卡邦尼不加奶油，只用鸡蛋和芝士创造丝滑口感',
      '意面要用 spaghetti 或 rigatoni'
    ],
    tags: ['意面', '经典意式', '快手菜', '芝士'],
    description: '卡邦尼意面是罗马最具代表性的经典意面，以鸡蛋、芝士、培根和黑胡椒四种基本食材创造出丝滑浓郁的美味。每一根意面都裹满金黄色的蛋液酱汁，培根咸香酥脆，黑胡椒的微辣恰到好处，是意大利家庭料理的灵魂之作。'
  },
  {
    id: 'ita-002',
    name: '博洛尼亚肉酱面',
    nameEn: 'Bolognese',
    emoji: '🍝',
    image: '/recipes/default/ita-002.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 60,
    totalTime: 75,
    servings: 4,
    calories: 580,
    protein: 32,
    fat: 22,
    carbs: 55,
    requiredIngredients: ['牛肉馅', '洋葱', '胡萝卜', '番茄', '意面', '牛奶', '培根'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '料酒'],
    requiredTools: ['汤锅', '平底锅', '菜刀', '砧板'],
    steps: [
      { title: '准备蔬菜', description: '洋葱、胡萝卜、芹菜切细丁。培根切碎。番茄去皮切碎备用。', emoji: '🔪', time: 8 },
      { title: '炒培根和蔬菜', description: '大平底锅加橄榄油，中小火炒培根至出油，加入洋葱丁炒至透明（约5分钟），再加入胡萝卜和芹菜炒软。', emoji: '🥕', time: 8 },
      { title: '炒牛肉馅', description: '加入牛肉馅，中火炒散至变色，倒入料酒去腥。', emoji: '🥩', time: 5 },
      { title: '加番茄炖煮', description: '加入番茄碎和少量牛奶（使肉质更嫩），转小火慢炖至少45分钟，偶尔搅拌。', emoji: '🍅', time: 45 },
      { title: '煮意面', description: '根据包装说明煮意面至弹牙，留少量煮面水。', emoji: '🍝', time: 10 },
      { title: '装盘', description: '将肉酱浇在煮好的意面上，撒上帕玛森芝士碎。传统博洛尼亚肉酱搭配宽面（Tagliatelle）。', emoji: '🧀', time: 2 }
    ],
    tips: [
      '博洛尼亚肉酱一定要慢炖至少45分钟，时间越长风味越浓郁',
      '加入少量牛奶是博洛尼亚肉酱的秘密，能让肉质更嫩',
      '正宗的博洛尼亚肉酱搭配宽面而非 spaghetti',
      '一次多做些，冷藏后第二天味道更佳'
    ],
    tags: ['肉酱', '意面', '慢炖', '经典意式'],
    description: '博洛尼亚肉酱面源自意大利博洛尼亚，是享誉世界的经典意式肉酱面。以牛肉馅、番茄和蔬菜慢炖数小时而成，酱汁浓郁醇厚，肉质鲜嫩入味。与传统意大利面不同，正宗的博洛尼亚肉酱搭配宽面或千层面，每一口都是满满的幸福感。'
  },
  {
    id: 'ita-003',
    name: '千层面',
    nameEn: 'Lasagna',
    emoji: '🧀',
    image: '/recipes/default/ita-003.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 60,
    totalTime: 90,
    servings: 6,
    calories: 680,
    protein: 35,
    fat: 38,
    carbs: 42,
    requiredIngredients: ['牛肉馅', '意面', '番茄', '芝士', '洋葱', '大蒜', '牛奶', '黄油', '菠菜'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '生抽'],
    requiredTools: ['烤箱', '烤盘', '平底锅', '汤锅', '菜刀', '砧板'],
    steps: [
      { title: '制作肉酱', description: '平底锅加橄榄油，炒香洋葱丁和蒜末，加入牛肉馅炒至变色，倒入番茄碎，加盐和胡椒调味，小火炖30分钟。', emoji: '🥩', time: 35 },
      { title: '制作白酱', description: '另一个锅融化黄油，加入面粉搅拌成糊，分次倒入牛奶不断搅拌，煮至浓稠，加盐和肉蔻粉调味。', emoji: '🥛', time: 8 },
      { title: '煮千层面皮', description: '开水加盐，煮千层面皮至七成熟（如果用免煮面皮则跳过此步）。', emoji: '🍝', time: 5 },
      { title: '分层组装', description: '烤盘底部铺薄层肉酱，依次叠放：面皮、肉酱、白酱、马苏里拉芝士和菠菜，重复3-4层，最上层铺满芝士。', emoji: '📚', time: 10 },
      { title: '烘烤', description: '烤箱预热180°C，盖锡纸烤30分钟，去掉锡纸再烤15分钟至表面金黄起泡。', emoji: '🔥', time: 45 },
      { title: '静置切块', description: '取出后静置10-15分钟让千层面定型，然后切块享用。', emoji: '✂️', time: 12 }
    ],
    tips: [
      '千层面组装后静置10分钟再切块，不容易塌陷',
      '肉酱可以提前一天做好，风味更好',
      '最上层多放些芝士，烤出金黄焦脆的表皮',
      '如果使用免煮面皮，确保肉酱足够湿润以软化面皮'
    ],
    tags: ['千层面', '芝士', '烤箱菜', '宴客菜'],
    description: '意式千层面是意大利最具代表性的烤箱料理之一。层层叠叠的意面皮与浓郁的番茄肉酱、丝滑的白酱和拉丝芝士完美交融，每一层都饱含着丰富的风味。金黄焦脆的表皮下是柔软多汁的内馅，切开时芝士拉丝，香气四溢，是家庭聚餐和宴客的绝佳选择。'
  },
  {
    id: 'ita-004',
    name: '蘑菇烩饭',
    nameEn: 'Risotto ai Funghi',
    emoji: '🍚',
    image: '/recipes/default/ita-004.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'hard',
    prepTime: 10,
    cookTime: 35,
    totalTime: 45,
    servings: 2,
    calories: 510,
    protein: 14,
    fat: 24,
    carbs: 62,
    requiredIngredients: ['米饭', '蘑菇', '洋葱', '黄油', '芝士', '大蒜'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '料酒'],
    requiredTools: ['平底锅', '汤锅', '菜刀', '砧板'],
    steps: [
      { title: '准备高汤', description: '鸡汤（或蔬菜汤）加热至微沸，保持温热备用。这是烩饭成功的关键。', emoji: '🍲', time: 5 },
      { title: '炒蘑菇', description: '平底锅加橄榄油和一小块黄油，中大火将切片的蘑菇煎至金黄色，盛出备用。', emoji: '🍄', time: 6 },
      { title: '炒洋葱和米', description: '同一锅加黄油，小火炒洋葱丁至透明（约5分钟），加入米（Arborio米）炒至米粒边缘透明。', emoji: '🧅', time: 6 },
      { title: '加酒增香', description: '倒入料酒或白葡萄酒，搅拌至完全被米粒吸收。', emoji: '🍷', time: 2 },
      { title: '分次加汤', description: '分4-5次加入温热的汤，每次一勺，不断搅拌至汤汁被米粒吸收后再加下一勺，持续约18-20分钟。', emoji: '🥄', time: 20 },
      { title: '收尾', description: '米粒弹牙时，拌入炒好的蘑菇、一块黄油和磨碎的帕玛森芝士，盖上盖子静置2分钟。', emoji: '🧈', time: 3 }
    ],
    tips: [
      '烩饭一定要用高淀粉的Arborio米或Carnaroli米',
      '汤必须一直保持温热，冷汤会影响米粒释放淀粉',
      '持续搅拌是烩饭丝滑的关键，不要偷懒',
      '最后加黄油和芝士的步骤叫 mantecatura，决定最终口感'
    ],
    tags: ['烩饭', '蘑菇', '意式', '米食'],
    description: '蘑菇烩饭是意大利北部伦巴第地区的经典美食。选用高淀粉含量的Arborio米，在反复加入高汤和持续搅拌的过程中，米粒释放出丰富的淀粉，形成天然的奶油般丝滑质地。搭配煎至金黄的混合蘑菇，每一口都充满了菌菇的香气和米粒的弹牙口感。'
  },
  {
    id: 'ita-005',
    name: '玛格丽特披萨',
    nameEn: 'Margherita Pizza',
    emoji: '🍕',
    image: '/recipes/default/ita-005.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'hard',
    prepTime: 120,
    cookTime: 15,
    totalTime: 135,
    servings: 4,
    calories: 550,
    protein: 22,
    fat: 18,
    carbs: 72,
    requiredIngredients: ['番茄', '芝士', '面粉', '橄榄油'],
    requiredSeasonings: ['盐', '橄榄油', '罗勒叶'],
    requiredTools: ['烤箱', '烤盘', '擀面杖', '菜刀', '砧板'],
    steps: [
      { title: '制作面团', description: '面粉、温水、酵母、盐和橄榄油混合，揉面10分钟至光滑有弹性，盖上湿布发酵2小时至两倍大。', emoji: '👩‍🍳', time: 130 },
      { title: '准备番茄酱', description: '番茄罐头顶级圣马扎诺番茄压碎，加少许盐和橄榄油，不用煮。', emoji: '🍅', time: 3 },
      { title: '整形', description: '面团分成4份，在撒了面粉的台面上用手掌压扁，从中心向外推成薄圆饼，边缘稍厚。', emoji: '🔄', time: 5 },
      { title: '铺料', description: '在面饼上均匀涂抹番茄酱，放上撕碎的马苏里拉芝士，淋上橄榄油。', emoji: '🧀', time: 2 },
      { title: '烤制', description: '烤箱预热至最高温度（250°C或以上），放入披萨烤10-12分钟至饼底金黄、芝士融化起泡。', emoji: '🔥', time: 12 },
      { title: '装饰上桌', description: '出炉后趁热放上新鲜罗勒叶，淋上特级初榨橄榄油，立即切块享用。', emoji: '🌿', time: 2 }
    ],
    tips: [
      '披萨面团需要充分发酵，至少2小时，冷藏发酵24小时风味更好',
      '烤箱要预热到最高温度，石板或铸铁锅能烤出更脆的饼底',
      '马苏里拉芝士要撕碎而非切碎，新鲜水牛芝士最佳',
      '番茄酱不要放太多，薄薄一层即可，否则饼底会湿'
    ],
    tags: ['披萨', '经典意式', '芝士', '烤箱菜'],
    description: '玛格丽特披萨是意大利最具代表性的披萨，以番茄的红、马苏里拉的白和罗勒的绿完美诠释了意大利国旗的颜色。薄脆的饼底铺上酸甜的番茄酱和拉丝的马苏里拉芝士，烤至边缘微焦、芝士起泡，新鲜罗勒的香气在口中绽放，简单却极致美味。'
  },
  {
    id: 'ita-006',
    name: '青酱意面',
    nameEn: 'Pesto Pasta',
    emoji: '🌿',
    image: '/recipes/default/ita-006.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 2,
    calories: 540,
    protein: 18,
    fat: 28,
    carbs: 52,
    requiredIngredients: ['意面', '芝士', '橄榄油'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油'],
    requiredTools: ['汤锅', '料理机', '平底锅', '菜刀', '砧板'],
    steps: [
      { title: '煮意面', description: '大锅烧水加盐，煮意面至弹牙，留半杯煮面水备用。', emoji: '🍝', time: 10 },
      { title: '制作青酱', description: '料理机中加入新鲜罗勒叶、松子仁、蒜瓣、帕玛森芝士碎和特级初榨橄榄油，打至顺滑。', emoji: '🌿', time: 3 },
      { title: '混合', description: '将煮好的意面放入大碗，加入2-3大勺青酱，根据干湿程度加入少许煮面水，充分拌匀。', emoji: '🔄', time: 2 },
      { title: '装盘', description: '盛入盘中，撒上松子仁和帕玛森芝士碎，淋上少许橄榄油。', emoji: '🍽️', time: 1 }
    ],
    tips: [
      '青酱最好现做现吃，放置太久会氧化变黑',
      '松子仁可以提前用平底锅小火烘烤一下，香气更浓郁',
      '如果青酱太稠，加煮面水调节而不是加油',
      '青酱意面可以搭配樱桃番茄或烤鸡胸肉一起食用'
    ],
    tags: ['青酱', '意面', '快手菜', '素食'],
    description: '青酱意面源自意大利热那亚，是夏日最清新的意面选择。翠绿的罗勒青酱由新鲜罗勒叶、松子仁、蒜和帕玛森芝士制成，香气浓郁独特。每一根意面都裹满清新的青酱，搭配松子的香脆和芝士的咸鲜，只需20分钟就能完成的经典意式美味。'
  },
  {
    id: 'ita-007',
    name: '米兰炖牛膝',
    nameEn: 'Osso Buco',
    emoji: '🍖',
    image: '/recipes/default/ita-007.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'hard',
    prepTime: 20,
    cookTime: 120,
    totalTime: 140,
    servings: 2,
    calories: 650,
    protein: 48,
    fat: 32,
    carbs: 28,
    requiredIngredients: ['牛肉', '洋葱', '胡萝卜', '番茄', '大蒜'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '料酒'],
    requiredTools: ['汤锅', '平底锅', '菜刀', '砧板', '烤箱'],
    steps: [
      { title: '煎牛膝', description: '牛膝（带骨小牛腿肉）两面撒盐和面粉，平底锅加橄榄油，中高火煎至两面深金黄色。', emoji: '🥩', time: 8 },
      { title: '炒蔬菜', description: '同一锅加入切丁的洋葱、胡萝卜，炒至蔬菜变软，加蒜末爆香。', emoji: '🥕', time: 6 },
      { title: '加番茄和酒', description: '加入番茄碎和料酒，刮起锅底焦香物质，煮沸。', emoji: '🍅', time: 3 },
      { title: '慢炖', description: '将牛膝放回锅中，加高汤至食材的2/3高度，盖锅盖，小火慢炖1.5-2小时至肉骨分离。', emoji: '⏱️', time: 100 },
      { title: '制作Gremolata', description: '欧芹碎、蒜末和柠檬皮屑混合制成Gremolata，这是米兰炖牛膝的点睛配料。', emoji: '🌿', time: 3 },
      { title: '装盘', description: '炖好的牛膝盛盘，撒上Gremolata，搭配米兰式藏红花烩饭或意面食用。', emoji: '🍽️', time: 2 }
    ],
    tips: [
      '牛膝一定要煎到深金黄色再炖，颜色越深风味越浓郁',
      '慢炖时水量保持在食材2/3高度，中途如需加水加热水',
      'Gremolata一定要上桌前再撒，保持清香',
      '骨髓是精华，用细勺挖出涂抹在面包上享用'
    ],
    tags: ['炖菜', '牛肉', '意式', '慢炖', '宴客菜'],
    description: '米兰炖牛膝是意大利伦巴第地区的标志性料理。带骨小牛腿肉经过长时间慢炖，肉质酥烂脱骨，骨髓的浓郁风味融入酱汁中，口感极为丰富。搭配标志性的Gremolata（欧芹、蒜和柠檬皮混合），清爽的香草气息完美平衡了肉类的厚重感，是米兰美食的骄傲。'
  },
  {
    id: 'ita-008',
    name: '意式烤面包',
    nameEn: 'Bruschetta',
    emoji: '🥖',
    image: '/recipes/default/ita-008.jpg',
    category: 'appetizer',
    cuisine: '意式',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    servings: 4,
    calories: 180,
    protein: 5,
    fat: 8,
    carbs: 22,
    requiredIngredients: ['番茄', '大蒜', '橄榄油'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油'],
    requiredTools: ['烤箱', '烤盘', '菜刀', '砧板'],
    steps: [
      { title: '烤面包', description: '意式乡村面包切片，烤箱预热200°C，烤至两面金黄酥脆（约5分钟）。', emoji: '🍞', time: 6 },
      { title: '准备番茄 topping', description: '成熟番茄去籽切小丁，加切碎的新鲜罗勒、蒜末、盐、黑胡椒和特级初榨橄榄油拌匀，腌制5分钟。', emoji: '🍅', time: 7 },
      { title: '擦拭蒜香', description: '烤好的面包趁热用大蒜切面擦拭，使面包吸收蒜香。', emoji: '🧄', time: 1 },
      { title: '组装', description: '将番茄混合物舀在面包上，淋上少许橄榄油，立即上桌。', emoji: '✨', time: 1 }
    ],
    tips: [
      '面包要烤得足够脆，否则会被番茄汁浸软',
      '番茄一定要去籽，否则太湿影响口感',
      '用大蒜切面擦拭烤面包是风味关键的一步',
      '最好选用成熟的樱桃番茄或罗马番茄'
    ],
    tags: ['前菜', '烤面包', '番茄', '快手菜'],
    description: '意式烤面包是意大利最经典的前菜之一。酥脆的烤面包片用大蒜擦出香气，铺上以特级初榨橄榄油调味的番茄丁，简单却充满了地中海阳光的味道。番茄酸甜多汁、面包酥脆可口，是夏日聚会的完美开场。'
  },
  {
    id: 'ita-009',
    name: '意大利蔬菜汤',
    nameEn: 'Minestrone',
    emoji: '🥣',
    image: '/recipes/default/ita-009.jpg',
    category: 'soup',
    cuisine: '意式',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 40,
    totalTime: 55,
    servings: 4,
    calories: 220,
    protein: 8,
    fat: 6,
    carbs: 35,
    requiredIngredients: ['番茄', '洋葱', '胡萝卜', '土豆', '西兰花', '大蒜', '意面'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '罗勒叶'],
    requiredTools: ['汤锅', '菜刀', '砧板'],
    steps: [
      { title: '炒蔬菜基底', description: '汤锅加橄榄油，中小火炒洋葱丁、胡萝卜丁和西芹丁约8分钟至蔬菜变软出香。', emoji: '🧅', time: 8 },
      { title: '加蒜和番茄', description: '加入蒜末爆香，倒入切碎的番茄煮2分钟。', emoji: '🍅', time: 3 },
      { title: '加其他蔬菜', description: '加入土豆丁、青豆、西葫芦丁和切碎的卷心菜，翻炒均匀。', emoji: '🥔', time: 3 },
      { title: '加汤炖煮', description: '倒入蔬菜高汤或鸡汤，加盐和胡椒调味，大火煮沸后转小火炖20分钟。', emoji: '💧', time: 22 },
      { title: '加意面', description: '加入小管面或贝壳面，继续煮8-10分钟至意面熟透。', emoji: '🍝', time: 10 },
      { title: '调味上桌', description: '关火后淋上特级初榨橄榄油，撒上帕玛森芝士碎和新鲜罗勒叶。', emoji: '🌿', time: 2 }
    ],
    tips: [
      '蔬菜可以随季节更换，Minestrone的精髓就是用当季蔬菜',
      '加一块帕玛森芝士皮一起炖，风味更加浓郁',
      '汤的浓稠度可以调节，喜欢浓汤可以压碎部分蔬菜',
      '做好后放置一晚，第二天味道更融合'
    ],
    tags: ['汤', '蔬菜', '意式', '健康'],
    description: '意大利蔬菜汤是托斯卡纳地区家家户户都会做的传统浓汤。以洋葱、胡萝卜、西芹为基底，加入当季的各种蔬菜和意大利面慢火炖煮，每一勺都满载着蔬菜的鲜甜和番茄的酸爽。淋上特级初榨橄榄油，配上一片烤面包，就是最暖心的comfort food。'
  },
  {
    id: 'ita-010',
    name: '提拉米苏',
    nameEn: 'Tiramisu',
    emoji: '🍰',
    image: '/recipes/default/ita-010.jpg',
    category: 'dessert',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 0,
    totalTime: 270,
    servings: 6,
    calories: 420,
    protein: 10,
    fat: 28,
    carbs: 38,
    requiredIngredients: ['鸡蛋', '芝士', '牛奶'],
    requiredSeasonings: ['糖', '香草精'],
    requiredTools: ['打蛋器'],
    steps: [
      { title: '分离蛋黄蛋清', description: '将鸡蛋的蛋黄和蛋清分开，分别放入两个干净的大碗中。', emoji: '🥚', time: 3 },
      { title: '制作蛋黄糊', description: '蛋黄加入细砂糖，用打蛋器打至浓稠发白，加入马斯卡彭芝士搅拌均匀。', emoji: '🥣', time: 5 },
      { title: '打发蛋白', description: '蛋清打至硬性发泡，分次轻柔翻拌入蛋黄芝士糊中。', emoji: '💨', time: 5 },
      { title: '泡手指饼干', description: '手指饼干快速浸入浓缩咖啡液中（约1-2秒），铺满容器底部一层。', emoji: '🍪', time: 3 },
      { title: '分层组装', description: '一层泡好的手指饼干，一层芝士糊，重复两次。最上层刮平芝士糊。', emoji: '📚', time: 5 },
      { title: '冷藏定型', description: '盖上保鲜膜，放入冰箱冷藏至少4小时（最好过夜）。', emoji: '❄️', time: 240 },
      { title: '装饰', description: '取出后在表面筛上一层可可粉，用糖粉装饰即可切块享用。', emoji: '🍫', time: 2 }
    ],
    tips: [
      '手指饼干浸咖啡液只需1-2秒，不然会太湿影响口感',
      '马斯卡彭芝士要提前回温至室温，更容易搅拌',
      '冷藏过夜后提拉米苏的风味更加融合',
      '可以用无咖啡因咖啡代替，也可以加少许朗姆酒增加风味'
    ],
    tags: ['甜品', '提拉米苏', '经典意式', '免烤'],
    description: '提拉米苏是意大利最具代表性的甜点，名字意为"带我走"。以浸满浓缩咖啡的手指饼干和丝滑的马斯卡彭芝士层叠而成，口感如云朵般轻盈绵密。可可粉的微苦和芝士的甜润在口中完美平衡，每一勺都是意式甜蜜的极致体验。'
  },
  {
    id: 'ita-011',
    name: '奶油培根意面',
    nameEn: 'Fettuccine Alfredo',
    emoji: '🍝',
    image: '/recipes/default/ita-011.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'easy',
    prepTime: 5,
    cookTime: 15,
    totalTime: 20,
    servings: 2,
    calories: 680,
    protein: 24,
    fat: 38,
    carbs: 52,
    requiredIngredients: ['意面', '黄油', '芝士', '牛奶', '大蒜'],
    requiredSeasonings: ['盐', '胡椒粉'],
    requiredTools: ['平底锅', '汤锅', '菜刀', '砧板'],
    steps: [
      { title: '煮意面', description: '汤锅烧水加盐，煮Fettuccine宽面至弹牙，留一杯煮面水。', emoji: '🍝', time: 10 },
      { title: '制作奶油酱', description: '平底锅小火融化黄油，加入蒜末炒香（不要炒焦），倒入淡奶油搅匀。', emoji: '🧈', time: 3 },
      { title: '加芝士融化', description: '分次加入帕玛森芝士碎，搅拌至完全融化，酱汁浓稠丝滑。', emoji: '🧀', time: 3 },
      { title: '混合', description: '将煮好的意面放入酱汁锅中，加少许煮面水，快速翻拌使每根面条裹满酱汁。', emoji: '🔄', time: 2 },
      { title: '装盘', description: '盛入盘中，撒上额外帕玛森芝士和黑胡椒碎，趁热享用。', emoji: '🍽️', time: 1 }
    ],
    tips: [
      '酱汁要用小火制作，避免奶油分离',
      '帕玛森芝士要用新鲜刨丝的，预磨的芝士融化效果不好',
      '煮面水含有淀粉，少量加入能帮助酱汁乳化',
      'Fettuccine是这款意面的标准搭配，宽面能挂住更多酱汁'
    ],
    tags: ['奶油意面', '芝士', '快手菜', '经典意式'],
    description: '奶油培根意面源自罗马，以浓郁的奶油芝士酱汁包裹着宽面，口感丝滑醇厚。虽然配方简单，但帕玛森芝士和奶油的完美融合创造出令人难忘的浓郁风味，搭配弹牙的宽面，每一口都是奶油和芝士的盛宴。'
  },
  {
    id: 'ita-012',
    name: '卡布里沙拉',
    nameEn: 'Caprese Salad',
    emoji: '🥗',
    image: '/recipes/default/ita-012.jpg',
    category: 'appetizer',
    cuisine: '意式',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    servings: 2,
    calories: 280,
    protein: 14,
    fat: 22,
    carbs: 6,
    requiredIngredients: ['番茄', '芝士'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油'],
    requiredTools: ['菜刀', '砧板'],
    steps: [
      { title: '切片', description: '成熟的大番茄和新鲜马苏里拉芝士切成约1厘米厚的均匀薄片。', emoji: '🔪', time: 3 },
      { title: '摆盘', description: '在平盘中交替摆放番茄片和芝士片，像多米诺骨牌一样层层叠叠。', emoji: '🔄', time: 2 },
      { title: '调味', description: '均匀撒上海盐碎和现磨黑胡椒，淋上特级初榨橄榄油。', emoji: '🧂', time: 1 },
      { title: '装饰', description: '摆上新鲜罗勒叶，可淋少许陈年香醋增加风味层次。', emoji: '🌿', time: 1 }
    ],
    tips: [
      '使用完全成熟的番茄，最好选用不同颜色的传家番茄增加视觉效果',
      '马苏里拉芝士要用新鲜水牛马苏里拉，口感更佳',
      '橄榄油的品质至关重要，一定要用特级初榨橄榄油',
      '提前30分钟从冰箱取出回温，风味更佳'
    ],
    tags: ['沙拉', '前菜', '番茄', '芝士', '素食'],
    description: '卡布里沙拉是意大利南部卡布里岛的经典前菜，以番茄、马苏里拉芝士和罗勒三种食材完美诠释了意大利国旗的颜色。新鲜的番茄酸甜多汁，马苏里拉芝士柔韧奶香，配上特级初榨橄榄油的果香和罗勒的清香，简单却极致美味。'
  },
  {
    id: 'ita-013',
    name: '芝士胡椒意面',
    nameEn: 'Cacio e Pepe',
    emoji: '🧀',
    image: '/recipes/default/ita-013.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 5,
    cookTime: 12,
    totalTime: 17,
    servings: 2,
    calories: 590,
    protein: 22,
    fat: 30,
    carbs: 50,
    requiredIngredients: ['意面', '芝士'],
    requiredSeasonings: ['盐', '胡椒粉'],
    requiredTools: ['汤锅', '平底锅', '菜刀', '砧板'],
    steps: [
      { title: '烤胡椒', description: '平底锅中小火烘烤整粒黑胡椒1-2分钟至出香，稍微压碎。', emoji: '🌶️', time: 2 },
      { title: '煮意面', description: '汤锅烧水加盐，煮spaghetti至弹牙，留一杯煮面水。', emoji: '🍝', time: 10 },
      { title: '制作芝士酱', description: '碗中将磨细的帕玛森芝士和佩科里诺芝士混合，加入少许冷煮面水搅拌成膏状。', emoji: '🧀', time: 3 },
      { title: '乳化', description: '将煮好的意面趁热放入芝士碗中，快速翻拌，分次加入热煮面水直到酱汁丝滑包裹面条。', emoji: '🔄', time: 2 },
      { title: '装盘', description: '盛盘后撒上大量现磨黑胡椒和额外的芝士碎。', emoji: '🍽️', time: 1 }
    ],
    tips: [
      '芝士要在意面还非常热的时候加入，利用余温融化',
      '煮面水一定要分次加，每次少量，才能达到完美乳化',
      '黑胡椒要用整粒现磨，风味远胜预磨胡椒粉',
      'Cacio e Pepe的精髓是乳化技术，需要多练习'
    ],
    tags: ['意面', '芝士', '经典意式', '快手菜'],
    description: '芝士胡椒意面是罗马最具代表性的传统意面之一，仅用三种食材就能创造出惊人的美味。意面的淀粉和煮面水与芝士完美乳化成丝滑的酱汁，黑胡椒的辛辣与芝士的咸香在口中碰撞，诠释了"少即是多"的意大利烹饪哲学。'
  },
  {
    id: 'ita-014',
    name: '帕玛森鸡排',
    nameEn: 'Chicken Parmigiana',
    emoji: '🍗',
    image: '/recipes/default/ita-014.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 2,
    calories: 580,
    protein: 42,
    fat: 28,
    carbs: 30,
    requiredIngredients: ['鸡胸肉', '鸡蛋', '芝士', '番茄', '面粉'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油'],
    requiredTools: ['平底锅', '烤箱', '烤盘', '菜刀', '砧板'],
    steps: [
      { title: '处理鸡胸肉', description: '鸡胸肉对半片开成薄片，用肉锤敲打至均匀厚度，撒盐和胡椒调味。', emoji: '🔪', time: 5 },
      { title: '裹面包糠', description: '鸡排依次裹上面粉、打散的蛋液和面包糠，压实。', emoji: '🥚', time: 4 },
      { title: '煎鸡排', description: '平底锅加橄榄油，中火将鸡排两面煎至金黄酥脆（每面约3-4分钟）。', emoji: '🍳', time: 8 },
      { title: '加料烘烤', description: '鸡排放入烤盘，铺上番茄酱和马苏里拉芝士，撒帕玛森芝士碎。烤箱预热200°C烤15分钟。', emoji: '🧀', time: 17 },
      { title: '装盘', description: '出炉后撒上新鲜罗勒叶，搭配意面或沙拉一起享用。', emoji: '🍽️', time: 2 }
    ],
    tips: [
      '鸡胸肉要敲打至厚薄均匀，才能保证烹饪时间一致',
      '面包糠用日式面包糠（Panko）更酥脆',
      '如果想让芝士有完美的拉丝效果，用马苏里拉芝士搭配Provolone芝士',
      '搭配番茄意面是经典的意式吃法'
    ],
    tags: ['鸡排', '芝士', '烤箱菜', '意式'],
    description: '帕玛森鸡排是意大利裔美国人的经典融合料理，金黄酥脆的鸡排上铺满番茄酱和融化的芝士，烤至芝士起泡冒泡。切开时芝士拉丝，鸡肉鲜嫩多汁，搭配酸甜的番茄酱，是大人小孩都爱的家庭料理。'
  },
  {
    id: 'ita-015',
    name: '海鲜扁意面',
    nameEn: 'Seafood Linguine',
    emoji: '🦐',
    image: '/recipes/default/ita-015.jpg',
    category: 'main',
    cuisine: '意式',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 18,
    totalTime: 33,
    servings: 2,
    calories: 520,
    protein: 32,
    fat: 14,
    carbs: 58,
    requiredIngredients: ['意面', '虾仁', '大蒜', '番茄'],
    requiredSeasonings: ['盐', '胡椒粉', '橄榄油', '料酒'],
    requiredTools: ['平底锅', '汤锅', '菜刀', '砧板'],
    steps: [
      { title: '煮意面', description: '大锅水烧开加盐，煮Linguine扁意面至弹牙（比包装时间少1分钟），留煮面水。', emoji: '🍝', time: 10 },
      { title: '处理海鲜', description: '虾仁开背去虾线，蛤蜊吐沙洗净，鱿鱼切圈。', emoji: '🦐', time: 5 },
      { title: '炒蒜和番茄', description: '平底锅加橄榄油，小火炒蒜末至金黄，加入切碎的樱桃番茄煮至出汁。', emoji: '🧄', time: 4 },
      { title: '烹海鲜', description: '先加入蛤蜊和料酒，盖盖焖至开口（约3分钟），再加入虾仁和鱿鱼圈煮2分钟。', emoji: '🦑', time: 5 },
      { title: '混合', description: '将煮好的意面夹入海鲜锅中，加少许煮面水，快速翻拌均匀。', emoji: '🔄', time: 2 },
      { title: '装盘', description: '盛入深盘中，淋上锅中的海鲜汁，撒上欧芹碎和少许辣椒片。', emoji: '🍽️', time: 1 }
    ],
    tips: [
      '海鲜不要过度烹饪，虾仁变色卷曲即可',
      '蛤蜊不开口的就不要吃，说明不新鲜',
      '煮面水能帮助乳化酱汁，让海鲜风味更好地附着在面上',
      '搭配白葡萄酒煮海鲜去腥增香效果极佳'
    ],
    tags: ['海鲜', '意面', '经典意式', '番茄'],
    description: '海鲜扁意面是意大利南部沿海地区的经典料理，汇集了大海的精华。鲜甜的虾仁、嫩滑的鱿鱼和鲜美的蛤蜊，在蒜香番茄酱汁中烹饪，搭配弹牙的扁意面，每一口都是海洋的馈赠。清爽的橄榄油和番茄的酸度完美平衡了海鲜的鲜甜，是夏日海边最应景的美食。'
  }
];
