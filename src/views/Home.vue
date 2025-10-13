<template>
  <div class="home">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <h1>职业院校应用文写作教程（智慧学伴辅助版）</h1>
          <p>核心知识 + AI辅助</p>
        </div>
        <nav class="nav">
          <router-link to="/icons" class="nav-link">图标管理</router-link>
          <a href="#hero" class="nav-link">主页</a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <!-- 项目介绍 -->
        <section id="hero" class="hero">
          <div class="hero-content">
            <h2 class="hero-title animate__animated animate__fadeInUp">
              智慧学伴
            </h2>
            <p class="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
              职业院校学生应用文写作的 AI 助手 - 集成七个AI智能体，助力学生应用文写作能力全面提升
            </p>
          </div>
        </section>


        <!-- 智能体展示区域 -->
        <section class="agents-section">
          <h3 class="section-title animate__animated animate__fadeInUp">
            小匠成长之路
          </h3>
          <div class="agents-grid">
            <AgentCard
              v-for="agent in agents"
              :key="agent.id"
              :agent="agent"
              @click="openAgent"
            />
          </div>
        </section>

        <!-- 写作辅助助手 -->
        <section class="project-agents-section">
          <h3 class="section-title">应用写作之辅</h3>
          <div class="project-agents-grid">
            <AgentCard
              v-for="agent in projectAgents"
              :key="agent.id"
              :agent="agent"
              @click="openProjectAgent"
            />
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 智慧学伴项目组. 智慧学伴项目展示.</p>
      </div>
    </footer>

  </div>
</template>

<script>
import AgentCard from '../components/AgentCard.vue'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'

export default {
  name: 'Home',
  components: {
    AgentCard,
    ThemeSwitcher
  },
  data() {
    return {
      agents: [
        {
          id: 'wenqi',
          name: '文启',
          description: '聚焦入学适应，拆解校园通知、学习计划等文书框架，启蒙基础写作',
          icon: '/images/agents/wenqi.png',
          color: '#4A90E2',
          couziUrl: 'https://www.coze.cn/store/agent/7557378578971689001?bot_id=true',
        },
        {
          id: 'yeyan',
          name: '业研',
          description: '深耕专业学习，匹配实训报告、技术说明等场景，规范专业写作',
          icon: '/images/agents/yeyan.png',
          color: '#7ED321',
          couziUrl: 'https://www.coze.cn/store/agent/7557379358193926194?bot_id=true',
        },
        {
          id: 'bisheng',
          name: '毕胜',
          description: '直击毕业求职，指导毕业论文、简历等文书，赋能毕业写作',
          icon: '/images/agents/bisheng.png',
          color: '#F5A623',
          couziUrl: 'https://www.coze.cn/store/agent/7557380401640751167?bot_id=true',
        },
        {
          id: 'zhixing',
          name: '职行',
          description: '立足职场攀升，优化工作邮件、总结等文书，提升职场写作',
          icon: '/images/agents/zhixing.png',
          color: '#D0021B',
          couziUrl: 'https://www.coze.cn/store/agent/7557382020679794728?bot_id=true',
        }
      ],
      projectAgents: [
        {
          id: 'project-agent-1',
          name: ' 匠导文筹<br>写作启动助手',
          description: '适配学校职场写作全场景，经学情诊断明确短板，推送资源，帮助学生筹备素材',
          icon: '/images/agents/jiangdao.png',
          color: '#4A90E2',
          couziUrl: 'https://www.coze.cn/store/agent/7558760650122887168?bot_id=true',
        },
        {
          id: 'project-agent-2',
          name: ' 匠伴文修<br>写作实时助手',
          description: '提供定制模板，规范语言术语，梳理写作逻辑，保障内容贴合应用文写作规范',
          icon: '/images/agents/jiangban.png',
          color: '#7ED321',
          couziUrl: 'https://www.coze.cn/store/agent/7558765790455988274?bot_id=true',
        },
        {
          id: 'project-agent-3',
          name: '匠进文评<br>写作优化助手',
          description: '构建"检测 - 反馈 - 提升"闭环，生成批改报告，提供训练建议，助力写作能力进阶',
          icon: '/images/agents/jiangjin.png',
          color: '#F5A623',
          couziUrl: 'https://www.coze.cn/store/agent/7558869464281251894?bot_id=true',
        }
      ]
    }
  },
  methods: {
    
    openAgent(agent) {
      // 检查链接是否有效
      if (!agent.couziUrl || !agent.couziUrl.includes('coze.cn')) {
        alert('智能体链接无效，请联系管理员')
        return
      }
      
      // 直接打开新窗口跳转到扣子智能体
      const newWindow = window.open(
        agent.couziUrl, 
        '_blank', 
        'width=1200,height=800,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
      )
      
      // 检查窗口是否成功打开
      if (!newWindow) {
        alert('无法打开智能体，请检查浏览器弹窗设置')
      }
    },
    
    openProjectAgent(agent) {
      // 检查链接是否有效
      if (!agent.couziUrl || agent.couziUrl === '#') {
        alert('智能体链接暂未配置，请联系管理员')
        return
      }
      
      // 直接打开新窗口跳转到扣子智能体
      const newWindow = window.open(
        agent.couziUrl, 
        '_blank', 
        'width=1200,height=800,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no'
      )
      
      // 检查窗口是否成功打开
      if (!newWindow) {
        alert('无法打开智能体，请检查浏览器弹窗设置')
      }
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--theme-gradient);
  transition: all 0.5s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
.header {
  background: var(--theme-card-bg);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--theme-card-border);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: var(--theme-text);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.logo p {
  color: var(--theme-text-secondary);
  font-size: 14px;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--theme-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--theme-highlight);
}

/* 主要内容区域 */
.main {
  padding: 40px 0;
}


/* 英雄区域 */
.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--theme-text);
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 20px;
  color: var(--theme-text-secondary);
  margin-bottom: 40px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* 智能体展示区域 */
