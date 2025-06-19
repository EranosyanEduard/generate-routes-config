<template>
  <div id="app">
    <header>
      <nav>
        <router-link :to="{ name: 'home' }">home</router-link>
        <router-link :to="{ name: 'settings' }">settings</router-link>
        <router-link
          :to="{ name: 'settings-settingId', params: { settingId: 'a' } }"
          >settingsId</router-link
        >
        <router-link
          :to="{
            name: 'settings-settingId-users',
            params: { settingId: 27 },
          }"
          >settingsIdUsers</router-link
        >
        <router-link
          :to="{
            name: 'settings-settingId-users-userId',
            params: { settingId: 27, userId: 10 },
          }"
          >settingsIdUsers</router-link
        >
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
header nav {
  display: flex;
  gap: 24px;
  text-transform: uppercase;
}

main {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
