import type { Meta, StoryObj } from '@storybook/vue3';

import IrisAppLayout from './AppLayout.vue';
import IrisAppLogo from '../AppLogo/AppLogo.vue';
import IrisMenu from '../Menu/Menu.vue';
import IrisMenuItem from '../MenuItem/MenuItem.vue';
import IrisMenuSubMenu from '../MenuSubMenu/MenuSubMenu.vue';
import IrisDivider from '../Divider/Divider.vue';
import IrisCars from '../../assets/icons/cars.svg?component';

const meta: Meta<typeof IrisAppLayout> = {
  component: IrisAppLayout,
  title: 'Layout/AppLayout',
};
export default meta;

type Story = StoryObj<typeof IrisAppLayout>;

export const Basic: Story = {
  args: {
    appName: 'Dummy application',
    appDescription: 'Lorem ipsum dolor sit amet',
    user: {
      name: 'Johann Dubochant',
      pseudo: 'johann.dubochant',
      email: 'johann.dubochant@systeme-u.fr',
    },
    userAdditionalInfo: 'Big Data & décisionnel',
    sidebarTitle: 'SidebarTitle',
    sidebarDescription: 'SidebarDescription',
    icon: IrisCars,
    version: '1.0.0',
    fullheightEnd: 'md',
    collapseEnd: 'lg',
  },
  render: (args) => ({
    components: {
      IrisAppLayout,
      IrisAppLogo,
      IrisMenu,
      IrisMenuSubMenu,
      IrisMenuItem,
      IrisDivider,
    },
    setup() {
      const handleDisconnect = () => alert('Déconnexion !');
      const clickAppName = () => alert('Click on app name');
      const clickULogo = () => alert('Click on U logo');
      return {
        args,
        handleDisconnect,
        clickAppName,
        clickULogo,
      };
    },
    template: `
    <IrisAppLayout v-bind="args" @disconnect="handleDisconnect" @clickSidebarLogo="clickSidebarLogo">
      <template #userAdditionalInfo v-if='args.userAdditionalInfo'>
        {{ args.userAdditionalInfo }}
      </template>
      <template #sidebar>
        <iris-menu :active-item="activeItem" @select="handleSelectionChange">
          <iris-menu-item id="menu-1" icon="PhAddressBook" title="Menu 1" />
          <iris-menu-item id="menu-2" icon="PhAlien" title="Menu 2" />
          <iris-divider margin-size="md"/>
          <iris-menu-sub-menu id="sub-menu-1" icon='PhGear' title="Sous Menu 1">
              <iris-menu-item id="menu-11" icon="PhAlien" title="Menu 1-1" />
              <iris-menu-item id="menu-12" title="Menu 1-2" />
          </iris-menu-sub-menu>
        </iris-menu>
      </template>
      <p>
        Sed ac arcu at velit placerat maximus vel ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dictum molestie quam, a vehicula ipsum. Suspendisse eget feugiat turpis. Aliquam convallis tristique metus vel tempor. Donec hendrerit blandit arcu. Proin ac porta sem. Phasellus iaculis, eros eu ultrices sodales, ex lectus vehicula tortor, et venenatis libero lacus non leo. In a magna enim. Morbi tincidunt elit orci, vel viverra purus condimentum ut. Ut ut libero nec ligula malesuada feugiat a sit amet diam. Pellentesque et ipsum ac elit feugiat posuere. Ut feugiat mi convallis mollis tempor. Aenean felis leo, volutpat vitae molestie eget, iaculis vel est.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, pariatur
        at! Quae consequatur quisquam cumque asperiores quam optio eaque
        cupiditate, obcaecati commodi expedita error doloribus adipisci tempore
        veritatis minus tenetur.
      </p>
      <p>
        Sed ac arcu at velit placerat maximus vel ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dictum molestie quam, a vehicula ipsum. Suspendisse eget feugiat turpis. Aliquam convallis tristique metus vel tempor. Donec hendrerit blandit arcu. Proin ac porta sem. Phasellus iaculis, eros eu ultrices sodales, ex lectus vehicula tortor, et venenatis libero lacus non leo. In a magna enim. Morbi tincidunt elit orci, vel viverra purus condimentum ut. Ut ut libero nec ligula malesuada feugiat a sit amet diam. Pellentesque et ipsum ac elit feugiat posuere. Ut feugiat mi convallis mollis tempor. Aenean felis leo, volutpat vitae molestie eget, iaculis vel est.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, pariatur
        at! Quae consequatur quisquam cumque asperiores quam optio eaque
        cupiditate, obcaecati commodi expedita error doloribus adipisci tempore
        veritatis minus tenetur.
      </p>
    </IrisAppLayout>
`,
  }),
  parameters: {
    chromatic: { viewports: [599, 799, 1199, 1799, 2000] },
    layout: 'fullscreen',
    slots: {
      default: "Contenu de l'application",
    },
    docs: {
      source: {
        code: `
<iris-app-layout
  appName="With side menu"
  appDescription="Lorem ipsum dolor sit amet"
  :user="{
    name: 'Johann Dubochant',
    pseudo: 'johann.dubochant',
    email: 'johann.dubochant@systeme-u.fr',
  }"
  @disconnect="handleDisconnect"
  @clickAppName="handleClick"
  :icon="IrisCars"
  sidebar-title="Application Name"
  sidebar-description="Application Description"
  version= "1.0.0"
>
  <template #userAdditionalInfo>
    Big Data & décisionnel
  </template>
  <template #sidebar>
    <iris-menu :active-item="activeItem" @select="handleSelectionChange">
      <iris-menu-item id="menu-1" icon="PhAddressBook" title="Menu 1" />
      <iris-menu-item id="menu-2" icon="PhAlien" title="Menu 2" />
      <iris-divider margin-size="md"/>
      <iris-menu-sub-menu id="sub-menu-1" title="Sous Menu 1">
          <iris-menu-item id="menu-11" icon="PhAlien" title="Menu 1-1" />
          <iris-menu-item id="menu-12" title="Menu 1-2" />
      </iris-menu-sub-menu>
    </iris-menu>
  </template>
  Lorem ipsum dolor sit amet...
</iris-app-layout>
        `,
      },
    },
  },
};

