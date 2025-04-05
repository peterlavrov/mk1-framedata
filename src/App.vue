<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

const theme = ref('system');

const isDark = computed({
  get() {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme.value === 'dark';
  },
  set(newValue) {
    theme.value = newValue ? 'dark' : 'light';
    applyTheme();
  }
});

const applyTheme = () => {
  if (theme.value === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme.value);
  }
  localStorage.setItem('theme', theme.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.value = savedTheme;
    applyTheme();
  }
});
</script>

<template>
  <div class="app-wrapper">
    <header>
      <h1>Mortal Kombat 1 Frame Data</h1>
    </header>
    <div class="theme-toggle">
      <input type="checkbox" id="theme-switch" v-model="isDark" />
      <label for="theme-switch">
        <span class="toggle">
          <span class="icon sun">☀️</span>
          <span class="icon moon">🌙</span>
        </span>
      </label>
    </div>
    <RouterView />
    <footer class="developers">
      <p>Developed by <a href="https://github.com/peterlavrov" target="_blank">Peter Lavrov</a> & Grok 3 (xAI)</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  color: var(--text-color);
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
  justify-content: center; /* Центрируем содержимое кружка */
}

.theme-toggle .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.theme-toggle .sun {
  left: 50%;
  transform: translate(-50%, -50%); /* Центрируем по горизонтали и вертикали */
  opacity: 1;
}

.theme-toggle .moon {
  right: 50%;
  transform: translate(50%, -50%); /* Центрируем по горизонтали и вертикали */
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

/* Адаптация переключателя */
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
  .theme-toggle .sun {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .theme-toggle .moon {
    right: 50%;
    transform: translate(50%, -50%);
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
  .theme-toggle .sun {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .theme-toggle .moon {
    right: 50%;
    transform: translate(50%, -50%);
  }
  #theme-switch:checked + label .toggle {
    transform: translateX(20px);
  }
}

.developers {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 0.9rem;
  color: var(--text-color);
  z-index: 1000;

  a {
    color: var(--link-color);
    text-decoration: none;

    &:hover {
      color: var(--link-hover);
    }
  }
}

@media (max-width: 480px) {
  .developers {
    font-size: 0.8rem;
    bottom: 5px;
    right: 5px;
  }
}

@media (max-width: 360px) {
  .developers {
    font-size: 0.7rem;
  }
}
</style>