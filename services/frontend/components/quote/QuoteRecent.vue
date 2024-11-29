<script setup lang="ts">

// import { RuntimeConfig } from '#app'
import axios from 'axios'
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const apiBase = config.public.apiBase; // Acessa o valor de apiBase

console.log('API Base URL:', apiBase);
const apiUrl = `${apiBase}/fetchRankingWithNameAlteredForInitGame`

// Variável para armazenar o número selecionado
const selectedNumber = ref(null);

// Gerar uma lista de números de 1 a 20
const numberList = Array.from({ length: 20 }, (_, i) => i + 1);
const selectedItemSe = ref(); // Armazena o item selecionado
const filteredItems = ref([]); 

const fetchRankingWithNameAlteredForInitGame = ref([]);
// Função para buscar os dados da API e filtrar os itens
const fetchRanking = async (selectedId) => {
  if (selectedId) {
    // Faz a requisição à API passando o ID selecionado
    try {
      const response = await axios.get(`http://localhost:3000/api/fetchRankingWithNameAlteredForInitGame?initGame=${selectedId}`);
      filteredItems.value = response.data;  // Atualiza os itens filtrados com a resposta da API
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
    }
  } else {
    filteredItems.value = fetchRankingWithNameAlteredForInitGame.value;  // Se nenhum item for selecionado, mostra todos
  }
};

// Função para inicializar os itens (exemplo, deve ser ajustado conforme a estrutura da sua API)
const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/fetchRankingWithNameAlteredForInitGame');
    console.log(response.data); // Mostra os itens no console
    fetchRankingWithNameAlteredForInitGame.value = response.data;
    filteredItems.value = fetchRankingWithNameAlteredForInitGame.value;  // Inicializa os itens filtrados com todos os itens
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
  }
};

// Inicializa a lista de itens quando o componente é montado
fetchItems();
// Armazena os itens filtrados pela seleção


// Chama a função para fazer a requisição

// const items = [
//   {
//     id: 1,
//     client: {
//       name: 'Mark AI',
//       email: 'mark@email.com',
//       image: 'https://avatars.githubusercontent.com/u/18229355?v=4',
//     },
//     createdAt: '2021-08-01T12:00:00.000Z',
//     currency: 'USD',
//     total: 1000,
//     project: 'Project 1',
//     status: {
//       id: 1,
//       name: 'Draft',
//     },
//   },
//   {
//     id: 2,
//     client: {
//       name: 'Mark Ai',
//       email: 'mark@email.com',
//       image: 'https://avatars.githubusercontent.com/u/18229355?v=4',
//     },
//     createdAt: '2021-08-01T12:00:00.000Z',
//     currency: 'USD',
//     total: 1000,
//     project: 'Project 2',
//     status: {
//       id: 1,
//       name: 'Draft',
//     },
//   },
//   {
//     id: 2,
//     client: {
//       name: 'Mark Ai',
//       email: 'mark@email.com',
//       image: 'https://avatars.githubusercontent.com/u/18229355?v=4',
//     },
//     createdAt: '2021-08-01T12:00:00.000Z',
//     currency: 'USD',
//     total: 1000,
//     project: 'Project 2',
//     status: {
//       id: 1,
//       name: 'Draft',
//     },
//   },
//   {
//     id: 2,
//     client: {
//       name: 'Mark Ai',
//       email: 'mark@email.com',
//       image: 'https://avatars.githubusercontent.com/u/18229355?v=4',
//     },
//     createdAt: '2021-08-01T12:00:00.000Z',
//     currency: 'USD',
//     total: 1000,
//     project: 'Project 2',
//     status: {
//       id: 1,
//       name: 'Draft',
//     },
//   },
//   {
//     id: 2,
//     client: {
//       name: 'Mark Ai',
//       email: 'mark@email.com',
//       image: 'https://avatars.githubusercontent.com/u/18229355?v=4',
//     },
//     createdAt: '2021-08-01T12:00:00.000Z',
//     currency: 'USD',
//     total: 1000,
//     project: 'Project 2',
//     status: {
//       id: 1,
//       name: 'Draft',
//     },
//   },
// ];
</script>

<template>
  <div class="pb-1">
    <div class="rounded-md border-gray-200 dark:border-slate-700">
      <header class="border-b border-gray-100 py-4 dark:border-slate-700">
        <h2 class="font-semibold text-gray-600"> Statistic for Init Game </h2>
      </header>
      <!-- Caixa de seleção -->
      <div class="mb-4">
        <label for="itemSelect" class="text-sm font-semibold text-gray-600 dark:text-slate-300">Init Game</label>
        <select 
          id="itemSelect" 
          v-model="selectedNumber" 
          @change="fetchRanking(selectedNumber)" 
          class="mt-2 p-2 border rounded-md text-gray-700"
        >
          <option value="Selecione um Init" disabled>Select Init Game</option>
          <option v-for="number in numberList" :key="number" :value="number">
            {{ number }}
          </option>
        </select>
      </div>
      <div>
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead
              class="bg-gray-50 text-xs font-semibold uppercase text-gray-400 dark:bg-slate-800"
            >
              <tr>
                <th class="whitespace-nowrap px-2 py-2">
                  <div class="text-left font-semibold">{{ 'names' }}</div>
                </th>

                <th class="whitespace-nowrap p-2">
                  <div class="text-left font-semibold">
                    {{ 'total_kills' }}
                  </div>
                </th>
                <th class="whitespace-nowrap p-2">
                  <div class="text-left font-semibold">{{ 'total_deaths' }}</div>
                </th>
                <th class="whitespace-nowrap p-2">
                  <div class="text-center font-semibold">
                    {{ 'kills_after_deaths' }}
                  </div>
                </th>
                <th />
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-100 text-sm dark:divide-slate-700"
            >
              <tr
                v-for="(item, index) in filteredItems"
                :key="index"
                class="transition-all hover:shadow-lg"
              >
                <td class="whitespace-nowrap py-2">
                  <div class="flex items-center">
                    <div class="mr-2 h-10 w-10 flex-shrink-0 px-2 sm:mr-3">
                      <NAvatar
                        class="rounded-full bg-primary-50"
                        :src="item.names?.image"
                        width="40"
                        height="40"
                        :alt="item.names?.name"
                      />
                    </div>
                    <div>
                      <nuxt-link
                        :to="`/quote/${item.id}`"
                        class="text-primary font-medium"
                      >
                        {{ item.all_names }}
                      </nuxt-link>
                      <div class="text-left text-gray-600">
                        {{ item.all_names }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap p-2">
                  <div class="text-left font-medium text-green-500">
                    {{ item.total_kills }}
                  </div>
                </td>
                <td class="whitespace-nowrap p-2">
                  <div class="text-left font-medium text-red-500">
                    {{ item.total_deaths }}
                  </div>
                </td>
                <td class="p-2 text-center">
                  <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight"
                    :class="
                      item.kills_after_deaths > 0 ? 'text-green-900' : 'text-orange-900'
                    "
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 rounded-full opacity-50"
                      :class="
                        item.kills_after_deaths < 0 ? '' : 'bg-orange-200'
                      "
                    />
                    <span class="relative">{{ item.kills_after_deaths }}</span>
                  </span>
                </td>
             
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
