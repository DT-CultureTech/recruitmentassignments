/**
 * General Purpose Project Tracker - App Logic
 * Vanilla JavaScript implementation
 */

const CONFIG = {
    appName: 'ProjectOS',
    logoText: 'TRACKER',
    browserTitle: 'Project OS | DeepThought',
    vAxis: {
        name: 'Vertical',
        prefix: 'V',
        levels: ['Individual', 'Team', 'Dept', 'Division', 'Org']
    },
    hAxis: {
        name: 'Horizontal',
        prefix: 'H',
        levels: ['Define', 'Develop', 'Validate', 'Execute', 'Scale']
    },
    storageKey: 'project_tracker_data'
};

// --- State Management ---
const State = {
    items: [],
    currentView: 'grid',
    searchQuery: '',
    vFilter: 'all',

    init() {
        const saved = localStorage.getItem(CONFIG.storageKey);
        if (saved) {
            this.items = JSON.parse(saved);
        } else {
            this.items = window.SEED_DATA || [];
            this.save();
        }
    },

    save() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(this.items));
    },

    addItem(item) {
        this.items.push({
            ...item,
            id: 'item-' + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now()
        });
        this.save();
        UI.notify('Item created successfully');
        UI.render();
    },

    updateItem(id, updates) {
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updates };
            this.save();
            UI.render();
        }
    },

    deleteItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
        UI.notify('Item deleted', 'danger');
        UI.render();
    }
};

