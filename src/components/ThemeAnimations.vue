<template>
  <div class="theme-animations">
    <!-- 星辰大海 - 流星和星星效果 -->
    <div v-if="currentTheme === 'star-ocean'" class="star-ocean-container">
      <!-- 流星效果 -->
      <div class="meteor-container">
        <div 
          v-for="i in 5" 
          :key="`meteor-${i}`"
          class="meteor"
          :style="getMeteorStyle(i)"
        ></div>
      </div>
      
      <!-- 背景星星 -->
      <div class="background-stars">
        <div 
          v-for="i in 30" 
          :key="`bg-star-${i}`"
          class="bg-star"
          :style="getBackgroundStarStyle(i)"
        ></div>
      </div>
    </div>

    <!-- 诗与远方 - 璀璨星点和花瓣效果 -->
    <div v-if="currentTheme === 'poetry-distance'" class="poetry-container">
      <!-- 璀璨星点 -->
      <div class="stars-container">
        <div 
          v-for="i in 20" 
          :key="`star-${i}`"
          class="star"
          :style="getStarStyle(i)"
        ></div>
      </div>
      
      <!-- 飘落花瓣 -->
      <div class="petals-container">
        <div 
          v-for="i in 8" 
          :key="`petal-${i}`"
          class="petal"
          :style="getPetalStyle(i)"
        ></div>
      </div>
    </div>

    <!-- 扬帆起航 - 波浪和气泡效果 -->
    <div v-if="currentTheme === 'sail-away'" class="sail-container">
      <!-- 波浪效果 -->
      <div class="waves-container">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
      </div>
      
      <!-- 气泡效果 -->
      <div class="bubbles-container">
        <div 
          v-for="i in 12" 
          :key="`bubble-${i}`"
          class="bubble"
          :style="getBubbleStyle(i)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

export default {
  name: 'ThemeAnimations',
  setup() {
    const { currentTheme } = useTheme()

    // 生成流星样式
    const getMeteorStyle = (index) => {
      const delay = Math.random() * 10
      const duration = 3 + Math.random() * 2
      const startX = Math.random() * 100
      const startY = Math.random() * 50
      
      return {
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--start-x': `${startX}%`,
        '--start-y': `${startY}%`,
        '--index': index
      }
    }

    // 生成星点样式
    const getStarStyle = (index) => {
      const size = 2 + Math.random() * 4
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 5
      const duration = 2 + Math.random() * 3
      
      return {
        '--size': `${size}px`,
        '--x': `${x}%`,
        '--y': `${y}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--index': index
      }
    }

    // 生成背景星星样式
    const getBackgroundStarStyle = (index) => {
      const size = 1 + Math.random() * 2
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 8
      const duration = 3 + Math.random() * 4
      const opacity = 0.3 + Math.random() * 0.7
      
      return {
        '--size': `${size}px`,
        '--x': `${x}%`,
        '--y': `${y}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--opacity': opacity,
        '--index': index
      }
    }

    // 生成花瓣样式
    const getPetalStyle = (index) => {
      const size = 8 + Math.random() * 12
      const startX = Math.random() * 100
      const delay = Math.random() * 8
      const duration = 6 + Math.random() * 4
      const rotation = Math.random() * 360
      
      return {
        '--size': `${size}px`,
        '--start-x': `${startX}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--rotation': `${rotation}deg`,
        '--index': index
      }
    }

    // 生成气泡样式
    const getBubbleStyle = (index) => {
      const size = 4 + Math.random() * 8
      const startX = Math.random() * 100
      const delay = Math.random() * 6
      const duration = 4 + Math.random() * 3
      const opacity = 0.3 + Math.random() * 0.4
      
      return {
        '--size': `${size}px`,
        '--start-x': `${startX}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--opacity': opacity,
        '--index': index
      }
    }

    return {
      currentTheme,
      getMeteorStyle,
      getStarStyle,
      getBackgroundStarStyle,
      getPetalStyle,
      getBubbleStyle
    }
  }
}
</script>

<style scoped>
.theme-animations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

/* 星辰大海容器 */
.star-ocean-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 流星效果 */
.meteor-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 背景星星 */
.background-stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bg-star {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 4px #ffffff, 0 0 8px #4facfe;
  animation: bg-star-twinkle var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  top: var(--y);
  left: var(--x);
  opacity: var(--opacity);
}

