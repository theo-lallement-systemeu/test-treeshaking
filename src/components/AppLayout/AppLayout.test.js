import { render } from '@testing-library/vue';
import AppLayout from './AppLayout.vue';

test('default AppLayout', async () => {
  const { getByText } = render(AppLayout, {
    props: {
      appName: 'Dummy app',
      appDescription: 'Application description',
    },
    slots: {
      default: 'Some content in the main container',
    },
  });

  const appName = getByText('Dummy app');
  expect(appName).toBeInTheDocument();

  const appDescription = getByText('Application description');
  expect(appDescription).toBeInTheDocument();

  const mainContainer = getByText('Some content in the main container');
  expect(mainContainer).toBeInTheDocument();
});

test('AppLayout with sidebar', async () => {
  const { getByText, container } = render(AppLayout, {
    props: {
      appName: 'Dummy app',
    },
    slots: {
      default: 'Some content in the main container',
      sidebar: 'Some content in the sidebar',
    },
  });

  const mainContainer = getByText('Some content in the main container');
  expect(mainContainer).toBeInTheDocument();

  const sidebar = getByText('Some content in the sidebar');
  expect(sidebar).toBeInTheDocument();

  expect(container.children[0]).toHaveClass('iris-app-layout--with-sidebar');
});
