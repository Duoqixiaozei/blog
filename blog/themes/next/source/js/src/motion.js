$(document)
  .on('sidebar.isShowing', function() {
    NexT.utils.isDesktop() && $('body').velocity('stop').velocity(
     {paddingLeft: SIDEBAR_WIDTH},
      SIDEBAR_DISPLAY_DURATION
    );
  })
  .on('sidebar.isHiding', function() {
  });
  ...
  hideSidebar: function() {
   NexT.utils.isDesktop() && $('body').velocity('stop').velocity({paddingLeft: 0});
    this.sidebarEl.find('.motion-element').velocity('stop').css('display', 'none');
    this.sidebarEl.velocity('stop').velocity({width: 0}, {display: 'none'});

    sidebarToggleLines.init();
    ...
}