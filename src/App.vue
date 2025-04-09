<template>
  <div class="container">
    <div class="theme-toggle">
      <input type="checkbox" id="theme-switch" v-model="isDarkTheme" @change="toggleTheme" />
      <label for="theme-switch">
        <span class="toggle">
          <span class="icon liu-kang"></span>
          <span class="icon havik"></span>
        </span>
      </label>
    </div>
    <router-view />
    <footer class="footer">
      <div class="navigation" :class="{ 'fixed': shouldShowNavigation }">
        <router-link v-if="shouldShowBackLink" to="/" class="back-link">Back to Choose Your Destiny</router-link>
        <button v-if="isScrolled" @click="scrollToTop" class="scroll-top">To Top</button>
      </div>
      <div class="developers">
        Developed by: <a href="https://github.com/peterlavrov">Peter Lavrov</a> & Team xAI
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isScrolled: false,
      isNavigationFixed: false,
      isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    };
  },
  computed: {
    isFighterPage() {
      return this.$route.name === 'fighter' || this.$route.name === 'kameo';
    },
    isHomePage() {
      return this.$route.path === '/';
    },
    shouldShowNavigation() {
      return this.isScrolled || (this.isFighterPage && this.isNavigationFixed);
    },
    shouldShowBackLink() {
      return !this.isHomePage && (this.isFighterPage ? this.isNavigationFixed : true);
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.applyTheme();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const backLink = document.querySelector('.tab-header .back-link');
      this.isScrolled = window.scrollY > 0;
      if (this.isFighterPage && backLink) {
        const rect = backLink.getBoundingClientRect();
        this.isNavigationFixed = rect.top < 0;
      } else {
        this.isNavigationFixed = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleTheme() {
      this.applyTheme();
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 100vh;
}

.footer {
  position: relative;
  padding: 20px 0;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;

  &.fixed {
    position: fixed;
    bottom: 53px;
    right: 20px;
    opacity: 1;
    visibility: visible;
    z-index: 1000;
  }

  .back-link,
  .scroll-top {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 6px 10px;
    border-radius: 5px 0 5px 0;
    font-size: 0.7rem;
    text-decoration: none;
    color: var(--link-color);
    font-family: 'Cinzel', serif;
    transition: color 0.3s ease;
  }

  .back-link {
    margin-right: 5px;
  }

  .back-link:hover,
  .scroll-top:hover {
    color: var(--link-hover);
  }

  .scroll-top {
    border: none;
    cursor: pointer;
  }
}

.developers {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  font-size: 0.7rem;
  line-height: 1.5;
  border-radius: 5px 0 5px 0;
  color: var(--text-color);
  display: inline-block;
  white-space: nowrap;
  z-index: 999;

  a {
    padding: 2px 5px;
    background-color: #223e6b;
    color: #b2c1d8;
    text-decoration: none;
    border-radius: 3px;
    transition: color 0.3s ease;

    &:hover {
      color: #c1950e;
      background-color: #223e6b;
    }
  }

  html[data-theme="light"] & {
    color: #d9d9d9;
  }

  html[data-theme="dark"] & {
    color: var(--text-color);
  }
}

@media (max-width: 1240px) {
  .developers {
    border-radius: 5px 0 5px 0;
  }
}

.theme-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

#theme-switch {
  display: none;
}

.theme-toggle label {
  display: block;
  width: 64px; // Увеличиваем ширину переключателя
  height: 32px; // Увеличиваем высоту переключателя
  background-color: var(--text-color);
  border-radius: 16px; // Пропорционально увеличиваем радиус
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-toggle .toggle {
  position: absolute;
  top: 0; // Убираем отступ сверху, чтобы круг был вровень с краями
  left: 0; // Убираем отступ слева
  width: 32px; // Устанавливаем размер круга 32x32
  height: 32px;
  background-color: var(--accent-color);
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px; // Растягиваем иконку на всю ширину круга
  height: 32px; // Растягиваем иконку на всю высоту круга
  background-size: contain;
  background-repeat: no-repeat;
}

.theme-toggle .liu-kang {
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  background-image: url('@/assets/images/liu-kang-icon.webp');
}

.theme-toggle .havik {
  right: 50%;
  transform: translate(50%, -50%);
  opacity: 0;
  background-image: url('@/assets/images/havik-icon.webp');
}

#theme-switch:checked + label .toggle {
  transform: translateX(32px); // Сдвигаем круг на ширину круга (32px)
}

#theme-switch:checked + label .liu-kang {
  opacity: 0;
}

#theme-switch:checked + label .havik {
  opacity: 1;
}

@media (max-width: 480px) {
  .theme-toggle label {
    width: 54px; // Уменьшаем ширину переключателя
    height: 27px; // Уменьшаем высоту переключателя
    border-radius: 13.5px; // Пропорционально уменьшаем радиус
  }
  .theme-toggle .toggle {
    width: 27px; // Уменьшаем размер круга
    height: 27px;
  }
  .theme-toggle .icon {
    width: 27px; // Уменьшаем размер иконки
    height: 27px;
  }
  #theme-switch:checked + label .toggle {
    transform: translateX(27px); // Сдвигаем круг на новую ширину круга
  }
}

@media (max-width: 360px) {
  .theme-toggle label {
    width: 44px; // Ещё больше уменьшаем ширину переключателя
    height: 22px; // Ещё больше уменьшаем высоту переключателя
    border-radius: 11px; // Пропорционально уменьшаем радиус
  }
  .theme-toggle .toggle {
    width: 22px; // Ещё больше уменьшаем размер круга
    height: 22px;
  }
  .theme-toggle .icon {
    width: 22px; // Ещё больше уменьшаем размер иконки
    height: 22px;
  }
  #theme-switch:checked + label .toggle {
    transform: translateX(22px); // Сдвигаем круг на новую ширину круга
  }
}
</style>