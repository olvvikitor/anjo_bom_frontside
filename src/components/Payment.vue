<template>
  <div class="donation-container">
    <h2>Faça uma Doação via Pix</h2>
    <form @submit.prevent="submitDonation" class="donation-form">
      <div class="form-group">
        <label for="amount">Valor:</label>
        <input v-model="form.amount" type="number" id="amount" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="name">Nome:</label>
        <input v-model="form.name" type="text" id="name" />
      </div>
      <div class="form-group">
        <label for="phone">Telefone:</label>
        <input v-model="form.phone" type="text" id="phone" />
      </div>
      <div class="form-group">
        <label for="message">Mensagem:</label>
        <input v-model="form.message" type="text" id="message" />
      </div>
      <button type="submit" class="submit-button">Doar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: '',
        email: '',
        name: '',
        phone: '',
        message: ''
      }
    };
  },
  methods: {
    async submitDonation() {
      try {
        const response = await fetch('http://localhost:5000/person/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(this.form)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.ticket_url) {
          // Redirecionar automaticamente para o link do Pix
          window.location.href = data.ticket_url;
        }
      } catch (error) {
        console.error('Erro ao realizar a doação:', error);
      }
    }
  }
};
</script>

<style scoped>
.donation-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
}

.donation-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #34495e;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #27ae60;
}
</style>
