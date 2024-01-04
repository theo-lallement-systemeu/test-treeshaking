<template>
  <div :class="rootClasses">
    <div class="iris-app-logo__icon-container">
      <component :is="props.icon" class="iris-app-logo__icon" />
    </div>
    <div class="iris-app-logo__content">
        <el-button> tesrt</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { computed, type PropType } from 'vue';
import ElButton  from 'element-plus/lib/components/button/src/button.vue'

const props = defineProps({
  /**
   * Variante du logo
   */
  variant: {
    type: String as PropType<'vertical' | 'horizontal' | 'icon'>,
    default: 'vertical',
  },
  /**
   * Taille du logo
   */
  size: {
    type: String as PropType<'large' | 'small'>,
    default: 'large',
  },
  /**
   * Icône importée (.svg)
   */
  icon: {
    type: Object,
    required: true,
  },
  /**
   * Label du logo
   */
  label: {
    type: String,
    required: true,
  },
  /**
   * Description du logo
   */
  description: {
    type: String,
    default: undefined,
  },
});

const rootClasses = computed(() => ({
  'iris-app-logo': true,
  [`iris-app-logo--variant-${props.variant}`]: props.variant,
  [`iris-app-logo--size-${props.size}`]: props.size,
}));

const showAppLabel = computed(() => {
  if (props.variant === 'vertical' && props.size === 'small') return false;
  if (props.variant === 'icon') return false;
  return true;
});

const showAppDescription = computed(() => {
  if (
    props.variant === 'horizontal' ||
    (props.variant === 'vertical' && props.size === 'large')
  )
    return true;
  return false;
});
</script>

<script lang="ts">
export default {
  name: 'IrisAppLogo',
  components: {ElButton}
};
</script>

<style lang="scss" scoped>
// AppLogo common
.iris-app-logo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iris-app-logo__icon-container {
  width: fit-content;
  height: fit-content;
}

// AppLogo small common
.iris-app-logo--size-small {
  .iris-app-logo__icon {
    width: 32px;
    height: 32px;
  }
}

// AppLogo large common
.iris-app-logo--size-large {
  .iris-app-logo__icon {
    width: 64px;
    height: 64px;
  }
}

// Icon
.iris-app-logo__icon {
  color: var(--dsmu-c-background-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

// Label
.iris-app-logo__label {
  text-align: center;
}

.iris-app-logo__content {
  flex: 1;
  flex-direction: column;

  &.iris-app-logo--variant-horizontal {
    text-align: left;
  }

  &.iris-app-logo--variant-vertical {
    text-align: center;
  }
}

// Vertical variant
.iris-app-logo--variant-vertical {
  flex-direction: column;

  .iris-app-logo__icon-container {
    border-bottom: 2px solid var(--dsmu-c-red-700);
  }

  // vertical & small
  &.iris-app-logo--size-small {
    padding: 0.25rem 0.5rem 0.5rem 0.5rem;

    .iris-app-logo__icon-container {
      padding-bottom: 0.25rem;
    }
  }

  // vertical & large
  &.iris-app-logo--size-large {
    padding: 0.75rem 1.5rem 1.5rem 1.5rem;

    .iris-app-logo__icon-container {
      padding: 0.5rem;
      margin-bottom: 1rem;
    }

    .iris-app-logo__content {
      text-align: center;
    }

    .iris-app-logo__label {
      padding-bottom: 0.25rem;
    }
  }
}

// Horizontal
.iris-app-logo--variant-horizontal {
  // Horizontal & Large
  &.iris-app-logo--size-large {
    padding: 1.5rem 1.5rem 1.5rem 1rem;
    flex-direction: row;

    .iris-app-logo__icon-container {
      border-right: 2px solid var(--dsmu-c-red-700);
      padding-right: 1rem;
      margin-right: 1rem;
    }

    .iris-app-logo__label {
      flex: 1;
      text-align: left;
    }
  }

  // Horizontal & Small
  &.iris-app-logo--size-small {
    padding: 0.25rem 0.5rem 0.25rem 0rem;
    flex-direction: row-reverse;

    .iris-app-logo__icon-container {
      border-left: 0.125rem solid var(--dsmu-c-red-700);
      padding-left: 0.5rem;
    }

    .iris-app-logo__label {
      flex: 1;
      text-align: left;
      padding-right: 1rem;
    }
  }
}

// Icon variant
.iris-app-logo--variant-icon {
  padding: 0.5rem;
  background-color: var(--dsmu-c-grey-25);
  border-bottom: 3px solid var(--dsmu-c-red-700);
  border-radius: var(--dsmu-radius-container);

  &.iris-app-logo--size-small {
    width: 48px;
    height: 48px;

    .iris-app-logo__icon {
      width: 32px;
      height: 32px;
    }
  }

  &.iris-app-logo--size-large {
    width: 64px;
    height: 64px;

    .iris-app-logo__icon {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