.agents-section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  color: var(--theme-text);
  text-align: center;
  margin-bottom: 50px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.agents-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2列布局 */
  grid-template-rows: 1fr 1fr; /* 2行布局 */
  gap: 30px;
  margin-bottom: 40px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

/* 四宫格布局：每个智能体占据一个格子 */
.agents-grid .agent-card:first-child {
  grid-row: 1;
  grid-column: 1;
}

.agents-grid .agent-card:nth-child(2) {
  grid-row: 1;
  grid-column: 2;
}

.agents-grid .agent-card:nth-child(3) {
  grid-row: 2;
  grid-column: 1;
}

.agents-grid .agent-card:nth-child(4) {
  grid-row: 2;
  grid-column: 2;
}

/* 写作辅助助手 */
.project-agents-section {
  margin-bottom: 60px;
}

.project-agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

/* 页脚 */
.footer {
  background: var(--theme-card-bg);
  padding: 30px 0;
  text-align: center;
  color: var(--theme-text-secondary);
  border-top: 1px solid var(--theme-card-border);
}


/* 响应式设计 */
@media (max-width: 1024px) {
  .book-cover {
    width: 240px;
    height: 320px;
  }
  
  .cover-title {
    font-size: 24px;
  }
  
  .cover-subtitle {
    font-size: 14px;
  }
  
  .agents-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }

  .agents-grid .agent-card:first-child {
    grid-row: 1;
    grid-column: 1;
  }

  .agents-grid .agent-card:nth-child(2) {
    grid-row: 1;
    grid-column: 2;
  }

  .agents-grid .agent-card:nth-child(3) {
    grid-row: 2;
    grid-column: 1;
  }

  .agents-grid .agent-card:nth-child(4) {
    grid-row: 2;
    grid-column: 2;
  }
}

@media (max-width: 768px) {
  .hero-subtitle {
    white-space: normal;
    font-size: 18px;
    line-height: 1.4;
  }
  
  .book-cover {
    width: 200px;
    height: 267px;
  }
  
  .cover-title {
    font-size: 20px;
  }
  
  .cover-subtitle {
    font-size: 12px;
  }
  
  .cover-decoration {
    width: 40px;
    height: 40px;
  }
  
  .decoration-circle {
    width: 30px;
    height: 30px;
    top: 5px;
    left: 5px;
  }
  
  .decoration-line {
    height: 15px;
    top: 12px;
    left: 19px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  
  .agents-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 20px;
  }
  
  .agents-grid .agent-card:first-child {
    grid-row: 1;
    grid-column: 1;
  }

  .agents-grid .agent-card:nth-child(2) {
    grid-row: 2;
    grid-column: 1;
  }

  .agents-grid .agent-card:nth-child(3) {
    grid-row: 3;
    grid-column: 1;
  }

  .agents-grid .agent-card:nth-child(4) {
    grid-row: 4;
    grid-column: 1;
  }
  
  .project-agents-grid {
    grid-template-columns: 1fr;
  }
  
  .nav {
    gap: 16px;
  }
}
</style>
