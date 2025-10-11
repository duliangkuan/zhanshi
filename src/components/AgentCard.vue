<template>
  <div
    class="agent-card"
    :style="{ '--agent-color': agent.color }"
    @click="$emit('click', agent)"
  >
    <div class="card-header">
      <div class="agent-icon breathing">
        <img 
          v-if="getCustomIcon(agent.id)" 
          :src="getCustomIcon(agent.id)" 
          :alt="agent.name"
          class="custom-icon-image"
        />
        <span v-else>{{ agent.icon }}</span>
      </div>
      <div class="agent-info">
        <h4 class="agent-name" v-html="agent.name"></h4>
      </div>
    </div>
    
    <div class="card-body">
      <p class="agent-description">{{ agent.description }}</p>
    </div>
    
    <div class="card-footer">
      <button class="action-btn">
        <span>立即体验</span>
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
    
    <!-- 悬停效果 -->
    <div class="card-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'AgentCard',
  props: {
    agent: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    getCustomIcon(agentId) {
      const savedIcons = JSON.parse(localStorage.getItem('agentIcons') || '{}')
      return savedIcons[agentId] || null
    }
  }
}
</script>

<style scoped>
.agent-card {
  background: var(--card-background);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--theme-shadow);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--theme-card-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}

.agent-card.hero-card {
  min-height: 400px;
  padding: 40px;
}

.agent-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--theme-shadow-hover);
  border-color: var(--theme-highlight);
}

.agent-card:hover .card-overlay {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.agent-icon {
  font-size: 80px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-icon-bg);
  border-radius: 24px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.custom-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
}


.agent-info {
  flex: 1;
}

.agent-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--card-text);
  margin-bottom: 8px;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-card .agent-name {
  font-size: 32px;
  margin-bottom: 16px;
}


.card-body {
  margin-bottom: 24px;
}

.agent-description {
  color: var(--card-text-secondary);
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.target-audience {
  background: #F8F9FA;
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 4px solid var(--agent-color);
}

.target-label {
  font-weight: 600;
  color: #2C3E50;
  font-size: 14px;
}

.target-text {
  color: #5A6C7D;
  font-size: 14px;
  margin-left: 8px;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: linear-gradient(135deg, var(--agent-color), rgba(74, 144, 226, 0.1));
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.action-btn {
  background: var(--card-button-bg);
  color: var(--card-button-text);
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.hero-card .action-btn {
  padding: 18px 32px;
  font-size: 18px;
  border-radius: 16px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  filter: brightness(1.1);
}

.action-btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.agent-card:hover .btn-icon {
  transform: translateX(4px);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-card {
    min-height: 300px;
    padding: 30px;
  }
  
  .hero-card .agent-icon {
    font-size: 60px;
    width: 80px;
    height: 80px;
  }
  
  .hero-card .agent-name {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .agent-card {
    padding: 20px;
    min-height: 180px;
  }
  
  .hero-card {
    min-height: 250px;
    padding: 24px;
  }
  
  .card-header {
    gap: 12px;
  }
  
  .agent-icon {
    font-size: 40px;
    width: 56px;
    height: 56px;
  }
  
  .hero-card .agent-icon {
    font-size: 50px;
    width: 70px;
    height: 70px;
  }
  
  .agent-name {
    font-size: 18px;
  }
  
  .hero-card .agent-name {
    font-size: 20px;
  }
  
  .action-btn {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  .hero-card .action-btn {
    padding: 14px 20px;
    font-size: 16px;
  }
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.agent-card:active {
  animation: pulse 0.2s ease-in-out;
}
</style>
