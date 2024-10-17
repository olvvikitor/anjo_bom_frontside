<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/admin/login">Login admin</RouterLink>
        <RouterLink to="/create-admin">Create admin</RouterLink>
        <RouterLink to="/admin/show-all">Show All</RouterLink>
        <RouterLink to="/admin/create-evento">Criar evento</RouterLink>
        <RouterLink to="/admin/list-events">Lista de eventos</RouterLink>
        <RouterLink to="/payment">Doar</RouterLink>
        <RouterLink to="/admin/show-donates">Vizualizar doacoes</RouterLink>

        <!-- DOADORES ROTAS -->
        <RouterLink to="/donor/login">Login Donor</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  header {
    flex-direction: row;
    justify-content: space-between;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-start;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
    width: auto;
  }
}
</style>