// --- UI Logic ---
const UI = {
    elements: {
        viewContainer: document.getElementById('viewContainer'),
        navItems: document.querySelectorAll('.nav-item'),
        btnCreate: document.getElementById('btnCreate'),
        modalOverlay: document.getElementById('modalOverlay'),
        btnCloseModal: document.getElementById('btnCloseModal'),
        createForm: document.getElementById('createForm'),
        itemType: document.getElementById('itemType'),
        globalSearch: document.getElementById('globalSearch'),
        detailPanel: document.getElementById('detailPanel'),
        detailContent: document.getElementById('detailContent'),
        btnClosePanel: document.getElementById('btnClosePanel'),
        toastContainer: document.getElementById('toastContainer'),
        itemContent: document.getElementById('itemContent'),
        charCount: document.getElementById('charCount')
    },

    init() {
        // App Identity Initialization
        document.title = CONFIG.browserTitle;
        const logoText = document.querySelector('.logo-text');
        if (logoText) logoText.innerText = CONFIG.logoText;

        // Dynamic form labels
        const vLabel = document.querySelector('label[for="vLayer"]');
        const hLabel = document.querySelector('label[for="hStage"]');
        if (vLabel) vLabel.innerText = `${CONFIG.vAxis.name} (${CONFIG.vAxis.prefix})`;
        if (hLabel) hLabel.innerText = `${CONFIG.hAxis.name} (${CONFIG.hAxis.prefix})`;

        // Dynamic form options
        this.updateAxisSelectors();

        // Nav switching
        this.elements.navItems.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.navItems.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                State.currentView = btn.dataset.view;
                this.render();
            });
        });

        // Search
        this.elements.globalSearch.addEventListener('input', (e) => {
            State.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Create Modal
        this.elements.btnCreate.addEventListener('click', () => {
            this.updateParentSelector();
            this.elements.modalOverlay.classList.remove('hidden');
        });

        this.elements.btnCloseModal.addEventListener('click', () => {
            this.elements.modalOverlay.classList.add('hidden');
        });

        this.elements.itemType.addEventListener('change', (e) => {
            const isTicket = e.target.value === 'ticket';
            const isReflection = e.target.value === 'reflection';
            document.getElementById('ticketFields').classList.toggle('hidden', !isTicket);
            document.getElementById('contentLabel').innerText = isReflection ? 'Observation' : 'Description';
            this.elements.charCount.classList.toggle('hidden', !isReflection);
        });

        this.elements.itemContent.addEventListener('input', (e) => {
            if (this.elements.itemType.value === 'reflection') {
                this.elements.charCount.innerText = `${e.target.value.length} characters`;
            }
        });

        this.elements.createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newItem = {
                type: document.getElementById('itemType').value,
                title: document.getElementById('itemTitle').value,
                description: document.getElementById('itemContent').value,
                vLayer: parseInt(document.getElementById('vLayer').value),
                hStage: parseInt(document.getElementById('hStage').value)
            };
            if (newItem.type === 'ticket') {
                newItem.status = document.getElementById('ticketStatus').value;
            }
            if (newItem.type === 'reflection') {
                newItem.content = newItem.description; // sync for naming
            }
            newItem.parentId = document.getElementById('parentItem').value || null;
            State.addItem(newItem);
            this.elements.modalOverlay.classList.add('hidden');
            this.elements.createForm.reset();
        });

        // Detail Panel Close
        this.elements.btnClosePanel.addEventListener('click', () => {
            this.elements.detailPanel.classList.add('hidden');
        });

        this.render();
    },

    updateAxisSelectors() {
        const vSelect = document.getElementById('vLayer');
        const hSelect = document.getElementById('hStage');
        
        if (vSelect) {
            vSelect.innerHTML = CONFIG.vAxis.levels.map((lvl, i) => 
                `<option value="${i+1}">${CONFIG.vAxis.prefix}${i+1} (${lvl})</option>`
            ).join('');
        }
        if (hSelect) {
            hSelect.innerHTML = CONFIG.hAxis.levels.map((lvl, i) => 
                `<option value="${i+1}">${CONFIG.hAxis.prefix}${i+1} (${lvl})</option>`
            ).join('');
        }
    },

    render() {
        const query = State.searchQuery;
        const filteredItems = State.items.filter(item => {
            const matchesSearch = item.title?.toLowerCase().includes(query) || 
                                item.description?.toLowerCase().includes(query) ||
                                item.content?.toLowerCase().includes(query);
            return matchesSearch;
        });

        this.elements.viewContainer.innerHTML = '';

        switch (State.currentView) {
            case 'grid':
                this.renderGrid(filteredItems);
                break;
            case 'commitments':
                this.renderListView(filteredItems.filter(i => i.type === 'commitment'), 'Commitments', '◈');
                break;
            case 'specs':
                this.renderListView(filteredItems.filter(i => i.type === 'spec'), 'Specs', '◎');
                break;
            case 'tickets':
                this.renderKanban(filteredItems);
                break;
            case 'decompose':
                this.renderDecompose();
                break;
            case 'reflections':
                this.renderListView(filteredItems.filter(i => i.type === 'reflection'), 'Reflections', '◌');
                break;
        }
    },

    updateParentSelector() {
        const selector = document.getElementById('parentItem');
        selector.innerHTML = '<option value="">No Parent</option>';
        State.items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerText = `[${CONFIG.vAxis.prefix}${item.vLayer}] ${item.title || 'Reflection'}`;
            selector.appendChild(option);
        });
    },

    renderDecompose() {
        const container = document.createElement('div');
        container.className = 'decompose-view shell-aesthetic';
        container.innerHTML = `
            <div class="shell-header">
                <span class="shell-cursor">></span>
                <span>DECOMP_TREE --TOPOLOGY_${CONFIG.vAxis.prefix}${CONFIG.vAxis.levels.length}x${CONFIG.hAxis.prefix}${CONFIG.hAxis.levels.length} --VERBOSE</span>
            </div>
            <div class="shell-content">
                <div id="treeContainer"></div>
            </div>
        `;

        this.elements.viewContainer.appendChild(container);
        this.renderTopologyTree();
    },

    renderTopologyTree() {
        const container = document.getElementById('treeContainer');
        const width = container.offsetWidth || 1000;
        const vLevels = CONFIG.vAxis.levels;
        const hLevels = CONFIG.hAxis.levels;
        
        const nodeWidth = 140;
        const nodeHeight = 34;
        const vGap = 60;
        const hGap = 160;
        
        const totalHeight = (vLevels.length * (nodeHeight + vGap)) + 100;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', totalHeight);
        svg.setAttribute('viewBox', `0 0 ${width} ${totalHeight}`);

        const drawNode = (text, x, y, type = 'default', count = 0) => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.style.cursor = 'pointer';

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x - nodeWidth / 2);
            rect.setAttribute('y', y);
            rect.setAttribute('width', nodeWidth);
            rect.setAttribute('height', nodeHeight);
            rect.setAttribute('rx', '2');
            rect.className.baseVal = 'tree-node-rect';
            g.appendChild(rect);

            const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            txt.setAttribute('x', x);
            txt.setAttribute('y', y + 20);
            txt.setAttribute('text-anchor', 'middle');
            txt.className.baseVal = 'node-text';
            txt.textContent = text;
            g.appendChild(txt);

            if (count > 0) {
                const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                badge.setAttribute('x', x + nodeWidth / 2 - 15);
                badge.setAttribute('y', y + 10);
                badge.className.baseVal = 'node-count';
                badge.textContent = `[${count}]`;
                g.appendChild(badge);
            }

            svg.appendChild(g);
            return { x, y: y + nodeHeight };
        };

        const drawLink = (x1, y1, x2, y2) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${x1} ${y1} C ${x1} ${y1 + vGap/2}, ${x2} ${y2 - vGap/2}, ${x2} ${y2}`;
            line.setAttribute('d', d);
            line.className.baseVal = 'tree-link';
            svg.appendChild(line);
        };

        // Root Node
        const rootX = width / 2;
        const rootY = 20;
        const rootPos = drawNode('ROOT_SYSTEM', rootX, rootY, 'root');

        // Vertical Layers (Rows)
        for (let v = vLevels.length; v >= 1; v--) {
            const vY = rootY + (vLevels.length + 1 - v) * (nodeHeight + vGap);
            const vX = width / 2;
            const vNodePos = drawNode(`${CONFIG.vAxis.prefix}${v}_${vLevels[v-1].toUpperCase()}`, vX, vY, 'v-layer');
            
            drawLink(rootX, rootPos.y, vX, vY);

            // Horizontal Stages (Columns) for each Vertical Layer
            for (let h = 1; h <= hLevels.length; h++) {
                const hX = vX + (h - Math.ceil(hLevels.length/2)) * hGap;
                const hY = vY + nodeHeight + vGap / 2;
                
                const itemsInCell = State.items.filter(i => i.vLayer === v && i.hStage === h);
                const hNodePos = drawNode(`${CONFIG.hAxis.prefix}${h}_${hLevels[h-1].substring(0, 3)}`, hX, hY, 'h-stage', itemsInCell.length);
                
                drawLink(vX, vNodePos.y, hX, hY);
            }
        }

        container.appendChild(svg);
    },

    renderGrid(items) {
        const grid = document.createElement('div');
        grid.className = 'grid-container';

        // Empty corner
        grid.appendChild(this.createGridLabel(''));

        // Horizontal Headers
        for (let h = 1; h <= CONFIG.hAxis.levels.length; h++) {
            grid.appendChild(this.createGridLabel(`${CONFIG.hAxis.prefix}${h}\n${CONFIG.hAxis.levels[h-1]}`));
        }

        // Vertical Rows
        for (let v = CONFIG.vAxis.levels.length; v >= 1; v--) {
            // Vertical Header
            grid.appendChild(this.createGridLabel(`${CONFIG.vAxis.prefix}${v}\n${CONFIG.vAxis.levels[v-1]}`));

            // Grid Cells
            for (let h = 1; h <= CONFIG.hAxis.levels.length; h++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                
                const cellItems = items.filter(i => i.vLayer === v && i.hStage === h);
                cellItems.forEach(item => {
                    const dot = document.createElement('div');
                    dot.className = `grid-dot dot-${item.type}`;
                    dot.title = item.title || 'Reflection';
                    dot.onclick = () => this.showDetails(item);
                    cell.appendChild(dot);
                });
                
                grid.appendChild(cell);
            }
        }

        this.elements.viewContainer.appendChild(grid);
    },

    createGridLabel(text) {
        const el = document.createElement('div');
        el.className = 'grid-label';
        el.innerText = text;
        return el;
    },

    renderListView(items, title, symbol) {
        const container = document.createElement('div');
        container.className = 'list-view';

        const header = document.createElement('div');
        header.className = 'list-header';
        header.innerHTML = `<h2>${symbol} ${title}</h2>`;
        
        // Axis Filter for list views
        const filterBar = document.createElement('div');
        filterBar.className = 'filter-bar';
        ['all', ...CONFIG.vAxis.levels.map((_, i) => i + 1)].forEach(v => {
            const chip = document.createElement('button');
            chip.className = `filter-chip ${State.vFilter === String(v) ? 'active' : ''}`;
            chip.innerText = v === 'all' ? `All ${CONFIG.vAxis.name}s` : `${CONFIG.vAxis.prefix}${v}`;
            chip.onclick = () => {
                State.vFilter = String(v);
                this.render();
            };
            filterBar.appendChild(chip);
        });
        header.appendChild(filterBar);
        
        container.appendChild(header);

        let displayItems = items;
        if (State.vFilter !== 'all') {
            displayItems = items.filter(i => i.vLayer === parseInt(State.vFilter));
        }

        if (displayItems.length === 0) {
            container.innerHTML += `<div class="empty-state">No items found matching criteria.</div>`;
        } else {
            displayItems.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'list-item';
                itemEl.innerHTML = `
                    <div class="item-meta">
                        <span class="tag">${CONFIG.vAxis.prefix}${item.vLayer}</span>
                        <span class="tag">${CONFIG.hAxis.prefix}${item.hStage}</span>
                        <span class="tag">#${item.id.split('-')[1]}</span>
                    </div>
                    <h3>${item.title || 'Untitled'}</h3>
                    <p>${(item.description || item.content || '').substring(0, 120)}...</p>
                `;
                itemEl.onclick = () => this.showDetails(item);
                container.appendChild(itemEl);
            });
        }

        this.elements.viewContainer.appendChild(container);
    },

    renderKanban(items) {
        const board = document.createElement('div');
        board.className = 'kanban-board';

        const columns = [
            { id: 'commitment', title: 'Commitments', symbol: '◈' },
            { id: 'spec', title: 'Specs', symbol: '◎' },
            { id: 'ticket', title: 'Tickets', symbol: '◧' },
            { id: 'reflection', title: 'Reflections', symbol: '◌' }
        ];

        columns.forEach(col => {
            const colItems = items.filter(i => i.type === col.id);
            const colEl = document.createElement('div');
            colEl.className = 'kanban-column';
            colEl.innerHTML = `
                <div class="column-header">
                    <span>${col.symbol} ${col.title}</span>
                    <span class="column-count">${colItems.length}</span>
                </div>
                <div class="kanban-items" id="col-${col.id}" data-type="${col.id}"></div>
            `;
            
            const itemsContainer = colEl.querySelector('.kanban-items');

            // Drag over handler to allow drop
            itemsContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                itemsContainer.classList.add('drag-over');
            });

            itemsContainer.addEventListener('dragleave', () => {
                itemsContainer.classList.remove('drag-over');
            });

            itemsContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                itemsContainer.classList.remove('drag-over');
                const itemId = e.dataTransfer.getData('text/plain');
                const newType = itemsContainer.dataset.type;
                
                const updates = { type: newType };
                if (newType === 'ticket') {
                    updates.status = 'backlog';
                }
                
                State.updateItem(itemId, updates);
                UI.notify(`Moved to ${newType}`);
            });

            colItems.forEach(item => {
                const card = document.createElement('div');
                card.className = `kanban-card card-${item.type}`;
                card.setAttribute('draggable', 'true');
                card.innerHTML = `
                    <div class="item-meta">${CONFIG.vAxis.prefix}${item.vLayer} | ${CONFIG.hAxis.prefix}${item.hStage} | #${item.id.split('-')[1]}</div>
                    <h4>${item.title || 'Reflection'}</h4>
                `;
                
                card.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', item.id);
                    e.dataTransfer.effectAllowed = 'move';
                    card.classList.add('dragging');
                });

                card.addEventListener('dragend', () => {
                    card.classList.remove('dragging');
                });

                card.onclick = (e) => {
                    this.showDetails(item);
                };
                itemsContainer.appendChild(card);
            });

            board.appendChild(colEl);
        });

        this.elements.viewContainer.appendChild(board);
    },

    showDetails(item) {
        const panel = this.elements.detailPanel;
        const content = this.elements.detailContent;
        
        const typeIcons = { commitment: '◈', spec: '◎', ticket: '◧', reflection: '◌' };
        
        content.innerHTML = `
            <div class="detail-header">
                <span class="type-tag type-${item.type}">${typeIcons[item.type]} ${item.type.toUpperCase()}</span>
                <h2>${item.title || 'Reflection'}</h2>
            </div>
            <div class="detail-body">
                <div class="detail-meta">
                    <div class="meta-box"><strong>${CONFIG.vAxis.name}</strong><span>${CONFIG.vAxis.prefix}${item.vLayer}</span></div>
                    <div class="meta-box"><strong>${CONFIG.hAxis.name}</strong><span>${CONFIG.hAxis.prefix}${item.hStage}</span></div>
                    <div class="meta-box"><strong>ID</strong><span>#${item.id.split('-')[1]}</span></div>
                </div>
                
                <div class="detail-section">
                    <label>Content</label>
                    <p>${item.description || item.content || 'No description provided.'}</p>
                </div>

                ${item.type === 'ticket' ? `
                    <div class="detail-section">
                        <label>Status</label>
                        <select onchange="State.updateItem('${item.id}', {status: this.value}); UI.notify('Status updated')">
                            <option value="backlog" ${item.status === 'backlog' ? 'selected' : ''}>Backlog</option>
                            <option value="in-progress" ${item.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="done" ${item.status === 'done' ? 'selected' : ''}>Done</option>
                        </select>
                    </div>
                ` : ''}

                <div class="detail-footer">
                    <button class="btn-danger" onclick="State.deleteItem('${item.id}'); UI.elements.detailPanel.classList.add('hidden')">Delete Item</button>
                </div>
            </div>
        `;
        
        panel.classList.remove('hidden');
    },

    notify(message, type = 'accent') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.borderLeftColor = `var(--color-${type === 'accent' ? 'commitment' : 'danger'})`;
        toast.innerText = message;
        
        this.elements.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    State.init();
    UI.init();
});