export const WithoutSidebar: Story = {
  ...Basic,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `
        <iris-app-layout
  appName="App name"
  appDescription="Lorem ipsum dolor sit amet"
  :user="{
    name: 'Johann Dubochant',
    pseudo: 'johann.dubochant',
    email: 'johann.dubochant@systeme-u.fr',
  }"
  @disconnect="handleDisconnect"
  @clickAppName="handleClickAppName"
  @clickULogo="handleClickULogo"
>
  ...
</iris-app-layout>
 `,
      },
    },
  },
  render: (args) => ({
    components: { IrisAppLayout, IrisAppLogo, IrisMenu, IrisCars },
    setup() {
      const handleDisconnect = () => alert('Déconnexion !');
      const clickAppName = () => alert('Click on app name');
      const clickULogo = () => alert('Click on U logo');
      return {
        args,
        handleDisconnect,
        clickAppName,
        clickULogo,
      };
    },
    template: `
<iris-app-layout v-bind="args" @disconnect="handleDisconnect" @clickAppName="clickAppName" @clickULogo="handleDisconnect" @clickSidebarLogo="clickSidebarLogo">
  <p>
    Sed ac arcu at velit placerat maximus vel ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dictum molestie quam, a vehicula ipsum. Suspendisse eget feugiat turpis. Aliquam convallis tristique metus vel tempor. Donec hendrerit blandit arcu. Proin ac porta sem. Phasellus iaculis, eros eu ultrices sodales, ex lectus vehicula tortor, et venenatis libero lacus non leo. In a magna enim. Morbi tincidunt elit orci, vel viverra purus condimentum ut. Ut ut libero nec ligula malesuada feugiat a sit amet diam. Pellentesque et ipsum ac elit feugiat posuere. Ut feugiat mi convallis mollis tempor. Aenean felis leo, volutpat vitae molestie eget, iaculis vel est.
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, pariatur
    at! Quae consequatur quisquam cumque asperiores quam optio eaque
    cupiditate, obcaecati commodi expedita error doloribus adipisci tempore
    veritatis minus tenetur.
  </p>
  <p>
    Sed ac arcu at velit placerat maximus vel ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dictum molestie quam, a vehicula ipsum. Suspendisse eget feugiat turpis. Aliquam convallis tristique metus vel tempor. Donec hendrerit blandit arcu. Proin ac porta sem. Phasellus iaculis, eros eu ultrices sodales, ex lectus vehicula tortor, et venenatis libero lacus non leo. In a magna enim. Morbi tincidunt elit orci, vel viverra purus condimentum ut. Ut ut libero nec ligula malesuada feugiat a sit amet diam. Pellentesque et ipsum ac elit feugiat posuere. Ut feugiat mi convallis mollis tempor. Aenean felis leo, volutpat vitae molestie eget, iaculis vel est.
  </p>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, pariatur
    at! Quae consequatur quisquam cumque asperiores quam optio eaque
    cupiditate, obcaecati commodi expedita error doloribus adipisci tempore
    veritatis minus tenetur.
  </p>
</iris-app-layout>
`,
  }),
};
