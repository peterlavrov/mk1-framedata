<template>
  <div class="container">
    <div class="theme-toggle">
      <input type="checkbox" id="theme-switch" v-model="isDarkTheme" @change="toggleTheme" />
      <label for="theme-switch">
        <span class="toggle">
          <span class="icon sun">☀️</span>
          <span class="icon moon">🌙</span>
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
  min-height: 100vh; /* Перенесли из .app-root */
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
    background-color: rgba(255, 255, 255, 0.7);
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
    color: #0d47a1;
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
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  font-size: 0.7rem;
  line-height: 1.5;
  border-radius: 5px 0 5px 0;
  color: var(--text-color);
  display: inline-block;
  white-space: nowrap;
  z-index: 999;

  a {
    color: var(--link-color);
    text-decoration: none;

    &:hover {
      color: #0d47a1;
    }
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
  width: 60px;
  height: 30px;
  background-color: var(--text-color);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-toggle .toggle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
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
  font-size: 16px;
}

.theme-toggle .sun {
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.theme-toggle .moon {
  right: 50%;
  transform: translate(50%, -50%);
  opacity: 0;
}

#theme-switch:checked + label .toggle {
  transform: translateX(30px);
}

#theme-switch:checked + label .sun {
  opacity: 0;
}

#theme-switch:checked + label .moon {
  opacity: 1;
}

@media (max-width: 480px) {
  .theme-toggle label {
    width: 50px;
    height: 25px;
  }
  .theme-toggle .toggle {
    width: 21px;
    height: 21px;
  }
  .theme-toggle .icon {
    font-size: 14px;
  }
  #theme-switch:checked + label .toggle {
    transform: translateX(25px);
  }
}

@media (max-width: 360px) {
  .theme-toggle label {
    width: 40px;
    height: 20px;
  }
  .theme-toggle .toggle {
    width: 16px;
    height: 16px;
  }
  .theme-toggle .icon {
    font-size: 12px;
  }
  #theme-switch:checked + label .toggle {
    transform: translateX(20px);
  }
}
</style>