class PDFEditor {
    constructor() {
        this.content = '';
        this.fontSize = '16px';
        this.selectedColor = '#FFFFFF';
        this.currentFormat = {
            fontSize: '16px',
            color: '#FFFFFF',
            start: 0,
            end: 0
        };

        this.initializeElements();
        this.setupEventListeners();
        this.renderPage();
    }

    initializeElements() {
        this.fontSizeSelect = document.getElementById('fontSize');
        this.colorButtons = document.querySelectorAll('.color-btn');
        this.pagesContainer = document.getElementById('pages');
    }

    setupEventListeners() {
        this.fontSizeSelect.addEventListener('change', (e) => this.changeFontSize(e.target.value));
        
        this.colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const color = button.dataset.color;
                this.changeColor(color);
            });
        });
    }

    createPageElement() {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';

        const textarea = document.createElement('textarea');
        textarea.value = this.content;
        textarea.style.fontSize = this.fontSize;
        textarea.style.color = this.selectedColor;

        textarea.addEventListener('input', (e) => {
            this.content = e.target.value;
        });

        textarea.addEventListener('select', (e) => {
            this.currentFormat.start = e.target.selectionStart;
            this.currentFormat.end = e.target.selectionEnd;
        });

        pageDiv.appendChild(textarea);
        return pageDiv;
    }

    renderPage() {
        this.pagesContainer.innerHTML = '';
        const pageElement = this.createPageElement();
        this.pagesContainer.appendChild(pageElement);
    }

    changeFontSize(size) {
        this.fontSize = size + 'px';
        const textarea = this.pagesContainer.querySelector('.page textarea');
        
        if (textarea && textarea.selectionStart !== textarea.selectionEnd) {
            // Seçili metin varsa, sadece seçili metni güncelle
            const selectedText = this.content.substring(textarea.selectionStart, textarea.selectionEnd);
            const newContent = this.content.substring(0, textarea.selectionStart) +
                             `<span style="font-size: ${this.fontSize}">${selectedText}</span>` +
                             this.content.substring(textarea.selectionEnd);
            this.content = newContent;
        } else {
            // Seçili metin yoksa, yeni yazılacak metinler için font boyutunu güncelle
            textarea.style.fontSize = this.fontSize;
        }
        
        this.renderPage();
    }

    changeColor(color) {
        this.selectedColor = color;
        const textarea = this.pagesContainer.querySelector('.page textarea');
        
        if (textarea && textarea.selectionStart !== textarea.selectionEnd) {
            // Seçili metin varsa, sadece seçili metni güncelle
            const selectedText = this.content.substring(textarea.selectionStart, textarea.selectionEnd);
            const newContent = this.content.substring(0, textarea.selectionStart) +
                             `<span style="color: ${this.selectedColor}">${selectedText}</span>` +
                             this.content.substring(textarea.selectionEnd);
            this.content = newContent;
        } else {
            // Seçili metin yoksa, yeni yazılacak metinler için rengi güncelle
            textarea.style.color = this.selectedColor;
        }
        
        this.renderPage();
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PDFEditor();
}); 