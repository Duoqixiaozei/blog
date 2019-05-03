{% if theme.busuanzi_count.enable %}
<div class="busuanzi-count">
  <script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

  {% if theme.busuanzi_count.total_visitors %}
    <span class="post-meta-item-icon">
     <span class="site-uv">
     {{ __('footer.total_visitors', '<span class="busuanzi-value" id="busuanzi_value_site_uv"></span>') }}
      
    </span>
  {% endif %}

  {% if theme.busuanzi_count.total_visitors and theme.busuanzi_count.total_views %}
    <span class="post-meta-divider">|</span>
  {% endif %}

  {% if theme.busuanzi_count.total_views %}
    <span class="post-meta-item-icon">
      
    </span>
    <span class="site-pv">
     {{ __('footer.total_views', '<span class="busuanzi-value" id="busuanzi_value_site_pv"></span>') }}
      
    </span>
  {% endif %}
</div>
{% endif %}
