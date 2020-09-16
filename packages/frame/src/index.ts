if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        const messageChannel = new MessageChannel();
        navigator.serviceWorker.controller?.postMessage(
          {
            type: 'INIT_PORT',
          },
          [messageChannel.port2],
        );

        // messageChannel.port1.onmessage = (event) => {
        //   console.log(event.data.payload);
        // };

        setInterval(() => {
          navigator.serviceWorker.controller?.postMessage({
            type: 'INCREASE_COUNT',
          });
        }, 1000);
      })
      .catch((registrationError) => {
        // eslint-disable-next-line no-console
        console.log('SW registration failed: ', registrationError);
      });
  });
}
