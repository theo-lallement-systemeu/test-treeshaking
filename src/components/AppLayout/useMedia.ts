import { ref, watchEffect } from 'vue';

const useMedia = (query: string) => {
  const matches = ref(true);

  watchEffect((onInvalidate) => {
    const media = window.matchMedia(query);

    if (media.matches !== matches.value) {
      matches.value = media.matches;
    }

    const onChange = () => {
      matches.value = media.matches;
    };

    media.addEventListener('change', onChange);

    onInvalidate(() => {
      media.removeEventListener('change', onChange);
    });
  });

  return matches;
};

export default useMedia;
