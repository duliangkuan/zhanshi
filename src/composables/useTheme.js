import { ref, computed } from 'vue'

// 主题配置
const themes = {
  'star-ocean': {
    name: '星辰大海',
    description: '探索无限可能，追逐梦想的旅程',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#0f3460',
      highlight: '#533483',
      text: '#ffffff',
      textSecondary: '#b8c5d6',
      gradient: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      cardBorder: 'rgba(83, 52, 131, 0.3)',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 20px 40px rgba(83, 52, 131, 0.2)',
      // 卡片专用变量
      cardBackground: 'rgba(26, 26, 46, 0.9)',
      cardText: '#ffffff',
      cardTextSecondary: '#b8c5d6',
      cardIconBg: 'linear-gradient(135deg, #533483, #0f3460)',
      cardButtonBg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      cardButtonText: '#ffffff'
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      animation: 'star-twinkle'
    }
  },
  'poetry-distance': {
    name: '诗与远方',
    description: '诗意的生活，远方的梦想',
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
      highlight: '#e74c3c',
      text: '#ffffff',
      textSecondary: '#bdc3c7',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #3498db 50%, #e74c3c 75%, #f39c12 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      cardBorder: 'rgba(231, 76, 60, 0.3)',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      shadowHover: '0 20px 40px rgba(231, 76, 60, 0.2)',
      // 卡片专用变量
      cardBackground: 'rgba(44, 62, 80, 0.9)',
      cardText: '#ffffff',
      cardTextSecondary: '#bdc3c7',
      cardIconBg: 'linear-gradient(135deg, #e74c3c, #f39c12)',
      cardButtonBg: 'linear-gradient(135deg, #3498db, #e74c3c)',
      cardButtonText: '#ffffff'
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #3498db 50%, #e74c3c 75%, #f39c12 100%)',
      animation: 'poetry-flow'
    }
  },
  'sail-away': {
    name: '扬帆起航',
    description: '乘风破浪，勇敢前行',
    colors: {
      primary: '#1e3c72',
      secondary: '#2a5298',
      accent: '#4facfe',
      highlight: '#00f2fe',
      text: '#ffffff',
      textSecondary: '#a8d8ea',
      gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #4facfe 50%, #00f2fe 75%, #ffffff 100%)',
      cardBg: 'rgba(255, 255, 255, 0.15)',
      cardBorder: 'rgba(0, 242, 254, 0.3)',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      shadowHover: '0 20px 40px rgba(0, 242, 254, 0.3)',
      // 卡片专用变量
      cardBackground: 'rgba(30, 60, 114, 0.9)',
      cardText: '#ffffff',
      cardTextSecondary: '#a8d8ea',
      cardIconBg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      cardButtonBg: 'linear-gradient(135deg, #1e3c72, #4facfe)',
      cardButtonText: '#ffffff'
    },
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #4facfe 50%, #00f2fe 75%, #ffffff 100%)',
      animation: 'wave-motion'
    }
  }
}

// 当前主题
const currentTheme = ref('star-ocean')

// 主题切换函数
const setTheme = (themeKey) => {
  if (themes[themeKey]) {
    currentTheme.value = themeKey
    localStorage.setItem('selected-theme', themeKey)
    applyTheme(themes[themeKey])
  }
}

// 应用主题
const applyTheme = (theme) => {
  const root = document.documentElement
  const colors = theme.colors
  
  // 设置CSS变量
  root.style.setProperty('--theme-primary', colors.primary)
  root.style.setProperty('--theme-secondary', colors.secondary)
  root.style.setProperty('--theme-accent', colors.accent)
  root.style.setProperty('--theme-highlight', colors.highlight)
  root.style.setProperty('--theme-text', colors.text)
  root.style.setProperty('--theme-text-secondary', colors.textSecondary)
  root.style.setProperty('--theme-gradient', colors.gradient)
  root.style.setProperty('--theme-card-bg', colors.cardBg)
  root.style.setProperty('--theme-card-border', colors.cardBorder)
  root.style.setProperty('--theme-shadow', colors.shadow)
  root.style.setProperty('--theme-shadow-hover', colors.shadowHover)
  
  // 设置卡片专用变量
  root.style.setProperty('--card-background', colors.cardBackground)
  root.style.setProperty('--card-text', colors.cardText)
  root.style.setProperty('--card-text-secondary', colors.cardTextSecondary)
  root.style.setProperty('--card-icon-bg', colors.cardIconBg)
  root.style.setProperty('--card-button-bg', colors.cardButtonBg)
  root.style.setProperty('--card-button-text', colors.cardButtonText)
  
  // 设置背景和body类名
  document.body.style.background = colors.gradient
  
  // 移除所有主题类名
  document.body.classList.remove('star-ocean', 'poetry-distance', 'sail-away')
  
  // 添加当前主题类名
  const themeClassMap = {
    'star-ocean': 'star-ocean',
    'poetry-distance': 'poetry-distance',
    'sail-away': 'sail-away'
  }
  
  if (themeClassMap[currentTheme.value]) {
    document.body.classList.add(themeClassMap[currentTheme.value])
  }
}

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme')
  if (savedTheme && themes[savedTheme]) {
    setTheme(savedTheme)
  } else {
    setTheme('star-ocean')
  }
}

// 计算属性
const currentThemeConfig = computed(() => themes[currentTheme.value])
const availableThemes = computed(() => Object.keys(themes).map(key => ({
  key,
  ...themes[key]
})))

export function useTheme() {
  return {
    currentTheme,
    currentThemeConfig,
    availableThemes,
    setTheme,
    initTheme
  }
}
