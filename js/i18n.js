/* ==========================================================
   中 / 英 双语切换：字典 + 应用逻辑
   无依赖，选择存入 localStorage（键：site-lang）
   ========================================================== */
(function () {
  "use strict";

  var DICT = {
    zh: {
      "meta.title": "邵奇 AICFO 智能体矩阵 | ima Agents",
      "meta.desc": "邵奇 AICFO 及其行业衍生智能体矩阵 —— 基于 ima 平台的财税合规 AI Agent 展示",
      "nav.overview": "概览",
      "nav.agents": "智能体",
      "nav.guide": "使用指南",
      "nav.knowledge": "知识库",
      "nav.demo": "演示",
      "nav.contact": "联系",
      "nav.cta": "立即体验",
      "nav.menuOpen": "打开菜单",
      "nav.menuClose": "关闭菜单",

      "hero.eyebrow": "基于腾讯 ima 平台 · 财税合规 AI Agent 矩阵",
      "hero.title": "10 年 CFO 实战经验，<br />沉淀为<span class=\"accent\">可对话的智能体</span>",
      "hero.lead": "以「邵奇｜财务模型矩阵｜AI CFO」为统一能力底座，衍生出电商、餐饮、民办学校、银行内控、内控诊断等行业智能体，并推出法语版 Matrice Modèles Fin. AICFO——让专业财税判断随问随得。",
      "hero.btn1": "浏览全部智能体",
      "hero.btn2": "查看演示",
      "hero.s1n": "10 年",
      "hero.s1t": "财务管理与 CFO 决策经验",
      "hero.s2n": "7 个",
      "hero.s2t": "行业 / 场景智能体（含法语版）",
      "hero.s3n": "120 题",
      "hero.s3t": "多模型对比验证题库",
      "hero.s4n": "5500+",
      "hero.s4t": "已发布知识库条目沉淀",

      "hl.title": "为什么是这套 Agent 矩阵",
      "hl.sub": "一页一个结论：专业底座 + 行业衍生 + 持续验证。",
      "hl1.t": "统一专业底座",
      "hl1.p": "所有智能体共享「邵奇 AICFO」财税知识底座，保证专业口径一致，避免通用大模型的漂移与幻觉。",
      "hl2.t": "行业纵深衍生",
      "hl2.p": "针对电商、餐饮、民办学校、银行等行业的特有科目、报表与合规要求做定制，而非泛泛的通用问答。",
      "hl3.t": "多模型交叉验证",
      "hl3.p": "以 120 道验证题（含挖坑题）与 GLM、DeepSeek、豆包、ChatGPT、Grok、Gemini 等 8 个模型横向对比，持续校准。",

      "agents.title": "智能体一览",
      "agents.sub": "点击各卡片中的入口链接，即可跳转至 ima 平台直接使用。",
      "agents.badge": "行业智能体",
      "col.features": "功能与核心能力",
      "col.scene": "适用场景",
      "col.use": "使用方式",

      "a1.badge": "能力底座",
      "a1.tag": "把 10 年 CFO 判断经验变成可调用的 AI 思维 · 低幻觉 · 可提问或上传报表 · DCF / ROIC / WACC / NPV / 敏感分析 / 估值 / 风险监控 / 盈亏平衡",
      "a1.meta": "397 条知识沉淀",
      "a1.can": "✔ 能做",
      "a1.can1": "<strong>算钱</strong>：现金流、投资回报、估值、预算偏差",
      "a1.can2": "<strong>判风险</strong>：盈利质量、偿债能力、断流预警",
      "a1.can3": "<strong>给建议</strong>：投不投、怎么融资、下一步怎么办",
      "a1.cant": "✘ 不做",
      "a1.cant1": "不预测股价、不荐股",
      "a1.cant2": "不替你签字、不替代专业意见",
      "a1.cant3": "不编数据——缺数据它会向你要",
      "a1.scenep": "企业主 / 财务负责人日常财税咨询、重大决策前的合规校验、财务团队能力补充。",
      "a1.usep": "打开 ima.copilot → 选择知识库「AI CFO」→ 直接输入问题，或上传报表（Excel / PDF 均可）。",
      "a1.link": "在 ima 中打开「邵奇｜财务模型矩阵｜AI CFO」→",

      "a2.tag": "算清账 · 穿透业务 · 追溯运营 · 财法合判——放大你的判断力",
      "a2.meta": "191 条知识沉淀",
      "a2.li1": "平台结算单与账务核对逻辑",
      "a2.li2": "刷单、退款、佣金的财税处理",
      "a2.li3": "电商行业涉税风险点识别",
      "a2.scenep": "电商企业财务、多平台店铺经营者、代账机构。",
      "a2.link": "在 ima 中打开：电商 AI 智能体（财、税、法务）→",

      "a3.tag": "财务、税务、法务三位一体，餐饮老板的 AI 军师",
      "a3.meta": "362 条知识沉淀",
      "a3.li1": "单店 / 连锁门店损益分析",
      "a3.li2": "食材成本率、人效等关键指标解读",
      "a3.li3": "餐饮行业常见税务问题处理",
      "a3.scenep": "餐饮连锁企业、单店经营者、餐饮财务主管。",
      "a3.link": "在 ima 中打开：餐饮老板 AI 智能体（财+税+法）→",

      "a4.tag": "懂政策、会算账、能分析——民办学校自己的智慧大脑",
      "a4.meta": "408 条知识沉淀",
      "a4.li1": "民办学校会计制度与科目适配",
      "a4.li2": "学费收入、生均成本等特有分析报表",
      "a4.li3": "民办教育合规要点提示",
      "a4.scenep": "K12 民办学校、教育集团财务负责人、举办者。",
      "a4.link": "在 ima 中打开：民办学校 AI 智能体 →",

      "a5.tag": "银行业内控体系诊断 · 风险点排查",
      "a5.meta": "68 条知识沉淀",
      "a5.li1": "银行内控框架梳理与差距分析",
      "a5.li2": "关键业务条线风险点识别",
      "a5.li3": "整改建议与制度完善方向",
      "a5.scenep": "银行内控 / 合规部门、审计机构、咨询顾问。",
      "a5.link": "在 ima 中打开：银行体系内控诊断智能体 →",

      "a6.tag": "证据分级 · 风险溯源 · 双重核验——把十年财务判断力，变成 AI 说话前必须先自证的规矩",
      "a6.meta": "212 条知识沉淀",
      "a6.li1": "按业务循环扫描内控薄弱环节",
      "a6.li2": "风险分级与整改优先级建议",
      "a6.li3": "输出结构化诊断结论",
      "a6.scenep": "拟上市 / 拟融资企业、集团内审部门、外部咨询机构。",
      "a6.linkp": "分享链接即将上线，可先通过底部联系方式获取。",

      "a7.meta": "405 条知识沉淀",
      "a7.li1": "AICFO 能力底座的法语版本，面向法语区企业与投资者",
      "a7.li2": "同一套财务判断框架：估值、现金流、风险识别、决策建议",
      "a7.li3": "跨语言一致的低幻觉问答体验",
      "a7.scenep": "法语区（欧洲 / 非洲）企业主与财务负责人、跨境投资沟通、中法双语财务团队。",
      "a7.link": "在 ima 中打开：Matrice Modèles Fin. AICFO →",

      "g.title": "使用指南",
      "g.sub": "摘自《AICFO 使用说明书》——一页上手，四步会问，三段式看答案。",
      "g.s1": "提问四要素",
      "g.q1t": "① 场景",
      "g.q1p": "你是谁、要办什么事",
      "g.q2t": "② 数据",
      "g.q2p": "给几个关键数字，或上传财报",
      "g.q3t": "③ 目标",
      "g.q3p": "想要什么结论：能不能 / 值不值 / 有什么风险",
      "g.q4t": "④ 风格",
      "g.q4p": "要它怎么讲：简单说 / 深度分析 / 上会版",
      "g.s2": "好问题 vs 坏问题",
      "g.badt": "✘ 坏问题（它只能泛泛）",
      "g.badp": "\"帮我看看公司怎么样\"",
      "g.goodt": "✔ 好问题（它给得出答案）",
      "g.goodp": "\"我们是连锁餐饮，年营收 1.2 亿、净利率 4%，想判断要不要开第 5 家店；请从回报和现金两个角度给结论。\"",
      "g.s3": "看懂答案：三段式 + 三标签",
      "g.partt": "三段式结构",
      "g.part1": "<strong>结论</strong> —— 先看这一句（一句话答案）",
      "g.part2": "<strong>解释</strong> —— 为什么这么判",
      "g.part3": "<strong>依据</strong> —— 数字 / 公式从哪来（可核对）",
      "g.tagt": "三级可信度标签",
      "g.tag1": "<span class=\"tag tag--high\">高确定</span> 可直接用",
      "g.tag2": "<span class=\"tag tag--mid\">需复核</span> 建议核对再定",
      "g.tag3": "<span class=\"tag tag--low\">数据不足</span> 需补数据",
      "g.s4": "六个高频场景",
      "g.sc1t": "现金流还能撑多久",
      "g.sc1p": "\"账上现金 ___，月固定支出 ___，告诉我还能撑几个月、哪个月最紧。\"",
      "g.sc2t": "这个项目投不投",
      "g.sc2p": "\"新项目需投 ___ 万，预计回收 ___ 年，判断值不值，给结论。\"",
      "g.sc3t": "公司值多少钱",
      "g.sc3p": "\"上传近 3 年财报，判断合理估值区间。\"",
      "g.sc4t": "赚的钱是真的吗",
      "g.sc4p": "\"营收涨了但现金没涨，帮我看问题出在哪。\"",
      "g.sc5t": "该股权还是债权融资",
      "g.sc5p": "\"需融资 ___ 万，帮我比较两种方式，给建议。\"",
      "g.sc6t": "预算差在哪",
      "g.sc6p": "\"上传预算与实际，指出偏差根因。\"",
      "g.s5": "四个技巧",
      "g.tip1t": "要人话",
      "g.tip1p": "开头加「简单说」",
      "g.tip2t": "要深挖",
      "g.tip2p": "开头加「深度分析」",
      "g.tip3t": "要开会用",
      "g.tip3p": "说「给我上会版」",
      "g.tip4t": "不满意",
      "g.tip4p": "追问三连：① 你为什么这么判？② 如果反过来会怎样？③ 还有什么没考虑到？",
      "g.boundt": "使用边界（重要）",
      "g.bound1": "它不是算命——它是决策辅助，不构成投资建议。",
      "g.bound2": "所有计算的口径以你提供的数据为准；数据不准，结论就不准。",
      "g.bound3": "它可以给判断，但最终拍板的永远是你（人）。",
      "g.checklist": "上手清单：① 选中知识库 → ② 说清四要素 → ③ 先看「结论」那一句 → ④ 不懂就「追问三连」",

      "kb.title": "持续更新的知识库",
      "kb.sub": "Agent 背后的知识底座——定期采集、持续归档，在 ima 上开放订阅。",
      "kb.ga": "专业内容库",
      "kb.gb": "思维模型库",
      "kb.a1p": "CFO 视角拆解财务、税务与经营管理问题。",
      "kb.a1m": "916 条内容",
      "kb.a2p": "站在 CFO 视角，看懂医药行业的商业逻辑。",
      "kb.a2m": "479 条内容",
      "kb.a3p": "善用 AI，让专业能力获得 10 倍增长。",
      "kb.a3m": "2620 条内容",
      "kb.b1p": "攻克复杂业务逻辑的思维模型。",
      "kb.b1m": "33 条内容",
      "kb.b2p": "在不确定时代，建立企业和个人的抗风险能力。",
      "kb.b2m": "111 条内容",
      "kb.b3p": "借鉴芒格智慧，训练 CFO 式商业判断。",
      "kb.b3m": "76 条内容",

      "demo.title": "演示与截图",
      "demo.sub": "先看一段模拟对话，直观感受 Agent 的输出形态；点击下方主题示意图可直达对应智能体。",
      "demo.badge": "模拟演示",
      "demo.play": "▶ 播放演示",
      "demo.replay": "↻ 重新播放",
      "demo.note": "示例来自《AICFO 使用说明书》，回答为演示模拟，非真实对话记录",
      "demo.fig1": "电商 AI 智能体 · 示意图",
      "demo.fig2": "餐饮老板 AI 智能体 · 示意图",
      "demo.fig3": "民办学校 AI 智能体 · 示意图",
      "demo.img1alt": "电商 AI 智能体主题示意图：包裹、购物车与资金流",
      "demo.img2alt": "餐饮老板 AI 智能体主题示意图：门店经营与账本",
      "demo.img3alt": "民办学校 AI 智能体主题示意图：校园与数据看板",

      "faq.title": "常见问题",
      "faq.q1": "这些 Agent 是免费的吗？",
      "faq.a1": "目前通过 ima 平台免费开放使用，点击各 Agent 卡片中的入口链接即可开始对话。",
      "faq.q2": "和直接问通用大模型有什么区别？",
      "faq.a2": "通用模型缺少行业纵深且容易漂移。本矩阵以 10 年 CFO 实战经验为知识底座，并经过 120 题验证题库与 8 个主流模型的横向对比校准，专业口径更稳定。",
      "faq.q3": "A 方式和 B 方式有什么区别？",
      "faq.a3": "A 方式（基于知识库的问答互动）幻觉率低、仅针对知识库内容回复，可联网查询、速度快，可选择模型深度思考，灵活度较好；B 方式（Copilot + 知识库）适合长时间调教，可配置 MCP、Skill，可生成 PDF、Word 等格式，报告完整度高，可存储记忆。",
      "faq.q4": "我的财务数据会被泄露吗？",
      "faq.a4": "建议对话中隐去企业真实名称、金额等敏感信息，使用脱敏后的案例进行提问。平台侧的数据策略以 ima 官方说明为准。",
      "faq.q5": "可以定制我自己行业的智能体吗？",
      "faq.a5": "可以。底座支持按行业衍生，欢迎通过下方联系方式沟通你的行业与场景需求。",

      "ct.title": "联系与合作",
      "ct.sub": "行业智能体定制、企业内控诊断合作、讲座邀约，欢迎联系。",
      "ct.wx": "微信",
      "ct.wxp": "微信号：67757008",
      "ct.mail": "邮箱",

      "ft.copy": "© <span id=\"year\">2026</span> 邵奇 AICFO · 基于 ima 平台构建",
      "ft.top": "回到顶部 ↑",

      demo: {
        user: "我们是连锁餐饮，年营收 1.2 亿、净利率 4%，想判断要不要开第 5 家店；请从回报和现金两个角度给结论。",
        rows: [
          { label: "结论", tag: ["mid", "需复核"], conclusion: true,
            text: "建议暂缓开第 5 家店——先修复现有门店的盈利模型，再谈扩张。" },
          { label: "解释",
            text: "净利率 4% 低于连锁餐饮 8%–12% 的健康区间，说明单店模型尚未跑通；新店通常有 6–12 个月爬坡期，此时扩张会把利润和现金同时摊薄。" },
          { label: "依据",
            text: "年净利润约 480 万（1.2 亿 × 4%）；若新店投入约 200 万、爬坡期月均亏 8 万，首年现金占用约 300 万，相当于全年净利润的 62%——留给安全边际的空间不足。" },
          { label: "可信度", tag: ["mid", "需复核"],
            text: "以上基于你提供的两个数字推算；补充单店投资额、月均固定支出后，结论可升级为「高确定」。" }
        ]
      }
    },

    en: {
      "meta.title": "Shaoqi AICFO Agent Matrix | ima Agents",
      "meta.desc": "Shaoqi AICFO and its industry-specific AI agents — a finance, tax and compliance agent showcase built on the ima platform",
      "nav.overview": "Overview",
      "nav.agents": "Agents",
      "nav.guide": "User Guide",
      "nav.knowledge": "Knowledge",
      "nav.demo": "Demo",
      "nav.contact": "Contact",
      "nav.cta": "Try Now",
      "nav.menuOpen": "Open menu",
      "nav.menuClose": "Close menu",

      "hero.eyebrow": "Built on Tencent ima · AI Agent Matrix for Finance, Tax & Compliance",
      "hero.title": "A decade of CFO experience,<br />distilled into <span class=\"accent\">conversational agents</span>",
      "hero.lead": "Built on the flagship \"Shaoqi | Financial Model Matrix | AI CFO\", the matrix spans e-commerce, restaurants, private schools, banking internal control and risk diagnostics — plus a French edition, Matrice Modèles Fin. AICFO. Professional financial judgment, available on demand.",
      "hero.btn1": "Explore the Agents",
      "hero.btn2": "Watch the Demo",
      "hero.s1n": "10 yrs",
      "hero.s1t": "Financial management & CFO decision-making",
      "hero.s2n": "7",
      "hero.s2t": "Industry & scenario agents (incl. French)",
      "hero.s3n": "120",
      "hero.s3t": "Cross-model validation questions",
      "hero.s4n": "5500+",
      "hero.s4t": "Published knowledge-base entries",

      "hl.title": "Why This Agent Matrix",
      "hl.sub": "One takeaway: a professional core, industry depth, continuous validation.",
      "hl1.t": "A Unified Professional Core",
      "hl1.p": "Every agent shares the Shaoqi AICFO finance & tax knowledge base, keeping professional judgment consistent and avoiding the drift and hallucination of general-purpose LLMs.",
      "hl2.t": "Deep Industry Specialization",
      "hl2.p": "Tailored to the specific accounts, reports and compliance requirements of e-commerce, restaurants, private schools and banking — not generic Q&A.",
      "hl3.t": "Cross-Model Validation",
      "hl3.p": "Benchmarked with 120 validation questions (including trap questions) against 8 models — GLM, DeepSeek, Doubao, ChatGPT, Grok, Gemini and more — with continuous calibration.",

      "agents.title": "The Agents",
      "agents.sub": "Click the entry link inside each card to use the agent directly on the ima platform.",
      "agents.badge": "Industry Agent",
      "col.features": "Key Capabilities",
      "col.scene": "Who It's For",
      "col.use": "How to Use",

      "a1.badge": "Core Engine",
      "a1.tag": "Ten years of CFO judgment turned into callable AI reasoning · Low hallucination · Ask questions or upload reports · DCF / ROIC / WACC / NPV / Sensitivity analysis / Valuation / Risk monitoring / Break-even",
      "a1.meta": "397 curated entries",
      "a1.can": "✔ What it does",
      "a1.can1": "<strong>Run the numbers</strong>: cash flow, ROI, valuation, budget variance",
      "a1.can2": "<strong>Judge the risks</strong>: earnings quality, solvency, cash-crunch warnings",
      "a1.can3": "<strong>Give advice</strong>: invest or not, how to finance, what to do next",
      "a1.cant": "✘ What it won't do",
      "a1.cant1": "No stock-price predictions, no stock tips",
      "a1.cant2": "No signing on your behalf, no substitute for professional opinion",
      "a1.cant3": "No made-up data — it asks you when data is missing",
      "a1.scenep": "Day-to-day finance & tax questions for owners and CFOs, compliance checks before major decisions, and a capability boost for finance teams.",
      "a1.usep": "Open ima.copilot → choose the \"AI CFO\" knowledge base → type your question, or upload statements (Excel / PDF).",
      "a1.link": "Open on ima: Shaoqi | Financial Model Matrix | AI CFO →",

      "a2.tag": "Clear books · See through the business · Trace operations · Finance meets legal — amplifying your judgment",
      "a2.meta": "191 curated entries",
      "a2.li1": "Reconciliation logic for platform settlement statements",
      "a2.li2": "Tax treatment of order inflation, refunds and commissions",
      "a2.li3": "Identifying tax-risk points specific to e-commerce",
      "a2.scenep": "E-commerce finance staff, multi-platform store owners, bookkeeping agencies.",
      "a2.link": "Open on ima: E-commerce AI Agent (Finance, Tax, Legal) →",

      "a3.tag": "Finance, tax and legal in one — the AI strategist for restaurant owners",
      "a3.meta": "362 curated entries",
      "a3.li1": "P&L analysis for single stores and chains",
      "a3.li2": "Reading key metrics: food-cost ratio, labor efficiency",
      "a3.li3": "Handling common tax issues in the restaurant industry",
      "a3.scenep": "Restaurant chains, single-store owners, restaurant finance managers.",
      "a3.link": "Open on ima: Restaurant Owner AI Agent (Finance+Tax+Legal) →",

      "a4.tag": "Knows policy, does the math, runs the analysis — the smart brain for private schools",
      "a4.meta": "408 curated entries",
      "a4.li1": "Chart of accounts adapted to private-school accounting rules",
      "a4.li2": "School-specific reports: tuition revenue, cost per student",
      "a4.li3": "Compliance highlights for private education",
      "a4.scenep": "K12 private schools, education-group finance leads, school sponsors.",
      "a4.link": "Open on ima: Private School AI Agent →",

      "a5.tag": "Internal-control diagnostics for banking · Risk-point screening",
      "a5.meta": "68 curated entries",
      "a5.li1": "Mapping internal-control frameworks and gap analysis",
      "a5.li2": "Identifying risk points across key business lines",
      "a5.li3": "Remediation advice and directions for policy improvement",
      "a5.scenep": "Bank internal-control & compliance teams, audit firms, consultants.",
      "a5.link": "Open on ima: Banking Internal-Control Diagnostic Agent →",

      "a6.tag": "Evidence grading · Risk tracing · Dual verification — turning a decade of financial judgment into rules the AI must prove before it speaks",
      "a6.meta": "212 curated entries",
      "a6.li1": "Scanning weak points in internal controls by business cycle",
      "a6.li2": "Risk grading and remediation priorities",
      "a6.li3": "Structured diagnostic conclusions",
      "a6.scenep": "Pre-IPO / pre-financing companies, group internal audit, external advisors.",
      "a6.linkp": "Share link coming soon — reach us via the contact section below.",

      "a7.meta": "405 curated entries",
      "a7.li1": "The French edition of the AICFO core, for Francophone businesses and investors",
      "a7.li2": "The same judgment framework: valuation, cash flow, risk detection, decision advice",
      "a7.li3": "A consistent low-hallucination Q&A experience across languages",
      "a7.scenep": "Business owners and finance leads in Francophone regions (Europe / Africa), cross-border investment communication, bilingual finance teams.",
      "a7.link": "Open on ima: Matrice Modèles Fin. AICFO →",

      "g.title": "User Guide",
      "g.sub": "From the AICFO User Manual — get started in one page: four elements to ask well, a three-part answer to read fast.",
      "g.s1": "Four Elements of a Good Question",
      "g.q1t": "1. Context",
      "g.q1p": "Who you are and what you need to do",
      "g.q2t": "2. Data",
      "g.q2p": "A few key figures, or upload your statements",
      "g.q3t": "3. Goal",
      "g.q3p": "What conclusion you want: feasible? worth it? what risks?",
      "g.q4t": "4. Style",
      "g.q4p": "How it should answer: plain language / deep dive / board-ready",
      "g.s2": "Good Question vs Bad Question",
      "g.badt": "✘ Bad question (only generic answers)",
      "g.badp": "\"How is my company doing?\"",
      "g.goodt": "✔ Good question (it can actually answer)",
      "g.goodp": "\"We run a restaurant chain: RMB 120M revenue, 4% net margin. Should we open a 5th location? Conclude from payback and cash-flow angles.\"",
      "g.s3": "Reading the Answer: Three Parts + Three Tags",
      "g.partt": "Three-part structure",
      "g.part1": "<strong>Conclusion</strong> — read this line first (the one-sentence answer)",
      "g.part2": "<strong>Reasoning</strong> — why it judges this way",
      "g.part3": "<strong>Basis</strong> — where the numbers / formulas come from (verifiable)",
      "g.tagt": "Three confidence tags",
      "g.tag1": "<span class=\"tag tag--high\">High</span> Ready to use",
      "g.tag2": "<span class=\"tag tag--mid\">Review</span> Verify before deciding",
      "g.tag3": "<span class=\"tag tag--low\">Low data</span> More data needed",
      "g.s4": "Six Frequent Scenarios",
      "g.sc1t": "How long will our cash last",
      "g.sc1p": "\"Cash on hand ___, monthly fixed costs ___ — how many months left, and which month is tightest?\"",
      "g.sc2t": "Should we fund this project",
      "g.sc2p": "\"New project needs ___ M investment, payback in ___ years — is it worth it? Give a conclusion.\"",
      "g.sc3t": "What is the company worth",
      "g.sc3p": "\"Uploading 3 years of statements — estimate a reasonable valuation range.\"",
      "g.sc4t": "Are the profits real",
      "g.sc4p": "\"Revenue is up but cash isn't — find out where the problem is.\"",
      "g.sc5t": "Equity or debt financing",
      "g.sc5p": "\"We need ___ M — compare the two routes and advise.\"",
      "g.sc6t": "Where did the budget slip",
      "g.sc6p": "\"Uploading budget vs actuals — identify the root causes of variance.\"",
      "g.s5": "Four Tips",
      "g.tip1t": "Plain language",
      "g.tip1p": "Start with \"keep it simple\"",
      "g.tip2t": "Go deeper",
      "g.tip2p": "Start with \"deep analysis\"",
      "g.tip3t": "For meetings",
      "g.tip3p": "Say \"give me the board-ready version\"",
      "g.tip4t": "Not satisfied",
      "g.tip4p": "Follow-up triple: 1) Why do you judge so? 2) What if the opposite? 3) What else hasn't been considered?",
      "g.boundt": "Boundaries (Important)",
      "g.bound1": "It is not fortune-telling — it is decision support, not investment advice.",
      "g.bound2": "All calculations follow the data you provide; bad data in, bad conclusions out.",
      "g.bound3": "It can judge, but the final call is always yours (the human's).",
      "g.checklist": "Getting started: 1) Pick the knowledge base → 2) State the four elements → 3) Read the \"Conclusion\" line first → 4) When in doubt, use the follow-up triple",

      "kb.title": "Continuously Updated Knowledge Bases",
      "kb.sub": "The knowledge foundation behind the agents — regularly collected and archived, open for subscription on ima.",
      "kb.ga": "Professional Content",
      "kb.gb": "Mental Models",
      "kb.a1p": "Finance, tax and business management, dismantled from a CFO's perspective.",
      "kb.a1m": "916 entries",
      "kb.a2p": "The business logic of the pharma industry, from a CFO's perspective.",
      "kb.a2m": "479 entries",
      "kb.a3p": "Use AI well — multiply your professional capability tenfold.",
      "kb.a3m": "2620 entries",
      "kb.b1p": "Mental models for cracking complex business logic.",
      "kb.b1m": "33 entries",
      "kb.b2p": "Building antifragility for companies and individuals in uncertain times.",
      "kb.b2m": "111 entries",
      "kb.b3p": "Borrowing Munger's wisdom to train CFO-style business judgment.",
      "kb.b3m": "76 entries",

      "demo.title": "Demo & Screenshots",
      "demo.sub": "Watch a simulated conversation to feel the agent's output style; click an illustration below to open the corresponding agent directly.",
      "demo.badge": "Simulated demo",
      "demo.play": "▶ Play demo",
      "demo.replay": "↻ Replay",
      "demo.note": "Example from the AICFO User Manual; the answer is a simulation, not a real conversation record",
      "demo.fig1": "E-commerce AI Agent · Illustration",
      "demo.fig2": "Restaurant Owner AI Agent · Illustration",
      "demo.fig3": "Private School AI Agent · Illustration",
      "demo.img1alt": "E-commerce agent illustration: parcels, carts and capital flow",
      "demo.img2alt": "Restaurant agent illustration: store operations and ledger",
      "demo.img3alt": "Private school agent illustration: campus and data dashboard",

      "faq.title": "FAQ",
      "faq.q1": "Are these agents free?",
      "faq.a1": "Yes — they are currently free on the ima platform. Click the entry link in any agent card to start a conversation.",
      "faq.q2": "How is this different from asking a general-purpose LLM?",
      "faq.a2": "General models lack industry depth and tend to drift. This matrix is grounded in a decade of CFO practice, calibrated with 120 validation questions across 8 mainstream models — far more consistent professional judgment.",
      "faq.q3": "What's the difference between Mode A and Mode B?",
      "faq.a3": "Mode A (knowledge-base Q&A) has a low hallucination rate, answers strictly from the knowledge base, supports web search, is fast, and allows deep-thinking model selection. Mode B (Copilot + knowledge base) suits long-term tuning — it supports MCP and Skills, generates PDF/Word reports with higher completeness, and can store memory.",
      "faq.q4": "Will my financial data leak?",
      "faq.a4": "Mask sensitive details (company names, exact amounts) and ask with anonymized cases. For platform-side data policy, refer to ima's official documentation.",
      "faq.q5": "Can you customize an agent for my industry?",
      "faq.a5": "Yes. The core engine supports industry-specific spin-offs — reach us via the contact section below to discuss your industry and scenarios.",

      "ct.title": "Contact & Collaboration",
      "ct.sub": "Custom industry agents, internal-control diagnostics, speaking engagements — get in touch.",
      "ct.wx": "WeChat",
      "ct.wxp": "WeChat ID: 67757008",
      "ct.mail": "Email",

      "ft.copy": "© <span id=\"year\">2026</span> Shaoqi AICFO · Built on the ima platform",
      "ft.top": "Back to top ↑",

      demo: {
        user: "We run a restaurant chain: RMB 120M annual revenue, 4% net margin. Should we open a 5th location? Conclude from payback and cash-flow angles.",
        rows: [
          { label: "Conclusion", tag: ["mid", "Review"], conclusion: true,
            text: "Hold off on the 5th store — fix the unit economics of your existing stores before expanding." },
          { label: "Reasoning",
            text: "A 4% net margin sits below the healthy 8%–12% range for restaurant chains, so the single-store model isn't proven yet. New stores typically take 6–12 months to ramp up; expanding now dilutes both profit and cash." },
          { label: "Basis",
            text: "Annual net profit ≈ RMB 4.8M (120M × 4%). If a new store needs ~2M investment and loses ~80K/month during ramp-up, first-year cash tied up is ~3M — about 62% of yearly profit. Too little safety margin." },
          { label: "Confidence", tag: ["mid", "Review"],
            text: "Estimated from the two figures you provided. With per-store investment and monthly fixed costs, this conclusion can be upgraded to \"High\"." }
        ]
      }
    }
  };

  var current = "zh";
  try {
    var saved = localStorage.getItem("site-lang");
    if (saved === "en" || saved === "zh") current = saved;
  } catch (e) {}

  function t(key) {
    var v = DICT[current][key];
    return v === undefined ? key : v;
  }

  function applyLang() {
    var dict = DICT[current];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt");
      if (dict[k] !== undefined) el.setAttribute("alt", dict[k]);
    });

    document.documentElement.lang = current === "zh" ? "zh-CN" : "en";
    document.title = dict["meta.title"];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict["meta.desc"]);

    /* 页脚年份在 innerHTML 重写后需要重新填入 */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* 切换按钮状态 */
    document.querySelectorAll("#langSwitch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === current);
    });

    document.dispatchEvent(new CustomEvent("site:langchange", { detail: { lang: current } }));
  }

  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") return;
    current = lang;
    try { localStorage.setItem("site-lang", lang); } catch (e) {}
    applyLang();
  }

  var switchEl = document.getElementById("langSwitch");
  if (switchEl) {
    switchEl.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (btn) setLang(btn.getAttribute("data-lang"));
    });
  }

  window.SiteI18n = {
    t: t,
    getLang: function () { return current; },
    setLang: setLang,
    demo: function () { return DICT[current].demo; }
  };

  applyLang();
})();
