<template>
  <div>
    <h2>Criar Evento</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="titulo">Título:</label>
        <input type="text" v-model="evento.titulo" id="titulo" required />
      </div>

      <div>
        <label for="descricao">Descrição:</label>
        <textarea v-model="evento.descricao" id="descricao" required></textarea>
      </div>

      <div>
        <label for="data_inicio">Data de Início:</label>
        <input type="date" v-model="evento.data_inicio" id="data_inicio" required />
      </div>

      <div>
        <label for="data_fim">Data de Fim:</label>
        <input type="date" v-model="evento.data_fim" id="data_fim" required />
      </div>

      <div>
        <label for="cep">CEP:</label>
        <input type="text" v-model="evento.address.cep" id="cep" required />
      </div>

      <div>
        <label for="estado">Estado:</label>
        <input type="text" v-model="evento.address.estado" id="estado" required />
      </div>

      <div>
        <label for="cidade">Cidade:</label>
        <input type="text" v-model="evento.address.cidade" id="cidade" required />
      </div>

      <div>
        <label for="bairro">Bairro:</label>
        <input type="text" v-model="evento.address.bairro" id="bairro" required />
      </div>

      <div>
        <label for="rua">Rua:</label>
        <input type="text" v-model="evento.address.rua" id="rua" required />
      </div>

      <div>
        <label for="numero">Número:</label>
        <input type="text" v-model="evento.address.numero" id="numero" required />
      </div>

      <div>
        <label for="photos">Fotos:</label>
        <input type="file" multiple @change="onFileChange" />
      </div>

      <button type="submit">Criar Evento</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evento: {
        titulo: '',
        descricao: '',
        data_inicio: '',
        data_fim: '',
        address: {
          cep: '',
          estado: '',
          cidade: '',
          bairro: '',
          rua: '',
          numero: ''
        }
      },
      files: []
    }
  },
  methods: {
    onFileChange(e) {
      this.files = Array.from(e.target.files)
    },
    async submitForm() {
      try {
        // Cria um objeto FormData para enviar os dados como multipart/form-data
        const formData = new FormData()
        formData.append('titulo', this.evento.titulo)
        formData.append('descricao', this.evento.descricao)
        formData.append('data_inicio', this.evento.data_inicio)
        formData.append('data_fim', this.evento.data_fim)

        // Adiciona o endereço como uma string JSON
        formData.append('address', JSON.stringify(this.evento.address))

        // Adiciona as fotos ao FormData
        this.files.forEach((file) => {
          formData.append('photos_event', file)
        })

        // Faz o envio via POST
        const response = await fetch('https://apianjobom.victordev.shop/admin/criarEvento', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: localStorage.getItem('authToken')
          }
        })

        if (!response.ok) {
          throw new Error('Erro ao criar o evento')
        }

        const result = await response.json()
        console.log('Evento criado com sucesso:', result)
      } catch (error) {
        console.error('Erro:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Estilos para o formulário */
form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 10px;
}
</style>
