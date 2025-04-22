const Scripts = () => (
  <>
    <script
      id="announcement-prefetch"
      dangerouslySetInnerHTML={{
        __html: `
          try {
              var dismissed = JSON.parse(localStorage.getItem('announcement-bar'))?.state?.dismissed;
              if (dismissed) {
                const st = document.createElement('style');
                st.id = 'hide-announcement';
                st.textContent = '#announcement-bar{display:none}';
                document.head.appendChild(st);
              }
          } catch (_) {}
        `,
      }}
    />
  </>
);

export default Scripts;
