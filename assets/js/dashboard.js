document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const tabletSidebarToggle = document.getElementById('tabletSidebarToggle');
    const pageTitle = document.getElementById('pageTitle');
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-tab]');

    // Initialize sidebar state based on screen size
    function initializeSidebarState() {
        if (window.innerWidth >= 768 && window.innerWidth <= 991.98) {
            // Tablet mode - start collapsed
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded', 'show');
            if (tabletSidebarToggle) {
                tabletSidebarToggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
            }
        } else if (window.innerWidth < 768) {
            // Mobile mode - start hidden
            sidebar.classList.remove('collapsed', 'expanded', 'show');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('show');
            }
        } else {
            // Desktop mode - always visible
            sidebar.classList.remove('collapsed', 'expanded', 'show');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('show');
            }
        }
    }

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeSidebarState();
        }, 250);
    });

    // Mobile sidebar toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isVisible = sidebar.classList.contains('show');
            
            if (isVisible) {
                sidebar.classList.remove('show');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('show');
                }
            } else {
                sidebar.classList.add('show');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.add('show');
                }
            }
        });
    }

    // Tablet sidebar toggle
    if (tabletSidebarToggle && sidebar) {
        tabletSidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            if (isCollapsed) {
                sidebar.classList.remove('collapsed');
                sidebar.classList.add('expanded');
                tabletSidebarToggle.innerHTML = '<i class="bi bi-chevron-left"></i>';
            } else {
                sidebar.classList.remove('expanded');
                sidebar.classList.add('collapsed');
                tabletSidebarToggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
            }
        });
    }

    // Mobile overlay click to close
    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 &&
            sidebar.classList.contains('show') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle?.contains(e.target) &&
            !sidebarOverlay?.contains(e.target)) {
            sidebar.classList.remove('show');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('show');
            }
        }
    });

    
    // Initialize on load
    initializeSidebarState();

    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            initializeSidebarState();
        }, 100);
    });

    // Tab switching and heading update functionality
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all sidebar links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get tab name from data-tab attribute
            const tabName = link.getAttribute('data-tab');
            
            // Update page heading
            if (pageTitle) {
                pageTitle.textContent = link.textContent.trim();
            }
            
            // Show corresponding tab content
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // Show selected tab pane
                tabContent.classList.add('show', 'active');
            }

            // Close mobile sidebar after selecting a tab
            if (window.innerWidth < 768) {
                sidebar.classList.remove('show');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('show');
                }
            }
        });
    });

    // Initialize Tooltips/Popovers if using Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});
