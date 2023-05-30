<script setup lang="ts">
import Tavolo from '@/components/Tavolo.vue';
import { ref } from 'vue';
import type { Resolver } from './types';

const lorem =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident dolore consequatur, odit illo incidunt a sunt eum architecto ducimus unde at ex pariatur, quasi deserunt sed ullam similique nostrum quibusdam est non possimus minus. Quae praesentium obcaecati aperiam! Architecto delectus doloremque, quod nam odio et quo rerum quibusdam harum molestiae. Recusandae, eos aperiam facilis doloremque ab officia blanditiis veritatis sequi nobis totam quod quam rerum quos vitae repudiandae. Ducimus illo error similique. Laudantium quis tempora repellendus, provident, deserunt aliquam tenetur animi sint quam non consectetur totam ipsa voluptatem, similique quaerat! Velit recusandae quod minus eius eveniet perferendis obcaecati voluptatem veritatis.';

const words = lorem.split(' ');

const perPage = 15;
const count = words.length;
const lastPage = Math.ceil(count / perPage);

const tavoloRef = ref<any>();

async function delay(s: number) {
  await new Promise((resolve) => setTimeout(resolve, s));
}

const resolver: Resolver<{ id: string }> = async ({ page }) => {
  await delay(200);

  const start = (Math.max(page, 1) - 1) * perPage;

  return {
    rows: words
      .map((word) => ({
        id: word,
      }))
      .splice(start, perPage),
    paginator: {
      page,
      lastPage,
      count,
      perPage,
    },
  };
};

const classes = {
  row: 'row',
};
</script>

<template>
  <main>
    <Tavolo ref="tavoloRef" :resolver="resolver" keyBy="id" :classes="classes" />

    <div style="margin-top: 10rem">
      <button type="button" @click="tavoloRef.index">Refresh</button>
      <button type="button" @click="tavoloRef.clear">Clear</button>
    </div>
  </main>
</template>

<style>
.row {
  padding: 4px;
  border-bottom: solid 1px gainsboro;
}

.row:hover {
  background-color: khaki;
}
</style>
