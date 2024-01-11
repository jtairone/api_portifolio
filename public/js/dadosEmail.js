document.addEventListener('DOMContentLoaded', (event) => {
    const inputSecure = document.getElementById('inputSecure').value
    const inputTls = document.getElementById('inputTls').value

    const ssltrue = document.getElementById('ssltrue')
    const sslfalse = document.getElementById('sslfalse')
    const tlstrue = document.getElementById('tlstrue')
    const tlsfalse = document.getElementById('tlsfalse')

    inputSecure == 'true' ? ssltrue.checked = true : sslfalse.checked = true
    inputTls == 'true' ? tlstrue.checked = true : tlsfalse.checked = true
})

const btTestarSmtp = document.querySelector('.btn-testarSmtp')
btTestarSmtp.addEventListener('click', () => {
    const inputteste = document.getElementById('inputteste').value
    if (!inputteste) {
        swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo e-mail está vazio!',
            showConfirmButton: false,
            timer: 1500,
        })
    } else {
        fetch('/testarsmtp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: inputteste }) })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Erro na requisição')
            })
            .then((data) => {
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                })
            })
            .catch((data) => {
                swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: data.message,
                    text: 'Alto deu errado!',
                    showConfirmButton: false,
                    timer: 1500,
                })
            })
    }
})
