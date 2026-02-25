document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const filterOverlay = document.getElementById('filterOverlay');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const clearAllFilters = document.getElementById('clearAllFilters');
    const activeFilters = document.getElementById('activeFilters');
    const activeFiltersList = document.getElementById('activeFiltersList');
    const activeFilterCount = document.getElementById('activeFilterCount');
    
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.getElementById('productsGrid');
    const sortSelect = document.getElementById('sortSelect');
    
    // View Toggle Elements
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    
    // Filter state
    let activeFiltersState = {
        categories: [],
        brands: [],
        price: { min: null, max: null },
        rating: null,
        discount: []
    };
    
    // View Toggle Functionality
    if (viewToggleBtns.length > 0) {
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.dataset.view;
                
                // Update active button
                viewToggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update grid view
                if (view === 'grid') {
                    productsGrid.classList.remove('products-grid--list');
                    productsGrid.classList.add('products-grid--grid');
                    productsGrid.dataset.view = 'grid';
                } else {
                    productsGrid.classList.remove('products-grid--grid');
                    productsGrid.classList.add('products-grid--list');
                    productsGrid.dataset.view = 'list';
                }
            });
        });
    }
    
    // Toggle mobile sidebar
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', function() {
            filterSidebar.classList.add('active');
            filterOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeSidebar);
    }
    
    function closeSidebar() {
        filterSidebar.classList.remove('active');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Price preset buttons
    document.querySelectorAll('.price-preset').forEach(btn => {
        btn.addEventListener('click', function() {
            const min = this.dataset.min;
            const max = this.dataset.max;
            document.getElementById('priceMin').value = min;
            document.getElementById('priceMax').value = max;
            
            // Highlight active preset
            document.querySelectorAll('.price-preset').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Apply filters
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            collectFilters();
            filterProducts();
            updateActiveFiltersDisplay();
            closeSidebar();
        });
    }
    
    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetAllFilters();
        });
    }
    
    if (clearAllFilters) {
        clearAllFilters.addEventListener('click', function() {
            resetAllFilters();
        });
    }
    
    // Collect filter values
    function collectFilters() {
        // Categories
        activeFiltersState.categories = [];
        document.querySelectorAll('input[name="category"]:checked').forEach(cb => {
            activeFiltersState.categories.push(cb.value);
        });
        
        // Brands
        activeFiltersState.brands = [];
        document.querySelectorAll('input[name="brand"]:checked').forEach(cb => {
            activeFiltersState.brands.push(cb.value);
        });
        
        // Price
        const priceMin = document.getElementById('priceMin').value;
        const priceMax = document.getElementById('priceMax').value;
        activeFiltersState.price.min = priceMin ? parseFloat(priceMin) : null;
        activeFiltersState.price.max = priceMax ? parseFloat(priceMax) : null;
        
        // Rating
        const ratingChecked = document.querySelector('input[name="rating"]:checked');
        activeFiltersState.rating = ratingChecked ? parseInt(ratingChecked.value) : null;
        
        // Discount
        activeFiltersState.discount = [];
        document.querySelectorAll('input[name="discount"]:checked').forEach(cb => {
            activeFiltersState.discount.push(cb.value);
        });
    }
    
    // Filter products
    function filterProducts() {
        productCards.forEach(card => {
            let showCard = true;
            
            // Category filter
            if (activeFiltersState.categories.length > 0) {
                const cardCategory = card.dataset.category;
                if (!activeFiltersState.categories.includes(cardCategory)) {
                    showCard = false;
                }
            }
            
            // Brand filter
            if (showCard && activeFiltersState.brands.length > 0) {
                const cardBrand = card.dataset.brand;
                if (!activeFiltersState.brands.includes(cardBrand)) {
                    showCard = false;
                }
            }
            
            // Price filter
            if (showCard) {
                const cardPrice = parseFloat(card.dataset.price);
                if (activeFiltersState.price.min !== null && cardPrice < activeFiltersState.price.min) {
                    showCard = false;
                }
                if (activeFiltersState.price.max !== null && cardPrice > activeFiltersState.price.max) {
                    showCard = false;
                }
            }
            
            // Rating filter
            if (showCard && activeFiltersState.rating !== null) {
                const cardRating = parseInt(card.dataset.rating);
                if (cardRating < activeFiltersState.rating) {
                    showCard = false;
                }
            }
            
            // Discount filter
            if (showCard && activeFiltersState.discount.length > 0) {
                if (activeFiltersState.discount.includes('sale') && !card.dataset.discount) {
                    showCard = false;
                }
            }
            
            // Show/hide card
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Check if any products visible
        checkEmptyState();
    }
    
    // Check if no products visible
    function checkEmptyState() {
        const visibleCards = Array.from(productCards).filter(card => card.style.display !== 'none');
        const emptyState = document.querySelector('.products-empty');
        
        if (visibleCards.length === 0 && !emptyState) {
            // Create empty state
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'products-empty';
            emptyDiv.innerHTML = `
                <i class="bi bi-filter"></i>
                <h3>No products match your filters</h3>
                <p>Try adjusting your filter criteria</p>
                <button class="products-empty-btn" id="clearFiltersFromEmpty">Clear All Filters</button>
            `;
            productsGrid.appendChild(emptyDiv);
            
            document.getElementById('clearFiltersFromEmpty')?.addEventListener('click', resetAllFilters);
        } else if (visibleCards.length > 0 && emptyState) {
            emptyState.remove();
        }
    }
    
    // Update active filters display
    function updateActiveFiltersDisplay() {
        const filterCount = 
            activeFiltersState.categories.length + 
            activeFiltersState.brands.length + 
            (activeFiltersState.price.min || activeFiltersState.price.max ? 1 : 0) +
            (activeFiltersState.rating ? 1 : 0) +
            activeFiltersState.discount.length;
        
        if (filterCount > 0) {
            activeFilters.style.display = 'block';
            activeFilterCount.style.display = 'inline';
            activeFilterCount.textContent = filterCount;
            
            // Build active filters list
            let html = '';
            
            activeFiltersState.categories.forEach(cat => {
                html += `<span class="active-filter">${cat} <i class="bi bi-x" data-filter="category" data-value="${cat}"></i></span>`;
            });
            
            activeFiltersState.brands.forEach(brand => {
                html += `<span class="active-filter">${brand} <i class="bi bi-x" data-filter="brand" data-value="${brand}"></i></span>`;
            });
            
            if (activeFiltersState.price.min || activeFiltersState.price.max) {
                let priceText = 'Price: ';
                if (activeFiltersState.price.min) priceText += `$${activeFiltersState.price.min}`;
                priceText += '-';
                if (activeFiltersState.price.max) priceText += `$${activeFiltersState.price.max}`;
                html += `<span class="active-filter">${priceText} <i class="bi bi-x" data-filter="price"></i></span>`;
            }
            
            if (activeFiltersState.rating) {
                html += `<span class="active-filter">${activeFiltersState.rating}+ Stars <i class="bi bi-x" data-filter="rating"></i></span>`;
            }
            
            activeFiltersList.innerHTML = html;
            
            // Add remove event listeners
            document.querySelectorAll('.active-filter i').forEach(icon => {
                icon.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    const value = this.dataset.value;
                    removeFilter(filter, value);
                });
            });
        } else {
            activeFilters.style.display = 'none';
            activeFilterCount.style.display = 'none';
        }
    }
    
    // Remove specific filter
    function removeFilter(filter, value) {
        switch(filter) {
            case 'category':
                document.querySelectorAll(`input[name="category"][value="${value}"]`).forEach(cb => cb.checked = false);
                activeFiltersState.categories = activeFiltersState.categories.filter(v => v !== value);
                break;
            case 'brand':
                document.querySelectorAll(`input[name="brand"][value="${value}"]`).forEach(cb => cb.checked = false);
                activeFiltersState.brands = activeFiltersState.brands.filter(v => v !== value);
                break;
            case 'price':
                document.getElementById('priceMin').value = '';
                document.getElementById('priceMax').value = '';
                activeFiltersState.price = { min: null, max: null };
                break;
            case 'rating':
                document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
                activeFiltersState.rating = null;
                break;
        }
        filterProducts();
        updateActiveFiltersDisplay();
    }
    
    // Reset all filters
    function resetAllFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        
        // Clear price inputs
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        
        // Reset active filters state
        activeFiltersState = {
            categories: [],
            brands: [],
            price: { min: null, max: null },
            rating: null,
            discount: []
        };
        
        // Show all products
        productCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Remove empty state if exists
        const emptyState = document.querySelector('.products-empty');
        if (emptyState && emptyState.querySelector('i.bi-filter')) {
            emptyState.remove();
        }
        
        updateActiveFiltersDisplay();
    }
    
    // Sort products
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const products = Array.from(productCards).filter(card => card.style.display !== 'none');
            
            products.sort((a, b) => {
                switch(sortValue) {
                    case 'price-low':
                        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                    case 'price-high':
                        return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                    case 'rating':
                        return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
                    case 'newest':
                        return 0; // Would need date data
                    default:
                        return 0;
                }
            });
            
            // Reorder in DOM
            products.forEach(product => {
                productsGrid.appendChild(product);
            });
        });
    }
});
