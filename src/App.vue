<script setup lang="ts">
import { ref } from 'vue';

import IrisInputNumber from '@/components/InputNumber/InputNumber.vue';
import {
  IrisAppLayout,
  IrisButton,
  IrisDivider,
  IrisIcon,
  IrisSelect,
  IrisSelectGroup,
  IrisSelectOption,
  IrisTypography,
  IrisNotification,
  IrisTable,
  IrisTableColumn,
  IrisTextInput,
} from './components';

const value = ref([]);
const isDisabled = ref(false);

const test = ref();

const handleToggle = () => {
  isDisabled.value = !isDisabled.value;
};

const handleDisconnect = () => {
  // eslint-disable-next-line no-console
  console.log('Déconnexion');
};

const handleClick = () => {
  // eslint-disable-next-line no-console
  console.log('Clic sur le logo');
};

const openNotif = () =>
  IrisNotification({
    type: 'error',
    title: 'Un titre un peu trop long pour rester sur une seule ligne',
    message:
      'Mollit culpa duis excepteur cupidatat reprehenderit enim est cillum anim non anim minim amet.',
    duration: 0,
  });

interface IrisTableRef {
  methods: {
    clearSelection: () => void;
    /*     getSelectionRows: () => void;
    toggleRowSelection: (row: any, selected: boolean) => void;
    toggleAllSelection: () => void;
    toggleRowExpansion: (row: any, expanded: boolean) => void;
    setCurrentRow: (row: any) => void;
    clearSort: () => void;
    clearFilter: (columnKey: any) => void;
    doLayout: () => void;
    sort: (prop: string, order: string) => void;
    scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
    setScrollTop: (top: number) => void;
    setScrollLeft: (left: number) => void; */
  };
}

const irisTableRef = ref<IrisTableRef | null>(null);

const formData = ref({
  telephoneMobile: '',
});

const tableData = ref([
  {
    name: 'Tom',
    city: 'Los Angeles',
  },
  {
    name: "Aragorn, fils d'Arathorn, descendant d'Isildur",
    city: 'Minas Tirith',
  },
  {
    name: 'Laurence',
    city: 'Seattle',
  },
]);

const formatPhone = (inputValue: string) =>
  // Cet exemple formatte le numéro en format français
  inputValue.replace(/(\d{2})(?=\d)/g, '$1 ').trim();

const parseNumber = (inputValue: string) =>
  // Enlève tous les caractères non-numériques
  inputValue.replace(/\D/g, '');

const authorizePasteNumber = (event: ClipboardEvent) => {
  const pastedData = event.clipboardData?.getData('text');

  if (pastedData && !/^\d+$/.test(pastedData)) {
    event.preventDefault();
  }
};

const authorizePressNumber = (event: KeyboardEvent) => {
  if (
    event.key &&
    !/\d/.test(event.key) &&
    !['Backspace', 'ArrowRight', 'ArrowLeft', 'Delete'].includes(event.key)
  ) {
    event.preventDefault();
  }
};

const handleSelectionChange = (selection: any) => {
  // eslint-disable-next-line no-console
  console.log(selection);
};

const handleRowClick = (row: any, column: any, event: any) => {
  // eslint-disable-next-line no-console
  console.log(row, column, event);
};

const clearSelection = () => {
  irisTableRef.value?.methods.clearSelection();
};
</script>

<template>
  <iris-app-layout
    app-name="Design System U 🛒"
    app-description="Lorem ipsum dolor sit amet"
    sidebar-title="Titre"
    icon="IrisCarReturn"
    scroll-container="body"
    :user="{
      name: 'Johann Dubochant',
      pseudo: 'johann.dubochant',
      email: 'johann.dubochant@systeme-u.fr',
    }"
    class="app-layout"
    @disconnect="handleDisconnect"
    @click-app-name="handleClick"
  >
    <div class="app-layout__content">
      <IrisTextInput
        v-model="formData.telephoneMobile"
        :max-length="14"
        :formatter="formatPhone"
        :parser="parseNumber"
        :placeholder="'Numéro de téléphone'"
        class="app-layout__phone-input"
        @paste="authorizePasteNumber($event)"
        @keypress="authorizePressNumber($event)"
      />
      <p>{{ formData.telephoneMobile }}</p>
      <IrisInputNumber
        v-model="test"
        variant="chevrons-internes"
        :min="0"
        :max="999999"
        :step="10"
        step-strictly
        :precision="0"
        :readonly="false"
        :disabled="false"
        :controls="true"
        name=""
        :value-on-clear="0"
        class="app-layout__input-number"
      />

      <button :onclick="handleToggle">Toggle disable state on button</button>
      <br /><span>&nbsp;</span><br />
      <iris-button variant="primary" :disabled="isDisabled" @click="openNotif">
        Mon bouton {{ isDisabled ? 'disabled' : '' }}
      </iris-button>
      <hr />
      <iris-icon name="IrisCarStart" />
      <iris-typography :ellipsis="1"
        >Sélectionner le fruit ou le légume de votre choix :</iris-typography
      >
      <iris-select
        v-model="value"
        filterable
        multiple
        class="app-layout__fruit-select"
      >
        <iris-select-group label="Fruits">
          <iris-select-option label="Pomme" value="fruit-pomme" />
          <iris-select-option label="Poire" value="fruit-poire" />
          <iris-select-option label="Banane" value="fruit-banane" />
        </iris-select-group>
        <iris-select-group label="Légumes">
          <iris-select-option label="Poivron" value="legume-poivron" />
          <iris-select-option label="Courgette" value="legume-courgette" />
        </iris-select-group>
      </iris-select>

      <div style="padding: 1rem">Value : {{ value }}</div>

      <IrisDivider />

      <iris-table
        ref="irisTableRef"
        :data="tableData"
        stripe
        class="app-layout__table"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <iris-table-column type="selection" width="55" prop="" />
        <iris-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="Prénom"
          sortable
        />
        <iris-table-column
          prop="city"
          align-header="center"
          sortable
          sort-by="city"
        >
        </iris-table-column>
        <template #empty> Le tableau est vide </template>
      </iris-table>

      <br />
      <br />

      <IrisButton
        variant="primary"
        icon-before="PhX"
        class="app-layout__table-button"
        @click.prevent="clearSelection"
        >Supprimer la sélection</IrisButton
      >
    </div>
  </iris-app-layout>
</template>

<style lang="scss" scoped>
.app-layout__content {
  padding: 1em;
}

.app-layout__phone-input {
  width: 20vw;
}

.app-layout__input-number {
  margin-bottom: 1em;
}

.app-layout__table {
  margin-top: 1em;
}
</style>
