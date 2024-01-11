function gerarToken() {
    const token = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    const cp_token = document.getElementById('inputtoken');
    cp_token.value = token;
}

function excluirToken(id) {
    swal.fire({
        icon: 'info',
        title: '<strong>Deseja realmente Excluir?</strong>',
        html: 'não poderia mais reverter depois confirmado!',
        showCancelButton: true,
        confirmButtonText: 'OK!',
        cancelButtonText: 'Cancelar',
        cancelButtonAriaLabel: 'Thumbs down',
        confirmButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/excluirToken',
                dataType: 'json',
                data: { id },
            // ajax concluio verificar status = 200 significa foi ok
            }).always((ret) => {
                if (ret.status == '200') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Excluido com sucesso!',
                        showConfirmButton: true,
                        timer: 3000,
                    }).then(() => {
                        location.reload();
                    })
                }
            })
        }
    })
}

if (document.querySelector('.btn-testar')) {
    const inputPass = document.querySelector('#inputPassword')
    const form = document.querySelector('#dadosbd')
    const inputElements = form.querySelectorAll('input[type="text"]')
    // Adiciona um ouvinte de eventos para cada input
    inputElements.forEach((input) => {
        input.addEventListener('input', () => {
            inputPass.value = ''; // Limpa o input de senha
        })
    })
    const button = document.querySelector('.btn-testar')
    inputPass.addEventListener('keyup', () => {
        if (inputPass.value.length == '') {
            button.classList.remove('disabled')
            // document.querySelector('.btn-primary').classList.remove('disabled')
        }
    })

    button.addEventListener('click', () => {
        const form = document.querySelector('#dadosbd')
        fetch('/testarconexao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                host: form.host.value,
                port: form.port.value,
                sid: form.sid.value,
                user: form.user.value,
                pass: form.pass.value,

            }),
        })
            .then((response) => response.json())
            .then((data) => (data.status == true ? conectOk()
                : Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Erro de conexão',
                    showConfirmButton: false,
                    timer: 2000,
                })))
            .catch((error) => console.error(error))
    })
    function conectOk() {
        button.classList.add('disabled')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Conectado com sucesso',
            showConfirmButton: false,
            timer: 2000,
        })
    }
}

if (document.querySelector('.btn-editarUser')) {
    // editar user
    const btnsEditarUser = document.querySelectorAll('.btn-editarUser')
    btnsEditarUser.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('value')
            fetch(`/useredit/${id}`, { method: 'get', headers: { 'Content-Type': 'application/json' } })
                .then((response) => response.json())
                .then((data) => {
                    swal.fire({
                        title: `Editando usuário ${id}`,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Salvar',
                        width: '41rem',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        background: '#F0F0F0',
                        html: `<div>
                              <div class="swal-edit-div"><label>Id</label><input id="swal-input-id" style="width: 25rem;" class="swal2-input" value="${data.id}" disabled></div>
                              <div class="swal-edit-div"><label>Matricula</label><input id="swal-input-matricula" style="width: 25rem;" class="swal2-input" value="${data.matricula ? data.matricula : ''}"></div>
                              <div class="swal-edit-div"><label>Nome</label><input id="swal-input-name" style="width: 25rem;"  class="swal2-input" value="${data.nome}"></div>
                              <div class="swal-edit-div"><label>E-mail</label><input id="swal-input-email" style="width: 25rem;" class="swal2-input" value="${data.email}"></div> 
                          </div>`,
                        focusConfirm: false,
                        preConfirm: () => ({
                            id: document.getElementById('swal-input-id').value,
                            matricula: document.getElementById('swal-input-matricula').value,
                            nome: document.getElementById('swal-input-name').value,
                            email: document.getElementById('swal-input-email').value,
                        }),
                    }).then((result) => {
                        if (result.isConfirmed) {
                        // enviar para salvar
                            // console.log(result.value)
                            if (result.value) {
                            // Swal.fire(JSON.stringify(result.value))
                                fetch('/usersalvaredicao', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.value) })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: `Usuário ${result.value.id} Atualizado!`,
                                            showConfirmButton: false,
                                            timer: 1500,
                                        }).then(() => {
                                            window.location.reload()
                                        })
                                    })
                            }
                        }
                    })
                })
        })
    })
    // excluir user
    const btnsExcluirUser = document.querySelectorAll('.btn-excluirUser')
    btnsExcluirUser.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('value')
            // swal.fire(`Excluir o id ${id}`)
            fetch(`/userdelete/${id}`, { method: 'get', headers: { 'Content-Type': 'application/json' } })
                .then((response) => response.json())
                .then((data) => {
                    swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Usuário ${id} excluido!`,
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        window.location.reload()
                    })
                })
        })
    })
}

if (document.querySelector('.btn-boleto')) {
    const btnboleto = document.querySelector('.btn-boleto')
    btnboleto.addEventListener('click', () => {
        const numtrans = document.querySelector('.numtransvenda').value
        const prest = document.querySelector('.prest').value
        // console.log(numtrans)
        // console.log(prest)
        $.ajax({
            type: 'POST',
            url: 'https://localhost:2083/api/gerarboletorm',
            // dataType: "json",
            data: {
                numeroTransacao: numtrans,
                prest,
            },
            success: (suc) => {
                const boleto = window.open()
                boleto.document.write(suc)
            // newTab.document.close();
            },
            error: (err) => {
                // console.log('Entrou no error')
                // window.open(err, "_blank")
                console.log(`Error: ${err}`)
            },
            // ajax concluio verificar status = 200 significa foi ok
        })/* .always(function(ret){
          if(ret.status == '200'){
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Excluido com sucesso!',
                  showConfirmButton: true,
                  timer: 3000
                }).then(()=>{
                  location.reload();
                })
          }
      }) */
    })
}

if (document.querySelector('.btn-submit-config')) {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('dadosbd')
        // const btnSubmit = document.getElementById('btnSubmit')

        form.addEventListener('submit', (event) => {
            event.preventDefault() // Impede o envio padrão do formulário

            // Seu código para obter os dados do formulário
            const formData = new FormData(form)
            const formObject = {}
            formData.forEach((value, key) => {
                formObject[key] = value
            });

            // Enviar dados para o servidor usando fetch
            fetch('/configsave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === 'ok') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            },
                        });
                        Toast.fire({
                            icon: 'success',
                            title: 'Dados salvo com sucesso!',
                        }).then(() => {
                            location.reload()
                        })
                    }
                })
                .catch((error) => {
                    console.error('Erro:', error);
                    alert('Erro ao enviar requisição.');
                })
        })
    })
}

if (document.querySelector('.btn-submit-email')) {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('dadosemail')
        // const btnSubmit = document.getElementById('btnSubmit');

        form.addEventListener('submit', (event) => {
            event.preventDefault() // Impede o envio padrão do formulário

            // Seu código para obter os dados do formulário
            const formData = new FormData(form)
            const formObject = {}
            formData.forEach((value, key) => {
                formObject[key] = value
            });

            // Enviar dados para o servidor usando fetch
            fetch('/configemailsave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === 'OK') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            },
                        });
                        Toast.fire({
                            icon: 'success',
                            title: 'Dados salvo com sucesso!',
                        }).then(() => {
                            location.reload()
                        })
                    }
                })
                .catch((error) => {
                    console.error('Erro:', error);
                    alert('Erro ao enviar requisição.');
                })
        })
    })
}
