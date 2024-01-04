<template>
  <div :class="rootClasses">
    <header class="iris-app-layout__header">
      <div class="iris-app-layout-header__app-name">
        <iris-button
          v-if="slots.sidebar"
          variant="tertiary"
          icon-before="PhList"
          class="iris-app-layout-header__button-menu"
          aria-label="Ouvrir/Fermer le menu"
          @click="toggle"
        />
        <button
          class="iris-app-layout-header__button-title"
          @click="$emit('clickAppName')"
        >
          <strong class="iris-app-layout-header__title">{{ appName }}</strong>
        </button>
      </div>
      <div class="iris-app-layout-header__app-content">
        <svg
          class="iris-app-layout-header__logo"
          width="34"
          height="32"
          viewBox="0 0 34 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="button"
          aria-label="Logo U"
          tabindex="0"
          @click="$emit('clickULogo')"
        >
          <path
            d="M16.7843 29.9306C9.11317 29.9306 2.89795 23.7366 2.89795 16.0957C2.89795 8.45823 9.11317 2.26758 16.7843 2.26758C24.4521 2.26758 30.6707 8.45823 30.6707 16.0957C30.6707 23.7369 24.4521 29.9306 16.7843 29.9306Z"
            fill="white"
          />
          <path
            d="M18.9387 0.821974C18.5203 0.787089 18.3049 0.773621 17.8914 0.773621C18.6318 0.795352 19.3774 0.876747 20.1228 1.02455C28.0274 2.55768 33.0869 10.5024 31.426 18.7712C29.7636 27.0366 22.0091 32.4962 14.1045 30.9649C13.7527 30.8951 13.4058 30.8137 13.0654 30.7192C14.4096 31.1326 15.8538 31.3584 17.3765 31.3584C18.9006 31.3584 20.0798 31.1525 21.2051 30.9C26.0867 29.7956 30.0389 26.3805 32.0116 22.1031C32.8488 20.233 33.3108 18.1665 33.3108 15.999C33.3105 7.53438 26.655 1.4747 18.9387 0.82197"
            fill="#54BBAB"
          />
          <path
            d="M0.847486 14.8539C0.26529 23.1707 6.72261 30.4113 15.5278 31.1635C15.0574 31.1222 14.5821 31.0558 14.1034 30.9643C6.19878 29.433 1.13935 21.4846 2.80023 13.2161C4.45127 5.00547 12.1123 -0.434222 19.9601 0.992718C19.3011 0.866335 18.6326 0.776674 17.9487 0.728324C8.99056 0.117215 1.43091 6.43914 0.847486 14.8539Z"
            fill="#5BC5F2"
          />
          <path
            d="M20.1228 1.02395C12.2182 -0.51101 4.46219 4.94888 2.79947 13.2158C1.1386 21.4861 6.19803 29.4327 14.1027 30.964C22.0089 32.4956 29.7649 27.0372 31.4261 18.7703C33.0869 10.5033 28.029 2.55647 20.1228 1.02395ZM16.7842 29.9306C9.11301 29.9306 2.89779 23.7366 2.89779 16.0957C2.89779 8.45824 9.11301 2.26759 16.7842 2.26759C24.452 2.26759 30.6706 8.45824 30.6706 16.0957C30.6706 23.7369 24.452 29.9306 16.7842 29.9306Z"
            fill="#007E92"
          />
          <path
            d="M24.4953 9.50482H19.7425C18.8722 9.50482 18.7517 9.85704 18.7517 10.3886C18.7517 10.3886 18.7535 18.0842 18.7535 18.094C18.6936 19.8582 18.0364 20.4231 16.774 20.4231C15.4818 20.4231 14.8213 19.8282 14.7946 17.9514V10.3889C14.7946 9.85735 14.6695 9.50513 13.8007 9.50513H9.04639V18.6693C9.04639 20.6973 9.43995 21.5544 10.2821 22.4247C11.5847 23.7785 13.864 24.3483 16.7741 24.3483C19.6842 24.3483 21.9653 23.7785 23.271 22.4247C24.1098 21.5544 24.5067 20.6973 24.5067 18.6693L24.4953 9.50482Z"
            fill="#E42313"
          />
        </svg>
      </div>
      <div
        v-if="appDescription"
        class="iris-app-layout-header__app-description"
      >
        <!-- @slot Slot pour permettant de customiser la description de l'application -->
        <slot name="appDescription">
          {{ appDescription }}
        </slot>
      </div>
      <div v-if="user" class="iris-app-layout-header__user">
        <span class="iris-app-layout-header__user-name">
          {{ user.name }}
        </span>
      </div>
    </header>
    <aside v-if="slots.sidebar" class="iris-app-layout__sidebar">
      <div class="iris-app-layout__header-sidebar">
        <iris-app-logo
          :icon="icon"
          :label="sidebarTitle"
          :variant="logoVariant"
          :size="size"
          role="button"
          aria-label="Logo de l'application"
          tabindex="0"
          :description="sidebarDescription"
          @click="$emit('clickSidebarLogo')"
        />
      </div>
      <!-- @slot Slot de la sidebar, à utiliser pour le menu -->
      <slot name="sidebar" />

      <div v-if="hasVersion" class="iris-app-layout__sidebar-version">
        <!-- @slot Slot contenant la version par défaut, permet de customiser le footer de la sidebar -->
        <slot name="version">
          {{ props.version }}
        </slot>
      </div>
    </aside>
    <main class="iris-app-layout__main" @click="close">
      <!-- @slot Slot par défaut, afficher le contenu de l'application -->
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, provide, ref, useSlots } from 'vue';
import useMedia from './useMedia';
import IrisAppLogo from '../AppLogo/AppLogo.vue';

