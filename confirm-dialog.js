//Very inpired in SweetAlert2
const ConfirmDialog = {
    //Shows modal with confirmation
    show: (userOptions) => {
        //Default options
        const options = {
            text: '¿Confirmar?',
            textClass: '',
            okText: 'Aceptar',
            okClass: '',
            useCancel: true,
            cancelText: 'Cancelar',
            cancelClass: '',
            modalClass: '',
            boxClass: '',
            success: false,
            warning: false,
            error: false,
            ...userOptions
        }

        //Success icon template
        const success = `
            <div class="cd-sa">
                <div class="cd-sa-success">
                    <div class="cd-sa-success-tip"></div>
                    <div class="cd-sa-success-long"></div>
                    <div class="cd-sa-success-placeholder"></div>
                    <div class="cd-sa-success-fix"></div>
                </div>
            </div>
        `;

        //Warning icon template
        const warning = `
            <div class="cd-sa">
                <div class="cd-sa-warning">
                    <div class="cd-sa-warning-body"></div>
                    <div class="cd-sa-warning-dot"></div>
                </div>
            </div>
        `;

        //Error icon template
        const error = `
            <div class="cd-sa">
                <div class="cd-sa-error">
                    <div class="cd-sa-error-x">
                        <div class="cd-sa-error-left"></div>
                        <div class="cd-sa-error-right"></div>
                    </div>
                    <div class="cd-sa-error-placeholder"></div>
                    <div class="cd-sa-error-fix"></div>
                </div>
            </div>
        `;

        //Ok button template
        const ok = `
            <button id="cd-ok" class="button ${options.okClass}">${options.okText}</button>
        `;

        //Cancel button template
        const cancel = `
            <button id="cd-cancel" class="button ${options.cancelClass}">${options.cancelText}</button>
        `;

        //Icon to show
        let icons = '';
        icons += options.success ? success : '';
        icons += options.warning ? warning : '';
        icons += options.error ? error : '';

        //Cancel button to show
        let useCancel = options.useCancel ? cancel : '';

        //Html template
        const template = `
            <div id="cd-modal" class="cd-modal ${options.modalClass}">
                <div class="cd-box ${options.boxClass}">
                    <div class="cd-content">
                        ${icons}
                        <div class="cd-text ${options.textClass}">${options.text}</div>
                    </div>
                    <div class="cd-buttons">
                        ${ok}${useCancel}
                    </div>
                </div>
            </div>
        `;

        //Add to dom
        document.body.insertAdjacentHTML('beforeend', template);
        const dialog = document.getElementById('cd-modal');

        //Remove modal
        const remove = () => {
            dialog.classList.add('cd-out');
            setTimeout(() => dialog.remove(), 300);
        }

        //Return promise
        return new Promise((resolve, _) => {

            //Ok click true
            document.getElementById('cd-ok').addEventListener('click', () => {
                remove();
                resolve(true)
            });
            if (options.useCancel) {
                //Cancel click false
                document.getElementById('cd-cancel').addEventListener('click', () => {
                    remove();
                    resolve(false);
                });
            }
        });
    }
}