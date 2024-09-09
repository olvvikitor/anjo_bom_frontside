<template>
  <div class="form-container">
    <h2>Formulário de Cadastro de Pessoa</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="person.name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="last_name">Sobrenome:</label>
        <input type="text" id="last_name" v-model="person.last_name" />
        <span v-if="errors.last_name" class="error">{{ errors.last_name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="person.email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Telefone:</label>
        <input type="text" id="phone" v-model="person.phone" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="person.password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="motivation">Motivação:</label>
        <textarea id="motivation" v-model="person.motivation"></textarea>
        <span v-if="errors.motivation" class="error">{{ errors.motivation }}</span>
      </div>

      <h3>Endereço</h3>
      <div class="form-group">
        <label for="cep">CEP:</label>
        <input type="text" id="cep" v-model="person.addressPerson.cep" />
        <span v-if="errors.addressPerson?.cep" class="error">{{ errors.addressPerson.cep }}</span>
      </div>

      <div class="form-group">
        <label for="estado">Estado:</label>
        <input type="text" id="estado" v-model="person.addressPerson.estado" />
        <span v-if="errors.addressPerson?.estado" class="error">{{ errors.addressPerson.estado }}</span>
      </div>

      <div class="form-group">
        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" v-model="person.addressPerson.cidade" />
        <span v-if="errors.addressPerson?.cidade" class="error">{{ errors.addressPerson.cidade }}</span>
      </div>

      <div class="form-group">
        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" v-model="person.addressPerson.bairro" />
        <span v-if="errors.addressPerson?.bairro" class="error">{{ errors.addressPerson.bairro }}</span>
      </div>

      <div class="form-group">
        <label for="rua">Rua:</label>
        <input type="text" id="rua" v-model="person.addressPerson.rua" />
        <span v-if="errors.addressPerson?.rua" class="error">{{ errors.addressPerson.rua }}</span>
      </div>

      <div class="form-group">
        <label for="numero">Número:</label>
        <input type="text" id="numero" v-model="person.addressPerson.numero" />
        <span v-if="errors.addressPerson?.numero" class="error">{{ errors.addressPerson.numero }}</span>
      </div>

      <button type="submit" class="submit-btn">Enviar</button>
    </form>

    <p v-if="submitError" class="submit-error">{{ submitError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        motivation: "",
        addressPerson: {
          cep: "",
          estado: "",
          cidade: "",
          bairro: "",
          rua: "",
          numero: ""
        }
      },
      errors: {}, // Para armazenar erros de validação
      submitError: "" // Para armazenar erros de envio
    };
  },
  methods: {
    validateForm() {
      // Limpa os erros
      this.errors = {};
      this.submitError = "";

      // Validações simples
      if (!this.person.name) this.errors.name = "O nome é obrigatório.";
      if (!this.person.last_name) this.errors.last_name = "O sobrenome é obrigatório.";
      if (!this.person.email) this.errors.email = "O email é obrigatório.";
      if (!this.person.phone) this.errors.phone = "O telefone é obrigatório.";
      if (!this.person.password) this.errors.password = "A senha é obrigatória.";
      if (!this.person.motivation) this.errors.motivation = "A motivação é obrigatória.";
      
      // Validações de endereço
      if (!this.person.addressPerson.cep) this.errors.addressPerson = { ...this.errors.addressPerson, cep: "O CEP é obrigatório." };
      if (!this.person.addressPerson.estado) this.errors.addressPerson = { ...this.errors.addressPerson, estado: "O estado é obrigatório." };
      if (!this.person.addressPerson.cidade) this.errors.addressPerson = { ...this.errors.addressPerson, cidade: "A cidade é obrigatória." };
      if (!this.person.addressPerson.bairro) this.errors.addressPerson = { ...this.errors.addressPerson, bairro: "O bairro é obrigatório." };
      if (!this.person.addressPerson.rua) this.errors.addressPerson = { ...this.errors.addressPerson, rua: "A rua é obrigatória." };
      if (!this.person.addressPerson.numero) this.errors.addressPerson = { ...this.errors.addressPerson, numero: "O número é obrigatório." };

      // Retorna true se não houver erros
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (!this.validateForm()) {
        return;
      }

      // Enviar os dados para a API
      fetch("http://localhost:5000/person/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.person)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              console.error("Erro do servidor:", err);
              throw new Error(err.message || "Erro desconhecido");
            });
          }
          return response.json();
        })
        .then(data => {
          console.log("Sucesso:", data);
        })
        .catch(error => {
          this.submitError = `Erro ao enviar os dados: ${error.message}`;
          console.error("Erro ao enviar:", error);
        });
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2, h3 {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input, 
.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 12px;
}

.submit-error {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
