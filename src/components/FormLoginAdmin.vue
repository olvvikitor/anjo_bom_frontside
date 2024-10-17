<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="login.email"
          required
          placeholder="Digite seu email"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="login.password"
          required
          placeholder="Digite sua senha"
        />
      </div>

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      fetch('https://apianjobom.victordev.shop/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.login)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na solicitação')
          }
          return response.json()
        })
        .then((data) => {
          if (data.token) {
            // Armazene o token no armazenamento local ou em um cookie
            localStorage.setItem('authToken', data.token)
            console.log('Login bem-sucedido:', data)
            // Redirecione o usuário após o login bem-sucedido
            // this.$router.push('/show-all'); // Supondo que você esteja usando Vue Router
            window.location.href = '/admin/show-all'
          } else {
            console.error('Token não recebido')
          }
        })
        .catch((error) => {
          console.error('Erro no login:', error)
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
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

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