const props = defineProps({
  /**
   * Nom de l'application
   */
  appName: {
    type: String,
    required: true,
  },
  /**
   * Contenu du header
   */
  appDescription: {
    type: String,
    default: null,
  },

  /**
   * Nom de l'application dans la sidebar
   */
  sidebarTitle: {
    type: String,
    required: true,
  },
  /**
   * Description de l'application dans la sidebar
   */
  sidebarDescription: {
    type: String,
    default: null,
  },

  /**
   * Icône importée (.svg)
   */
  icon: {
    type: Object as PropType<any>,
    required: true,
  },

  /**
   * Fin du mode Full-Height pour la sidebar
   */
  fullheightEnd: {
    type: String as PropType<'always' | 'sm' | 'md' | 'lg' | 'xl' | 'never'>,
    default: 'md',
  },

  /**
   * Fin du mode collapse pour la sidebar
   * Si vous voulez désactiver le mode collapse il suffit de mettre un breakpoint indentique au mode Full-Height
   */
  collapseEnd: {
    type: String as PropType<'always' | 'sm' | 'md' | 'lg' | 'xl' | 'never'>,
    default: 'lg',
  },
  /**
   *
   */
  user: {
    type: Object as PropType<{
      name: String;
      pseudo: String;
      email: String;
    }>,
    default: null,
  },
  /**
   * Version de l'application
   */
  version: {
    type: String,
    default: null,
  },
});

defineEmits<{
  /**
   * Event au click sur le nom de l'application dans la TopBar
   */
  (event: 'clickAppName'): void;
  /**
   * Event au click sur le logo U dans la TopBar
   */
  (event: 'clickULogo'): void;
  /**
   * Event au click sur le logo dans la SideBar
   */
  (event: 'clickSidebarLogo'): void;
  /**
   * Event au click sur le bouton déconnexion
   */
  (event: 'disconnect'): void;
}>();

const slots = useSlots();

const showMobileMenu = ref(false);

enum Breakpoints {
  always = 0,
  sm = 600,
  md = 900,
  lg = 1200,
  xl = 1800,
  never = 99999,
}

const mediaFullheight = Breakpoints[props.fullheightEnd];
const mediaCollapse = Breakpoints[props.collapseEnd];

const isCollapseMode = useMedia(
  `(min-width: ${mediaFullheight}px) and (max-width: ${mediaCollapse - 1}px)`
);
const isFullheightMode = useMedia(`(max-width: ${mediaFullheight - 1}px)`);

function toggle() {
  showMobileMenu.value = !showMobileMenu.value;
}

function close() {
  showMobileMenu.value = false;
}

