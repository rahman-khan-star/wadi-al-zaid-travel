/* ============================================
   WADI AL ZAID ADMIN - SHARED COMPONENTS JS
   ============================================ */

const WZ = {
  // === SIDEBAR ===
  initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    if (!sidebar) return;

    const styles = getComputedStyle(document.documentElement);
    const sidebarWidth = styles.getPropertyValue('--sidebar-width').trim() || '280px';
    const collapsedWidth = styles.getPropertyValue('--sidebar-collapsed-width').trim() || '80px';

    const toggle = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        sidebar.classList.toggle('mobile-open');
        overlay?.classList.toggle('show');
      } else {
        sidebar.classList.toggle('collapsed');
        if (mainContent) {
          mainContent.style.marginLeft = sidebar.classList.contains('collapsed') ? collapsedWidth : sidebarWidth;
        }
      }
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    };

    window.toggleSidebar = toggle;

    overlay?.addEventListener('click', toggle);

    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved === 'true' && window.innerWidth >= 1024) {
      sidebar.classList.add('collapsed');
      if (mainContent) mainContent.style.marginLeft = collapsedWidth;
    } else if (mainContent && window.innerWidth >= 1024) {
      mainContent.style.marginLeft = sidebarWidth;
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove('mobile-open');
        overlay?.classList.remove('show');
        if (mainContent) {
          mainContent.style.marginLeft = sidebar.classList.contains('collapsed') ? collapsedWidth : sidebarWidth;
        }
      } else {
        if (mainContent) mainContent.style.marginLeft = '0';
      }
    });
  },

  // === TOAST NOTIFICATIONS ===
  toast(message, type = 'success', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('role', 'alert');
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-times-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    const colors = {
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="${icons[type]} toast-icon" style="color:${colors[type]}"></i>
      <span class="toast-message">${message}</span>
      <i class="fas fa-times toast-close" onclick="this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300)"></i>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // === FADE-UP ANIMATIONS ===
  initFadeUp() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  },

  // === MODALS ===
  openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  },

  // === DRAWERS ===
  openDrawer(id) {
    const drawer = document.getElementById(id);
    const overlay = document.getElementById(id + 'Overlay');
    if (!drawer) return;
    drawer.classList.add('show');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer(id) {
    const drawer = document.getElementById(id);
    const overlay = document.getElementById(id + 'Overlay');
    if (!drawer) return;
    drawer.classList.remove('show');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  },

  // === TABS ===
  initTabs(containerSelector) {
    const containers = containerSelector ? document.querySelectorAll(containerSelector) : document.querySelectorAll('.tabs');
    containers.forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('.tab-btn');
      const groupId = tabsContainer.dataset.group;
      const contents = document.querySelectorAll(`.tab-content[data-group="${groupId}"]`);

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          const target = document.getElementById(btn.dataset.tab);
          if (target) target.classList.add('active');
        });
      });
    });
  },

  // === ACCORDIONS ===
  initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasOpen = item.classList.contains('open');
        item.closest('.accordion')?.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  },

  // === TABLE PAGINATION ===
  paginate(data, page, perPage) {
    const total = data.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const items = data.slice(start, start + perPage);
    return { items, total, totalPages, page, perPage, start: start + 1, end: Math.min(start + perPage, total) };
  },

  renderPagination(containerId, currentPage, totalPages, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '<div class="pagination-controls">';
    html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${callback}(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;

    const range = [];
    const delta = 2;
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage > delta + 2) range.unshift('...');
    if (currentPage < totalPages - delta - 1) range.push('...');
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    range.forEach(p => {
      if (p === '...') {
        html += `<span class="pagination-btn" style="cursor:default;border:none">...</span>`;
      } else {
        html += `<button class="pagination-btn ${p === currentPage ? 'active' : ''}" onclick="${callback}(${p})">${p}</button>`;
      }
    });

    html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${callback}(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
    html += '</div>';
    container.innerHTML = html;
  },

  // === SEARCH / FILTER ===
  filterData(data, search, filters = {}) {
    let result = [...data];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(q)
        )
      );
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => String(item[key]).toLowerCase() === String(value).toLowerCase());
      }
    });
    return result;
  },

  // === CONFIRM MODAL ===
  confirm({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', onConfirm }) {
    const typeMap = {
      danger: { icon: 'fas fa-exclamation-triangle', iconClass: 'confirm-icon-danger', btnClass: 'btn-danger' },
      warning: { icon: 'fas fa-exclamation-triangle', iconClass: 'confirm-icon-warning', btnClass: 'btn-primary' },
      success: { icon: 'fas fa-check', iconClass: 'confirm-icon-success', btnClass: 'btn-success' },
      info: { icon: 'fas fa-info', iconClass: 'confirm-icon-info', btnClass: 'btn-primary' }
    };
    const t = typeMap[type] || typeMap.danger;

    const existing = document.getElementById('wz-confirm-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'wz-confirm-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content modal-sm">
        <div class="modal-body text-center" style="padding:32px">
          <div class="confirm-icon ${t.iconClass}"><i class="${t.icon}"></i></div>
          <h3 style="font-size:18px;font-weight:700;color:#0f1d3a;margin-bottom:8px">${title}</h3>
          <p style="font-size:14px;color:#6b7280;margin-bottom:24px;line-height:1.6">${message}</p>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-secondary" onclick="WZ.closeModal('wz-confirm-modal')">${cancelText}</button>
            <button class="btn ${t.btnClass}" id="wz-confirm-btn">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#wz-confirm-btn').addEventListener('click', () => {
      onConfirm?.();
      WZ.closeModal('wz-confirm-modal');
    });
    requestAnimationFrame(() => WZ.openModal('wz-confirm-modal'));
  },

  // === LOADING SKELETON ===
  skeleton(type = 'text', count = 1) {
    const templates = {
      text: '<div class="skeleton skeleton-text" style="width:${w}%"></div>',
      heading: '<div class="skeleton skeleton-heading"></div>',
      avatar: '<div class="skeleton skeleton-avatar"></div>',
      card: '<div class="skeleton skeleton-card"></div>',
      btn: '<div class="skeleton skeleton-btn"></div>',
      badge: '<div class="skeleton skeleton-badge"></div>',
      row: '<div class="skeleton-row"><div class="skeleton skeleton-avatar"></div><div class="skeleton-row-content"><div class="skeleton skeleton-text" style="width:70%"></div><div class="skeleton skeleton-text-sm"></div></div></div>',
      tableRow: '<div class="skeleton-table-row"><div class="skeleton skeleton-text" style="width:5%"></div><div class="skeleton skeleton-text" style="width:15%"></div><div class="skeleton skeleton-text" style="width:20%"></div><div class="skeleton skeleton-text" style="width:12%"></div><div class="skeleton skeleton-text" style="width:10%"></div><div class="skeleton skeleton-badge"></div><div class="skeleton skeleton-text" style="width:8%"></div></div>',
      tableHeader: '<div class="skeleton-table-header"><div class="skeleton skeleton-text" style="width:5%"></div><div class="skeleton skeleton-text" style="width:15%"></div><div class="skeleton skeleton-text" style="width:20%"></div><div class="skeleton skeleton-text" style="width:12%"></div><div class="skeleton skeleton-text" style="width:10%"></div><div class="skeleton skeleton-text" style="width:8%"></div><div class="skeleton skeleton-text" style="width:8%"></div></div>'
    };
    const widths = [90, 75, 85, 60, 95, 70, 80];
    let html = '';
    for (let i = 0; i < count; i++) {
      const w = widths[i % widths.length];
      html += (templates[type] || templates.text).replace('${w}', w);
    }
    return html;
  },

  // === EMPTY STATE ===
  emptyState({ icon = 'fas fa-inbox', title = 'No data found', message = 'There are no items to display yet.', actionText, actionClass, actionId } = {}) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon empty-state-icon-default"><i class="${icon}"></i></div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-desc">${message}</p>
        ${actionText ? `<button class="btn ${actionClass || 'btn-primary'}" ${actionId ? `id="${actionId}"` : ''}><i class="fas fa-plus"></i> ${actionText}</button>` : ''}
      </div>
    `;
  },

  // === ERROR STATE ===
  errorState({ title = 'Something went wrong', message = 'An unexpected error occurred. Please try again.', retryText = 'Try Again', onRetry } = {}) {
    const id = 'error-retry-' + Date.now();
    setTimeout(() => {
      const btn = document.getElementById(id);
      if (btn && onRetry) btn.addEventListener('click', onRetry);
    }, 0);
    return `
      <div class="error-state">
        <div class="error-state-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <h3 class="error-state-title">${title}</h3>
        <p class="error-state-desc">${message}</p>
        <button class="btn btn-primary" id="${id}"><i class="fas fa-redo"></i> ${retryText}</button>
      </div>
    `;
  },

  // === CHART DEFAULTS ===
  chartDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.plugins.tooltip.backgroundColor = '#0f1d3a';
    Chart.defaults.plugins.tooltip.titleFont = { weight: '600', size: 13 };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.displayColors = false;
    Chart.defaults.elements.bar.borderRadius = 6;
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 5;
    Chart.defaults.elements.line.tension = 0.4;
    Chart.defaults.scale.grid = { color: '#f3f4f6' };
    Chart.defaults.scale.border = { display: false };
  },

  // === KEYBOARD NAVIGATION ===
  initA11y() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.show');
        if (openModal) {
          const id = openModal.id;
          WZ.closeModal(id);
          return;
        }
        const openDrawer = document.querySelector('.drawer.show');
        if (openDrawer) {
          const id = openDrawer.id;
          WZ.closeDrawer(id);
          return;
        }
      }
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) WZ.closeModal(modal.id);
      });
    });
  },

  // === CLOSE DROPDOWNS ON OUTSIDE CLICK ===
  initDropdowns() {
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        if (!menu.parentElement.contains(e.target)) {
          menu.classList.remove('show');
        }
      });
    });
  },

  // === FORMAT HELPERS ===
  formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  },

  formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  timeAgo(dateStr) {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  },

  // === INIT ALL ===
  init() {
    this.initSidebar();
    this.initFadeUp();
    this.initTabs();
    this.initAccordions();
    this.initA11y();
    this.initDropdowns();
    if (typeof Chart !== 'undefined') this.chartDefaults();
  }
};

document.addEventListener('DOMContentLoaded', () => WZ.init());
