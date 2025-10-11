// 图标管理工具类
export class IconManager {
  static STORAGE_KEY = 'agentIcons'
  
  // 获取所有保存的图标
  static getAllIcons() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}')
    } catch (error) {
      console.error('获取图标失败:', error)
      return {}
    }
  }
  
  // 获取指定智能体的图标
  static getAgentIcon(agentId) {
    const icons = this.getAllIcons()
    return icons[agentId] || null
  }
  
  // 保存智能体图标
  static saveAgentIcon(agentId, iconUrl) {
    try {
      const icons = this.getAllIcons()
      icons[agentId] = iconUrl
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(icons))
      return true
    } catch (error) {
      console.error('保存图标失败:', error)
      return false
    }
  }
  
  // 删除智能体图标
  static removeAgentIcon(agentId) {
    try {
      const icons = this.getAllIcons()
      delete icons[agentId]
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(icons))
      return true
    } catch (error) {
      console.error('删除图标失败:', error)
      return false
    }
  }
  
  // 清空所有图标
  static clearAllIcons() {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      return true
    } catch (error) {
      console.error('清空图标失败:', error)
      return false
    }
  }
  
  // 导出图标配置
  static exportIcons() {
    const icons = this.getAllIcons()
    const dataStr = JSON.stringify(icons, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `agent-icons-config-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    return Object.keys(icons).length
  }
  
  // 导入图标配置
  static importIcons(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const importedIcons = JSON.parse(e.target.result)
          
          // 验证数据格式
          if (typeof importedIcons !== 'object' || importedIcons === null) {
            throw new Error('无效的配置文件格式')
          }
          
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(importedIcons))
          resolve(Object.keys(importedIcons).length)
        } catch (error) {
          reject(error)
        }
      }
      
      reader.onerror = () => {
        reject(new Error('文件读取失败'))
      }
      
      reader.readAsText(file)
    })
  }
  
  // 验证图标URL
  static validateIconUrl(iconUrl) {
    if (!iconUrl || typeof iconUrl !== 'string') {
      return false
    }
    
    // 检查是否为base64格式
    if (iconUrl.startsWith('data:image/')) {
      return true
    }
    
    // 检查是否为有效的URL
    try {
      new URL(iconUrl)
      return true
    } catch {
      return false
    }
  }
  
  // 获取图标统计信息
  static getIconStats() {
    const icons = this.getAllIcons()
    const totalAgents = 4 // 文启、业研、毕胜、职行
    const customIcons = Object.keys(icons).length
    
    return {
      total: totalAgents,
      custom: customIcons,
      default: totalAgents - customIcons,
      percentage: Math.round((customIcons / totalAgents) * 100)
    }
  }
}
