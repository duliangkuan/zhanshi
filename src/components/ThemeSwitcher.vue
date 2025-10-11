<template>
  <div class="theme-switcher">
    <div class="theme-toggle" @click="toggleDropdown">
      <div class="current-theme">
        <div class="theme-preview" :style="{ background: currentThemeConfig.colors.gradient }"></div>
        <span class="theme-name">{{ currentThemeConfig.name }}</span>
        <svg class="dropdown-icon" :class="{ 'rotated': showDropdown }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
    
    <div class="theme-dropdown" :class="{ 'show': showDropdown }">
      <div class="theme-options">
        <div 
          v-for="theme in availableThemes" 
          :key="theme.key"
          class="theme-option"
          :class="{ 'active': theme.key === currentTheme }"
          @click="selectTheme(theme.key)"
        >
          <div class="theme-preview" :style="{ background: theme.colors.gradient }"></div>
          <div class="theme-info">
            <div class="theme-name">{{ theme.name }}</div>
            <div class="theme-description">{{ theme.description }}</div>
          </div>
          <div v-if="theme.key === currentTheme" class="check-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

export default {
  name: 'ThemeSwitcher',
  setup() {
    const { currentTheme, currentThemeConfig, availableThemes, setTheme } = useTheme()
    const showDropdown = ref(false)
    
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }
    
    const selectTheme = (themeKey) => {
      setTheme(themeKey)
      showDropdown.value = false
    }
    
    const closeDropdown = (event) => {
      if (!event.target.closest('.theme-switcher')) {
        showDropdown.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', closeDropdown)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', closeDropdown)
    })
    
    return {
      currentTheme,
      currentThemeConfig,
      availableThemes,
      showDropdown,
      toggleDropdown,
      selectTheme
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  position: relative;
  z-index: 1000;
}

.theme-toggle {
  cursor: pointer;
  transition: all 0.3s ease;
}

.current-theme {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.current-theme:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.theme-preview {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.theme-name {
  color: white;
  font-weight: 500;
  font-size: 14px;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  color: white;
  transition: transform 0.3s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.theme-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.theme-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.theme-options {
  padding: 8px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-option:hover {
  background: rgba(0, 0, 0, 0.05);
}

.theme-option.active {
  background: rgba(0, 0, 0, 0.1);
}

.theme-option .theme-preview {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.theme-info {
  flex: 1;
}

.theme-option .theme-name {
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.theme-description {
  color: #7f8c8d;
  font-size: 12px;
  line-height: 1.4;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #27ae60;
}

.check-icon svg {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-dropdown {
    right: -20px;
    min-width: 260px;
  }
  
  .current-theme {
    padding: 10px 12px;
  }
  
  .theme-name {
    font-size: 13px;
  }
}
</style>