const rootClasses = computed(() => ({
  'iris-app-layout': true,
  [`iris-app-layout--with-sidebar`]: slots.sidebar,
  [`iris-app-layout--default`]:
    !isCollapseMode.value && !isFullheightMode.value,
  [`iris-app-layout--collapse`]: isCollapseMode.value && slots.sidebar,
  [`iris-app-layout--full-height`]: isFullheightMode.value && slots.sidebar,
  'iris-app-layout__sidebar--extended': showMobileMenu.value,
}));

const logoVariant = computed(() =>
  isFullheightMode.value ? 'horizontal' : 'vertical'
);

const size = computed(() => (isFullheightMode.value ? 'small' : 'large'));

const hasVersion = computed(() => !!slots.version || !!props.version);

const isMenuCollapsed = computed(
  () => isCollapseMode.value && !showMobileMenu.value
);
provide('app-layout-context', { isMenuCollapsed });
</script>

<script lang="ts">
export default {
  name: 'IrisAppLayout',
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/sass/abstracts/breakpoints' as *;

/*
 * BASE LAYOUT
 */
.iris-app-layout {
  --header-height: 3rem;
  background: var(--dsmu-c-grey-25);
  display: grid;
  grid-template:
    'header'
    'main';

  grid-template-rows: var(--header-height) 1fr;
  height: 100vh;

  .iris-app-layout__main {
    max-height: 100%;
    grid-area: main;
    overflow: auto;
    padding-left: 16px;
    padding-right: 16px;

    @media only screen and (min-width: map.get($grid-breakpoints, 'sm')) {
      padding-left: 24px;
      padding-right: 24px;
    }

    @media only screen and (min-width: map.get($grid-breakpoints, 'md')) {
      padding-left: 40px;
      padding-right: 40px;
    }

    @media only screen and (min-width: map.get($grid-breakpoints, 'lg')) {
      padding-left: 64px;
      padding-right: 64px;
    }

    @media only screen and (min-width: map.get($grid-breakpoints, 'xl')) {
      padding-left: 96px;
      padding-right: 96px;
    }
  }

  &__header {
    position: fixed;
    grid-area: header;
    z-index: 1;
    top: 0;
    left: 0;
    height: var(--header-height);
    width: 100%;
    display: grid;
    grid-template-columns: max-content 1fr max-content max-content;
    background-color: var(--dsmu-c-primary-700);
    color: white;
    font-size: var(--dsmu-typo-size-body-small);
    font-weight: var(--dsmu-typo-weight-semibold);
  }

  &-header__logo {
    position: absolute;
    left: calc(50% - 34px);
    cursor: pointer;
  }

  &-header__app-name {
    display: flex;
    align-items: center;
    padding-left: 0.625rem;
  }

  &-header__button-title {
    border: 0;
    background-color: transparent;
    color: white;
    padding: 0;
  }

  &-header__title {
    font-family: var(--dsmu-font-family-title);
    font-size: var(--dsmu-typo-size-header4);
    font-weight: var(--dsmu-typo-weight-bold);
    line-height: 1.33;
    margin-left: 0.875rem;
    cursor: pointer;
  }

  &-header__app-description,
  &-header__app-content {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 1rem;
  }

  @media only screen and (max-width: (map.get($grid-breakpoints, 'md') - 1)) {
    &-header__app-description,
    &-header__app-content {
      display: none;
    }
  }

  &-header__user {
    position: relative;
    justify-self: flex-end;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;

    &::before {
      content: '';
      position: absolute;
      top: 0.75rem;
      bottom: 0.75rem;
      left: 0;
      width: 1px;
      background-color: white;
    }

    @media only screen and (max-width: (map.get($grid-breakpoints, 'md') - 1)) {
      &::before {
        width: 0;
      }
    }

    @media only screen and (max-width: (map.get($grid-breakpoints, 'sm') - 1)) {
      &-name {
        display: none;
      }
    }
  }

  &-header__user-popover {
    text-align: center;

    @media only screen and (min-width: map.get($grid-breakpoints, 'md')) {
      .iris-app-layout-popover__app-description {
        display: none;
      }
    }
  }

  &-header__button-menu {
    color: white;

    :deep(.iris-btn__icon) {
      width: 2rem;
      height: 2rem;
    }
  }

  &-header__user-action,
  &-header__button-menu {
    &:focus,
    &:hover {
      background: unset !important;
    }

    &:hover {
      color: darken(white, 10%);
    }

    &:focus {
      color: white;
      border: solid 2px white;
    }
  }

  &-header__user-action {
    padding: 0;
    appearance: none;
    border: solid 2px transparent;
    border-radius: 50%;
    background-color: transparent;
    color: white;
    cursor: pointer;

    svg {
      display: block;
    }
  }

  :deep(.iris-app-logo) {
    cursor: pointer;
  }
}

/*
 * SIDEBAR LAYOUT
 */
.iris-app-layout--with-sidebar {
  display: grid;
  grid-template:
    'header header'
    'sidebar main';

  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: auto 1fr;

  .iris-app-layout__sidebar {
    grid-area: sidebar;
    height: 100%;
    background: white;
    box-shadow: var(--dsmu-shadow-raised);
    z-index: 1;
    overflow: auto;

    display: flex;
    flex-direction: column;

    .iris-app-layout__header-sidebar {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    :deep(.iris-menu__item),
    :deep(.el-sub-menu__title) {
      padding: 0.5rem 1rem;
    }

    :deep(.iris-sidebar__divider) {
      margin: 1rem 0.5rem;
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid var(--dsmu-c-border-separation-subtle);
    }

    :deep(.iris-menu__item-icon) {
      visibility: visible;
    }
  }
}

.iris-app-layout--full-height {
  .iris-app-layout__sidebar {
    position: fixed;
    top: 0;
    padding: 0.375rem 1rem;
    max-width: 90vw;
    min-width: 15rem;
    transform: translateX(-90vw);
    transition: transform 330ms ease-in-out;

    &.is-extended {
      transform: translateX(0);
    }
  }

  &.iris-app-layout__sidebar--extended {
    .iris-app-layout__sidebar {
      transform: translateX(0) !important;
      z-index: 2000;
    }

    .iris-app-layout__sidebar-version {
      display: block;
    }

    :deep(.iris-sidebar__divider) {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    :deep(.iris-app-logo) {
      .iris-app-logo__label {
        padding-left: 0.5rem;
      }

      .iris-app-logo__description {
        display: none;
      }
    }
  }
}

.iris-app-layout--collapse {
  grid-template-columns: 3.5rem 1fr;

  .iris-app-layout__sidebar {
    position: absolute;
    top: var(--header-height);
    height: calc(100% - var(--header-height));
    padding: 1rem 0;
    width: 3.5rem;
    transition: width 330ms ease-in-out, padding 330ms ease-in-out;

    :deep(.iris-menu) {
      overflow: hidden;
    }

    .iris-app-layout__sidebar-version {
      display: none;
    }

    :deep(.iris-app-logo) {
      padding: 0 0.5rem;

      .iris-app-logo__icon {
        height: 2rem;
        width: 2rem;
      }

      .iris-app-logo__label,
      .iris-app-logo__description {
        display: none;
      }
    }
  }

  &.iris-app-layout__sidebar--extended {
    .iris-app-layout__sidebar {
      padding: 1rem 1rem 0 1rem;
      width: 20rem;
      z-index: 2000;

      :deep(.iris-menu) {
        overflow: auto;
        visibility: visible;
      }

      .iris-app-layout__header-sidebar {
        text-align: center;
      }
    }

    .iris-app-layout__sidebar-version {
      display: block;
    }

    :deep(.iris-sidebar__divider) {
      margin-left: 0;
      margin-right: 0;
    }

    :deep(.iris-app-logo) {
      .iris-app-logo__label,
      .iris-app-logo__description {
        display: block;
      }
    }
  }
}

.iris-app-layout--default {
  .iris-app-layout-header__button-menu {
    display: none !important;
  }

  .iris-app-layout__sidebar {
    padding: 0 1rem;
    width: 20rem;
  }
}

.iris-app-layout__sidebar-version {
  margin-top: auto;
  text-align: center;
  padding-bottom: 1rem;
  font-weight: var(--dsmu-typo-weight-regular);
  font-size: var(--dsmu-typo-size-body-extra-small);
  color: var(--dsmu-text-medium-emphasis);
}
</style>
