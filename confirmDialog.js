// Confirm Dialog web component
class ConfirmDialog extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Component styles
        const css = /*css*/`
            .confirm-dialog-background {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.35);
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: system-ui, sans-serif;
                z-index: 99999;
            }
        
            .confirm-dialog-message {
                box-sizing: border-box;
                position: relative;
                display: flex;
                flex-direction: column;
                width: 300px;
                background-color: white;
                border-radius: 4px;
                overflow: hidden;
                opacity: 0;
                transform: translateY(-15px);
                transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            }

            @media (min-width: 768px) {
                .confirm-dialog-message {
                    max-width: 480px;
                    min-width: 360px;
                }
            }

            .confirm-dialog-message.show {
                opacity: 1;
                transform: translateY(0);
            }

            .confirm-dialog-message p {
                padding: 16px;
            }

            .confirm-dialog-message div {
                display: flex;
            }

            .confirm-dialog-message button {
                flex: 1;
            }

            .confirm-dialog-message button {
                height: 42px;
                background: none;
                border: none;
                outline: none;
                border-top: 1px solid #f2f2f2;
                cursor: pointer;
            }

            .confirm-dialog-message button#confirm-dialog-ok {
                background-color: var(--confirm-dialog-ok-color, #add8e6);
            }

            .confirm-dialog-message button:hover {
                box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.05) inset;
            }
        `;

        // Component html template
        const html = /*html*/`
            <div class="confirm-dialog-background">
                <div id="confirm-dialog-message" class="confirm-dialog-message">
                    <p id="confirm-dialog-message-text">Confirm?</p>
                    <div>
                        <button id="confirm-dialog-ok">Ok</button>
                        <button id="confirm-dialog-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        // Define the template
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;

        // Clone the template content and append it to the shadow root
        const instance = template.content.cloneNode(true);
        this.shadowRoot.appendChild(instance);

        // Get references to elements
        this.message = this.shadowRoot.querySelector('#confirm-dialog-message');
        this.messageText = this.shadowRoot.querySelector('#confirm-dialog-message-text');
        this.ok = this.shadowRoot.querySelector('#confirm-dialog-ok');
        this.cancel = this.shadowRoot.querySelector('#confirm-dialog-cancel');

        // Add event listeners to buttons
        this.ok.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('ok'));
            this.close();
        });
        this.cancel.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel'));
            this.close();
        });
    }

    connectedCallback() {
        this.messageText.textContent = this.getAttribute('message');
        this.ok.textContent = this.getAttribute('ok');
        this.cancel.textContent = this.getAttribute('cancel');
        setTimeout(() => {
            this.message.classList.add('show');
        }, 50);
    }

    close() {
        // Dispatch a close event
        this.dispatchEvent(new CustomEvent('close'));
        // Remove the component from the DOM
        this.message.classList.remove('show');
        setTimeout(() => {
            this.remove();
        }, 300);
    }
}

customElements.define('confirm-dialog', ConfirmDialog);

class ConfirmDialogModal {
    constructor(options) {
        //Message default values
        const defaultOptions = {
            message: 'Do you want to confirm this action?',
            ok: 'Ok',
            cancel: 'Cancel'
        };
        this.options = Object.assign(defaultOptions, options);
        //Message element
        this.message = document.createElement('confirm-dialog');
        this.message.setAttribute('message', this.options.message);
        this.message.setAttribute('ok', this.options.ok);
        this.message.setAttribute('cancel', this.options.cancel);
    }

    //Display the message
    show(message) {
        this.message.setAttribute('message', message);
        document.body.appendChild(this.message);

        return new Promise((resolve, _) => {
            this.message.addEventListener('ok', () => {
                resolve(true);
            });
            this.message.addEventListener('cancel', () => {
                resolve(false);
            });
        });
    }
}