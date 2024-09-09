<template>
  <div class="form-container">
    <h2>Formulário de Cadastro</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" v-model="user.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" v-model="user.password" id="password" required />
      </div>

      <button type="submit" class="submit-btn">Cadastrar</button>

      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
      error: null
    };
  },
  methods: {
    async submitForm() {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        this.error = 'Token de autenticação não encontrado';
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(this.user)
        });

        if (!response.ok) {
          throw new Error('Cadastro falhou');
        }

        const data = await response.json();
        console.log('Cadastro bem-sucedido:', data);
        this.error = null;
      } catch (error) {
        this.error = error.message;
        console.error('Erro:', error);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
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
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
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
  margin-top: 10px;
}
</style>
