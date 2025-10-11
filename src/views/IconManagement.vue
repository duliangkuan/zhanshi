<template>
  <div class="icon-management">
    <!-- 密码验证界面 -->
    <div v-if="!isAuthenticated" class="password-auth">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-icon">🔒</div>
            <h2 class="auth-title">图标管理密码验证</h2>
          </div>
          
          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="input-group">
              <input
                v-model="inputPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                class="password-input"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="password-toggle"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            
            <div v-if="loginError" class="error-message">
              {{ loginError }}
            </div>
            
            <div class="auth-actions">
              <button type="submit" class="login-btn" :disabled="!inputPassword">
                登录
              </button>
              <router-link to="/" class="back-home-btn">
                返回主页
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 管理界面 -->
    <div v-else>
      <!-- 顶部导航 -->
      <header class="header">
        <div class="container">
          <div class="logo">
            <h1>职业院校应用文写作教程（智慧学伴辅助版）</h1>
            <p>图标管理</p>
          </div>
          <nav class="nav">
            <div class="nav-group">
              <router-link to="/" class="nav-link">返回主页</router-link>
            </div>
            <div class="nav-group">
              <button @click="showChangePasswordModal = true" class="nav-link change-password-btn">
                修改密码
              </button>
              <button @click="logout" class="nav-link logout-btn">
                退出登录
              </button>
            </div>
            <div class="nav-group">
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      </header>

      <!-- 主要内容 -->
      <main class="main">
        <div class="container">
        <section class="management-section">
          <h2 class="section-title">智能体图标管理</h2>
          <p class="section-description">为每个智能体上传自定义图标，让您的智慧学伴更加个性化</p>
          
          
          <!-- 智慧学伴智能体 -->
          <div class="agents-section">
            <h3 class="subsection-title">智慧学伴智能体</h3>
            <div class="agents-grid">
            <div 
              v-for="agent in agents" 
              :key="agent.id"
              class="agent-management-card"
            >
              <div class="agent-info">
                <div class="current-icon">
                  <img 
                    v-if="getAgentIcon(agent.id)" 
                    :src="getAgentIcon(agent.id)" 
                    :alt="agent.name"
                    class="agent-icon-image"
                  />
                  <div v-else class="default-icon">
                    {{ agent.icon }}
                  </div>
                </div>
                <div class="agent-details">
                  <h3 class="agent-name">{{ agent.name }}</h3>
                  <p class="agent-description">{{ agent.description }}</p>
                </div>
              </div>
              
              <div class="upload-section">
                <h4 class="upload-title">上传新图标</h4>
                <IconUploader 
                  :agent-id="agent.id"
                  :current-icon="getAgentIcon(agent.id)"
                  @icon-uploaded="handleIconUploaded"
                />
              </div>
            </div>
          </div>
          </div>
          
          <!-- 写作辅助助手智能体 -->
          <div class="agents-section">
            <h3 class="subsection-title">写作辅助助手</h3>
            <div class="agents-grid">
            <div 
              v-for="agent in projectAgents" 
              :key="agent.id"
              class="agent-management-card"
            >
              <div class="agent-info">
                <div class="current-icon">
                  <img 
                    v-if="getProjectAgentIcon(agent.id)" 
                    :src="getProjectAgentIcon(agent.id)" 
                    :alt="agent.name"
                    class="agent-icon-image"
                  />
                  <div v-else class="default-icon">
                    {{ agent.icon }}
                  </div>
                </div>
                <div class="agent-details">
                  <h3 class="agent-name">{{ agent.name }}</h3>
                  <p class="agent-description">{{ agent.description }}</p>
                </div>
              </div>
              
              <div class="upload-section">
                <h4 class="upload-title">上传新图标</h4>
                <IconUploader 
                  :agent-id="agent.id"
                  :current-icon="getProjectAgentIcon(agent.id)"
                  @icon-uploaded="handleProjectIconUploaded"
                />
              </div>
            </div>
          </div>
          </div>
          
          <div class="management-actions">
            <button @click="resetAllIcons" class="reset-btn">重置所有图标</button>
            <button @click="exportIcons" class="export-btn">导出图标配置</button>
            <button @click="importIcons" class="import-btn">导入图标配置</button>
            <input 
              ref="importInput" 
              type="file" 
              accept=".json" 
              @change="handleImport" 
              style="display: none"
            />
          </div>
          </section>
        </div>
      </main>

      <!-- 页脚 -->
      <footer class="footer">
        <div class="container">
          <p>&copy; 2024 智慧学伴项目组. 智慧学伴项目展示.</p>
        </div>
      </footer>
    </div>

    <!-- 修改密码弹窗 -->
    <div v-if="showChangePasswordModal" class="modal-overlay" @click="closeChangePasswordModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">修改密码</h3>
          <button @click="closeChangePasswordModal" class="modal-close">×</button>
        </div>
        
        <form @submit.prevent="handleChangePassword" class="modal-form">
          <div class="form-group">
            <label class="form-label">原密码</label>
            <div class="input-group">
              <input
                v-model="changePasswordForm.oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                placeholder="请输入原密码"
                class="form-input"
                required
              />
              <button
                type="button"
                @click="showOldPassword = !showOldPassword"
                class="password-toggle"
              >
                {{ showOldPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">新密码</label>
            <div class="input-group">
              <input
                v-model="changePasswordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="请输入新密码"
                class="form-input"
                required
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="password-toggle"
              >
                {{ showNewPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">确认新密码</label>
            <div class="input-group">
              <input
                v-model="changePasswordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="请再次输入新密码"
                class="form-input"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="password-toggle"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          
          <div v-if="changePasswordError" class="error-message">
            {{ changePasswordError }}
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="closeChangePasswordModal" class="btn-cancel">
              取消
            </button>
            <button type="submit" class="btn-confirm" :disabled="!isChangePasswordFormValid">
              确认修改
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import IconUploader from '../components/IconUploader.vue'

export default {
  name: 'IconManagement',
  components: {
    ThemeSwitcher,
    IconUploader
  },
  data() {
    return {
      // 认证相关
      isAuthenticated: false,
      inputPassword: '',
      showPassword: false,
      loginError: '',
      
      // 修改密码相关
      showChangePasswordModal: false,
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      changePasswordError: '',
      
      // 智慧学伴智能体数据
      agents: [
        {
          id: 'wenqi',
          name: '文启',
          description: '聚焦入学适应，拆解校园通知、学习计划等文书框架，启蒙基础写作',
          icon: '🎒'
        },
        {
          id: 'yeyan',
          name: '业研',
          description: '深耕专业学习，匹配实训报告、技术说明等场景，规范专业写作表达',
          icon: '📊'
        },
        {
          id: 'bisheng',
          name: '毕胜',
          description: '直击毕业求职，指导毕业论文、简历等文书，赋能毕业写作攻坚',
          icon: '🚀'
        },
        {
          id: 'zhixing',
          name: '职行',
          description: '立足职场攀升，优化工作邮件、总结等文书，提升职场写作实践能力',
          icon: '💼'
        }
      ],
      // 写作辅助助手智能体数据
      projectAgents: [
        {
          id: 'project-agent-1',
          name: '智能体1',
          description: '专业的写作辅助工具，帮助您提升写作效率和质量',
          icon: '🎯'
        },
        {
          id: 'project-agent-2',
          name: '智能体2',
          description: '智能化的内容创作助手，为您提供创意和灵感',
          icon: '🚀'
        },
        {
          id: 'project-agent-3',
          name: '智能体3',
          description: '全方位的写作指导系统，从构思到成稿全程陪伴',
          icon: '💡'
        }
      ]
    }
  },
  computed: {
    isChangePasswordFormValid() {
      return this.changePasswordForm.oldPassword && 
             this.changePasswordForm.newPassword && 
             this.changePasswordForm.confirmPassword &&
             this.changePasswordForm.newPassword === this.changePasswordForm.confirmPassword
    }
  },
  mounted() {
    this.checkAuthStatus()
  },
  methods: {
    // 认证相关方法
    checkAuthStatus() {
      // 检查会话状态
      const authStatus = localStorage.getItem('iconManagementAuth')
      if (authStatus === 'true') {
        this.isAuthenticated = true
      }
    },
    
    getCurrentPassword() {
      // 获取当前有效密码：优先自定义密码，否则使用初始密码
      const customPassword = localStorage.getItem('iconManagementPassword')
      return customPassword || '123456'
    },
    
    handleLogin() {
      const currentPassword = this.getCurrentPassword()
      
      if (this.inputPassword === currentPassword) {
        this.isAuthenticated = true
        this.loginError = ''
        this.inputPassword = ''
        // 设置会话状态
        localStorage.setItem('iconManagementAuth', 'true')
        this.showNotification('登录成功', 'success')
      } else {
        this.loginError = '密码错误，请重新输入'
        this.inputPassword = ''
      }
    },
    
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    logout() {
      this.isAuthenticated = false
      this.inputPassword = ''
      this.loginError = ''
      // 清除会话状态
      localStorage.removeItem('iconManagementAuth')
      this.showNotification('已退出登录', 'info')
      // 跳转到主页
      this.$router.push('/')
    },
    
    // 修改密码相关方法
    closeChangePasswordModal() {
      this.showChangePasswordModal = false
      this.changePasswordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.changePasswordError = ''
      this.showOldPassword = false
      this.showNewPassword = false
      this.showConfirmPassword = false
    },
    
    handleChangePassword() {
      const currentPassword = this.getCurrentPassword()
      
      // 验证原密码
      if (this.changePasswordForm.oldPassword !== currentPassword) {
        this.changePasswordError = '原密码错误'
        return
      }
      
      // 验证新密码确认
      if (this.changePasswordForm.newPassword !== this.changePasswordForm.confirmPassword) {
        this.changePasswordError = '两次输入的新密码不一致'
        return
      }
      
      // 保存新密码
      localStorage.setItem('iconManagementPassword', this.changePasswordForm.newPassword)
      
      // 关闭弹窗并显示成功提示
      this.closeChangePasswordModal()
      this.showNotification('密码修改成功', 'success')
    },
    
    // 智慧学伴智能体图标管理
    getAgentIcon(agentId) {
      const savedIcons = JSON.parse(localStorage.getItem('agentIcons') || '{}')
      return savedIcons[agentId] || null
    },
    
    // 写作辅助助手智能体图标管理
    getProjectAgentIcon(agentId) {
      const savedIcons = JSON.parse(localStorage.getItem('agentIcons') || '{}')
      return savedIcons[agentId] || null
    },
    
    
    handleIconUploaded(data) {
      // 智慧学伴智能体图标上传成功，触发页面更新
      console.log('智慧学伴智能体图标上传成功:', data)
      this.$forceUpdate()
      
      // 显示成功提示
      this.showNotification('图标上传成功！', 'success')
    },
    
    handleProjectIconUploaded(data) {
      // 写作辅助助手智能体图标上传成功，触发页面更新
      console.log('写作辅助助手智能体图标上传成功:', data)
      this.$forceUpdate()
      
      // 显示成功提示
      this.showNotification('图标上传成功！', 'success')
    },
    
    
    showNotification(message, type = 'info') {
      const notification = document.createElement('div')
      notification.textContent = message
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        color: white;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      `
      
      document.body.appendChild(notification)
      
      // 3秒后自动移除
      setTimeout(() => {
        notification.remove()
      }, 3000)
    },
    
    resetAllIcons() {
      if (confirm('确定要重置所有图标吗？这将删除所有书籍封面、智慧学伴和写作辅助助手的自定义图标。')) {
        try {
          localStorage.removeItem('agentIcons')
          this.$forceUpdate()
          this.showNotification('所有图标和封面已重置', 'success')
        } catch (error) {
          this.showNotification('重置失败，请重试', 'error')
        }
      }
    },
    
    exportIcons() {
      try {
        const savedIcons = JSON.parse(localStorage.getItem('agentIcons') || '{}')
        
        // 检查是否有图标需要导出
        if (Object.keys(savedIcons).length === 0) {
          this.showNotification('没有图标需要导出', 'info')
          return
        }
        
        const dataStr = JSON.stringify(savedIcons, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        
        const link = document.createElement('a')
        link.href = URL.createObjectURL(dataBlob)
        link.download = `all-agents-icons-config-${new Date().toISOString().split('T')[0]}.json`
        link.click()
        
        this.showNotification('所有图标和封面配置导出成功', 'success')
      } catch (error) {
        this.showNotification('导出失败，请重试', 'error')
      }
    },
    
    importIcons() {
      this.$refs.importInput.click()
    },
    
    handleImport(event) {
      const file = event.target.files[0]
      if (!file) return
      
      // 检查文件类型
      if (!file.name.endsWith('.json')) {
        this.showNotification('请选择JSON格式的文件', 'error')
        return
      }
      
      // 检查文件大小
      if (file.size > 5 * 1024 * 1024) { // 5MB限制
        this.showNotification('文件过大，请选择小于5MB的文件', 'error')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedIcons = JSON.parse(e.target.result)
          
          // 验证导入的数据格式
          if (typeof importedIcons !== 'object' || importedIcons === null) {
            throw new Error('无效的配置文件格式')
          }
          
          localStorage.setItem('agentIcons', JSON.stringify(importedIcons))
          this.$forceUpdate()
          this.showNotification('所有图标和封面配置导入成功', 'success')
        } catch (error) {
          this.showNotification('导入失败：文件格式不正确或已损坏', 'error')
        }
      }
      
      reader.onerror = () => {
        this.showNotification('文件读取失败，请重试', 'error')
      }
      
      reader.readAsText(file)
      
      // 清空input，允许重复选择同一文件
      event.target.value = ''
    }
  }
}
</script>

<style scoped>
.icon-management {
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
  align-items: center;
  gap: 32px;
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 16px;
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

/* 主要内容 */
.main {
  padding: 60px 0;
}

.management-section {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  color: var(--theme-text);
  text-align: center;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-description {
  color: var(--theme-text-secondary);
  text-align: center;
  margin-bottom: 50px;
  font-size: 16px;
}

.agents-section {
  margin-bottom: 50px;
}

.subsection-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.agent-management-card {
  background: var(--theme-card-bg);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--theme-card-border);
  transition: all 0.3s ease;
}

.agent-management-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--theme-shadow-hover);
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.current-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-icon-bg);
  flex-shrink: 0;
}

.agent-icon-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
}

.default-icon {
  font-size: 40px;
}

.agent-details {
  flex: 1;
}

.agent-name {
  font-size: 24px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 8px;
}

.agent-description {
  color: var(--theme-text-secondary);
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.upload-section {
  border-top: 1px solid var(--theme-card-border);
  padding-top: 20px;
}

.upload-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 16px;
}

.management-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.reset-btn, .export-btn, .import-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn {
  background: #e74c3c;
  color: white;
}

.reset-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.export-btn {
  background: #27ae60;
  color: white;
}

.export-btn:hover {
  background: #229954;
  transform: translateY(-2px);
}

.import-btn {
  background: #3498db;
  color: white;
}

.import-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

/* 页脚 */
.footer {
  background: var(--theme-card-bg);
  padding: 30px 0;
  text-align: center;
  color: var(--theme-text-secondary);
  border-top: 1px solid var(--theme-card-border);
}

/* 动画样式 */
@keyframes slideIn {
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
}

/* 密码验证界面样式 */
.password-auth {
  min-height: 100vh;
  background: var(--theme-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: var(--theme-card-bg);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid var(--theme-card-border);
  box-shadow: var(--theme-shadow);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.auth-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--theme-text);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  width: 100%;
  padding: 16px 50px 16px 16px;
  border: 2px solid var(--theme-card-border);
  border-radius: 12px;
  background: var(--theme-bg);
  color: var(--theme-text);
  font-size: 16px;
  transition: all 0.3s ease;
}

.password-input:focus {
  outline: none;
  border-color: var(--theme-highlight);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.password-toggle:hover {
  background: var(--theme-card-border);
}

.login-btn {
  padding: 16px;
  background: linear-gradient(135deg, #4A90E2, #5BA0F2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-home-btn {
  padding: 16px;
  background: var(--theme-card-bg);
  color: var(--theme-text);
  border: 2px solid var(--theme-card-border);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-home-btn:hover {
  background: var(--theme-highlight);
  color: white;
  border-color: var(--theme-highlight);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  padding: 8px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(231, 76, 60, 0.2);
}

/* 导航按钮样式 */
.nav-link {
  color: var(--theme-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--theme-highlight);
  background: rgba(74, 144, 226, 0.1);
}

.change-password-btn, .logout-btn {
  background: none;
  border: none;
  color: var(--theme-text);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
}

.change-password-btn:hover {
  color: var(--theme-highlight);
  background: rgba(74, 144, 226, 0.1);
}

.logout-btn {
  color: #e74c3c;
}

.logout-btn:hover {
  color: #c0392b;
  background: rgba(231, 76, 60, 0.1);
}

/* 修改密码弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--theme-card-bg);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid var(--theme-card-border);
  box-shadow: var(--theme-shadow);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  border-bottom: 1px solid var(--theme-card-border);
  margin-bottom: 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--theme-text);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--theme-text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--theme-card-border);
  color: var(--theme-text);
}

.modal-form {
  padding: 0 24px 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 50px 12px 12px;
  border: 2px solid var(--theme-card-border);
  border-radius: 8px;
  background: var(--theme-bg);
  color: var(--theme-text);
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-highlight);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--theme-card-border);
}

.btn-cancel, .btn-confirm {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: var(--theme-card-border);
  color: var(--theme-text);
}

.btn-cancel:hover {
  background: var(--theme-text-secondary);
}

.btn-confirm {
  background: linear-gradient(135deg, #4A90E2, #5BA0F2);
  color: white;
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .auth-card {
    padding: 30px 20px;
  }
  
  .modal-content {
    margin: 10px;
    max-width: calc(100% - 20px);
  }
  
  .modal-header, .modal-form {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .btn-cancel, .btn-confirm {
    width: 100%;
  }
  
  
  .agents-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .agent-management-card {
    padding: 20px;
  }
  
  .agent-info {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .management-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .reset-btn, .export-btn, .import-btn {
    width: 200px;
  }
}
</style>
