export default Vue.component("error-modal", {
    template: `
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">  
                        <div class="modal-header">
                            <h3>Ошибка</h3>
                        </div>
  
                        <div class="modal-body">
                            <p>не удаётся выполнить запрос к серверу</p>
                        </div>

                        <div class="modal-footer">
                            <button class="modal-default-button" @click="$emit('close')">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>`
});