@keyframes bg-star-twinkle {
  0%, 100% {
    opacity: var(--opacity);
    transform: scale(1);
  }
  50% {
    opacity: calc(var(--opacity) * 1.5);
    transform: scale(1.1);
  }
}

.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, #ffffff, #4facfe);
  border-radius: 50%;
  box-shadow: 0 0 6px #ffffff, 0 0 12px #4facfe;
  animation: meteor-fall var(--duration) linear infinite;
  animation-delay: var(--delay);
  top: var(--start-y);
  left: var(--start-x);
}

.meteor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  transform: translateX(-100px);
  animation: meteor-tail var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes meteor-fall {
  0% {
    transform: translate(0, 0) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translate(300px, 300px) rotate(45deg);
    opacity: 0;
  }
}

@keyframes meteor-tail {
  0% {
    transform: translateX(-100px);
    opacity: 1;
  }
  100% {
    transform: translateX(200px);
    opacity: 0;
  }
}

/* 诗与远方容器 */
.poetry-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 璀璨星点效果 */
.stars-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 花瓣效果 */
.petals-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.petal {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(45deg, #ff9a9e, #fecfef, #fecfef);
  border-radius: 50% 0 50% 0;
  transform: rotate(var(--rotation));
  animation: petal-fall var(--duration) linear infinite;
  animation-delay: var(--delay);
  top: -20px;
  left: var(--start-x);
  opacity: 0.7;
}

.petal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border-radius: 50% 0 50% 0;
  opacity: 0.5;
}

@keyframes petal-fall {
  0% {
    transform: translateY(0) rotate(var(--rotation));
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) rotate(calc(var(--rotation) + 360deg));
    opacity: 0;
  }
}

.star {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffffff, 0 0 12px #f39c12, 0 0 18px #e74c3c;
  animation: star-twinkle var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  top: var(--y);
  left: var(--x);
}

.star::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    -20px 0 0 #ffffff,
    20px 0 0 #ffffff,
    0 -20px 0 #ffffff,
    0 20px 0 #ffffff,
    -14px -14px 0 #ffffff,
    14px -14px 0 #ffffff,
    -14px 14px 0 #ffffff,
    14px 14px 0 #ffffff;
  animation: star-burst var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes star-burst {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 扬帆起航容器 */
.sail-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 波浪效果 */
.waves-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

/* 气泡效果 */
.bubbles-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bubble {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 70%, transparent 100%);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: bubble-rise var(--duration) linear infinite;
  animation-delay: var(--delay);
  bottom: -20px;
  left: var(--start-x);
  opacity: var(--opacity);
}

.bubble::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 20%;
  width: 30%;
  height: 30%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

@keyframes bubble-rise {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: var(--opacity);
  }
  50% {
    transform: translateY(-50vh) scale(1);
    opacity: calc(var(--opacity) * 1.5);
  }
  100% {
    transform: translateY(-100vh) scale(0.3);
    opacity: 0;
  }
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.2) 25%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0.2) 75%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 50% 50% 0 0;
  animation: wave-motion 8s ease-in-out infinite;
}

.wave-1 {
  animation-delay: 0s;
  opacity: 0.7;
}

.wave-2 {
  animation-delay: 2s;
  opacity: 0.5;
  height: 80px;
}

.wave-3 {
  animation-delay: 4s;
  opacity: 0.3;
  height: 60px;
}

@keyframes wave-motion {
  0%, 100% {
    transform: translateX(-50%) translateY(0) rotate(0deg);
  }
  25% {
    transform: translateX(-50%) translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateX(-50%) translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateX(-50%) translateY(-15px) rotate(-1deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .meteor {
    width: 1px;
    height: 1px;
  }
  
  .meteor::before {
    width: 50px;
  }
  
  .star {
    box-shadow: 0 0 4px #ffffff, 0 0 8px #f39c12;
  }
  
  .waves-container {
    height: 150px;
  }
  
  .wave {
    height: 80px;
  }
  
  .wave-2 {
    height: 60px;
  }
  
  .wave-3 {
    height: 40px;
  }
}
</style>
