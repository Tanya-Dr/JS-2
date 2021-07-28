const init = () => {

    const changeButton = document.querySelector('.change-button');
    changeButton.addEventListener('click', () => {
        let text = document.querySelector('.changedText');
        if (text.innerHTML != '') {
            text.innerHTML = '';         
        }
        let changeText = document.querySelector('.input-text').value;
        if (changeText == '') {
            changeText = document.querySelector('.input-text').getAttribute('placeholder');
        }
        //шаблон, который заменяет одинарные кавычки на двойные
        const quotesRegExp = /(\B'\b)|('\B)/gi;
        const newStr = changeText.replace(quotesRegExp, '"');
        text.insertAdjacentHTML('beforeend',`<h3>Измененный текст:</h3><p>${newStr}</p>`);
        text.style.display = "block";
    });


    const submitButton = document.querySelector('.buttonSubmit');
    submitButton.addEventListener('click', () => {
        let alertMessage = document.querySelector('.alert');
        if (alertMessage.innerHTML != '') {
            alertMessage.innerHTML = '';
            document.querySelectorAll('.wrong-input').forEach(el => {
                el.classList.remove('wrong-input');
            });            
        }
        const nameCheck = document.querySelector('.nameInput');   
        const numberCheck = document.querySelector('.numberInput');
        const emailCheck = document.querySelector('.emailInput');
        const textCheck = document.querySelector('.textInput');     

        //шаблоны для валидации формы
        const nameRegExp = /^[(a-zA-Z)|(а-яА-Я)]+$/;
        const numberRegExp = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
        const emailRegExp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
        const textRegExp = /[^\s]+/;

        if (!nameRegExp.test(nameCheck.value)) {
            alertMessage.insertAdjacentHTML('beforeend',`<p>Неправильно введено имя</p>`);
            alertMessage.style.display = "block";
            nameCheck.classList.add('wrong-input');
        }       
        if (!numberRegExp.test(numberCheck.value)) {
            alertMessage.insertAdjacentHTML('beforeend',`<p>Неправильно введен номер телефона</p>`);
            alertMessage.style.display = "block";
            numberCheck.classList.add('wrong-input');
        }   
        if (!emailRegExp.test(emailCheck.value)) {
            alertMessage.insertAdjacentHTML('beforeend',`<p>Неправильно введен email</p>`);
            alertMessage.style.display = "block";
            emailCheck.classList.add('wrong-input');
        }

        if (!textRegExp.test(textCheck.value)) {
            alertMessage.insertAdjacentHTML('beforeend',`<p>Пустое поле текста</p>`);
            alertMessage.style.display = "block";
            textCheck.classList.add('wrong-input');
        }
    });

}
window.onload = init;