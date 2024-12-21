<template>
  <main v-if="page" class="prose text-left">
    <ContentDoc>
      <template #default="{ doc }">
        <ContentRenderer ref="nuxtContent" :value="doc" />
      </template>
    </ContentDoc>
  </main> 
    <!-- <ContentRenderer  :value="page" /> -->

</template>

<script setup>
  const { path } = useRoute()
  const { data: page } = await useAsyncData(`content-${path}`, () => {
    return queryContent().where({ _path: path }).findOne()
  })
  useContentHead(page)
</script>
  