import IrisCars from '../../assets/icons/cars.svg';
import IrisAppLogo from './AppLogo.vue';

export default {
  title: 'Visual elements/AppLogo',
  component: IrisAppLogo,
  argTypes: {
    variant: {
      options: ['horizontal', 'vertical', 'icon'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' },
    },
    icon: {
      control: 'hidden',
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { IrisAppLogo },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: '<iris-app-logo v-bind="args" />',
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: { code: '<iris-app-logo v-bind="args" />' },
  },
};
Default.args = {
  icon: IrisCars,
  label: 'App label',
  description: 'App description',
  variant: 'vertical',
  size: 'large',
};
