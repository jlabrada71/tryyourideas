<template>
  <h1>Post List</h1>
  <v-text-field
    v-model="query"
    label="Search"
    required
  ></v-text-field>

  <main class="text-left">
    <nav>
      <div v-if="articles.length">
        <h2 >Search Result</h2>
        <ul >
          <li v-for="article of articles" :key="article.slug">
            <NuxtLink :to="`blog/${article.slug}`">{{ article.title }}</NuxtLink>
          </li>
        </ul>
      </div>
      <AppNavigation v-else :navigation-tree="navigation"  />
    </nav>
  </main>
</template>
<script setup>
  import { watch, ref } from 'vue'
  const { data: navigation } = await useAsyncData('navigation', () => {
    return fetchContentNavigation()
  })
  

  const query = ref('')
  const articles = ref([])

  watch(query, async (newQuery, oldQuery) => {
    if (!newQuery) {
      articles.value = []
      return
    }
    const results = await queryContent('')
      .only(['title', 'slug'])
      // .sort({ createdAt: 1 })
      .limit(12)
      .where({ description: { $regex: `/${newQuery}/ig` } })// $or: [title: { $regex: `/${search}/ig` }, description: { $regex: `/${search}/ig` }]
      .find()
    articles.value = results;
  })
  
</script>