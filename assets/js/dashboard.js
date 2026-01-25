document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const tabletSidebarToggle = document.getElementById('tabletSidebarToggle');
    const pageTitle = document.getElementById('pageTitle');
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-tab]');

    // Initialize sidebar state based on screen size//650 changed to 800
    function initializeSidebarState() {
        if (window.innerWidth >= 800 && window.innerWidth <= 1050) {
            // Tablet mode - desktop layout maintained
            sidebar.classList.remove('collapsed', 'expanded', 'show');
            if (tabletSidebarToggle) {
                tabletSidebarToggle.style.display = 'none';
            }
        } else if (window.innerWidth < 800) {
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
        if (window.innerWidth < 650 &&
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

            // Close mobile sidebar after selecting a tab//650 changed to 800
            if (window.innerWidth < 800) {
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

    // Status filter functionality for orders
    initializeStatusFilters();
});

function initializeStatusFilters() {
    // Handle desktop button group clicks
    const statusButtons = document.querySelectorAll('[data-status]');
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const buttonGroup = this.closest('.btn-group');
            if (buttonGroup) {
                buttonGroup.querySelectorAll('.btn').forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('btn-secondary');
                    btn.classList.add('btn-outline-secondary');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-secondary');
            }
            
            // Filter orders based on status
            filterOrders(this.getAttribute('data-status'));
        });
    });

    // Handle mobile dropdown clicks
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-status]');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update dropdown label
            const statusLabel = document.getElementById('statusLabel');
            if (statusLabel) {
                statusLabel.textContent = this.textContent;
            }
            
            // Update active state in dropdown
            const dropdown = this.closest('.dropdown-menu');
            if (dropdown) {
                dropdown.querySelectorAll('.dropdown-item').forEach(dropdownItem => {
                    dropdownItem.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            // Filter orders based on status
            filterOrders(this.getAttribute('data-status'));
        });
    });
}

function filterOrders(status) {
    const orderCards = document.querySelectorAll('.order-card');
    
    orderCards.forEach(card => {
        const badge = card.querySelector('.badge');
        if (badge) {
            const badgeText = badge.textContent.toLowerCase();
            
            if (status === 'all') {
                card.style.display = '';
            } else if (status === 'pending' && badgeText.includes('pending')) {
                card.style.display = '';
            } else if (status === 'processing' && (badgeText.includes('processing') || badgeText.includes('progress'))) {
                card.style.display = '';
            } else if (status === 'completed' && badgeText.includes('completed')) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
}
