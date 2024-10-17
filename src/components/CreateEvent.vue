<template>
  <div class="create-evento">
    <h1>Criar Evento</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input v-model="titulo" type="text" id="titulo" required />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <textarea v-model="descricao" id="descricao" required></textarea>
      </div>
      <div class="form-group">
        <label for="address">Endereço:</label>
        <div class="address-group">
          <div class="address-field">
            <label for="cep">CEP:</label>
            <input v-model="address.cep" type="text" id="cep" required />
          </div>
          <div class="address-field">
            <label for="estado">Estado:</label>
            <input v-model="address.estado" type="text" id="estado" required />
          </div>
          <div class="address-field">
            <label for="cidade">Cidade:</label>
            <input v-model="address.cidade" type="text" id="cidade" required />
          </div>
          <div class="address-field">
            <label for="bairro">Bairro:</label>
            <input v-model="address.bairro" type="text" id="bairro" required />
          </div>
          <div class="address-field">
            <label for="rua">Rua:</label>
            <input v-model="address.rua" type="text" id="rua" required />
          </div>
          <div class="address-field">
            <label for="numero">Número:</label>
            <input v-model="address.numero" type="text" id="numero" required />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="data_inicio">Data de Início:</label>
        <input v-model="data_inicio" type="datetime-local" id="data_inicio" required />
      </div>
      <div class="form-group">
        <label for="data_fim">Data de Fim:</label>
        <input v-model="data_fim" type="datetime-local" id="data_fim" required />
      </div>
      <div class="form-group">
        <label for="photos_event">Fotos:</label>
        <input type="file" multiple @change="handleFileUpload" id="photos_event" />
      </div>
      <button type="submit" class="submit-button">Criar Evento</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: '',
      descricao: '',
      address: {
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
      },
      data_inicio: '',
      data_fim: '',
      files: []
    };
  },
  methods: {
    handleFileUpload(event) {
      const input = event.target;
      if (input.files) {
        this.files = Array.from(input.files);
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('titulo', this.titulo);
      formData.append('descricao', this.descricao);
      formData.append('address', JSON.stringify(this.address)); // Converta o objeto para JSON
      formData.append('data_inicio', this.data_inicio);
      formData.append('data_fim', this.data_fim);

      this.files.forEach(file => {
        formData.append('photos_event', file);
      });

      try {
        const response = await fetch('https://apianjobom.victordev.shop/admin/criarEvento', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization':  localStorage.getItem('authToken')
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao criar evento');
        }

        const data = await response.json();
        console.log('Evento criado com sucesso:', data);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  }
};
</script>

<style scoped>
.create-evento {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], input[type="datetime-local"], textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

textarea {
  height: 100px;
}

.address-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.address-field {
  flex: 1;
  min-width: 200px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
