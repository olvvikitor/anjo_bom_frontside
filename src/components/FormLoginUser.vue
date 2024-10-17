<template>
  <div class="login-form">
    <h2>Login</h2>
    <!-- Formulário para enviar o parâmetro de login -->
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="param">E-mail ou Telefone:</label>
        <input
          type="text"
          id="param"
          v-model="loginParam"
          placeholder="Digite seu e-mail ou telefone"
          required
        />
      </div>
      <button type="submit">Gerar Código</button>
    </form>

    <!-- Formulário para verificar o código de autenticação -->
    <form v-if="showCodeVerification" @submit.prevent="submitCodeVerification">
      <div class="form-group">
        <label for="code">Código de Autenticação:</label>
        <input
          type="text"
          id="code"
          v-model="authCode"
          placeholder="Digite o código recebido"
          required
        />
      </div>
      <button type="submit">Verificar Código</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loginParam = ref('');
const authCode = ref('');
const showCodeVerification = ref(false);

// Função para enviar o parâmetro de login
const submitLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/person/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ param: loginParam.value }),
    });
    
    if (!response.ok) throw new Error('Erro ao gerar código');
    
    const result = await response.json();
    console.log('Código gerado, ID do usuário:', result.id);
    
    // Exibir o formulário de verificação do código
    showCodeVerification.value = true;
  } catch (error) {
    console.error('Erro:', error);
  }
};

// Função para verificar o código de autenticação
const submitCodeVerification = async () => {
  try {
    const userId = loginParam.value; // Usando o parâmetro de login como ID
    const response = await fetch(`http://localhost:5000/person/auth/code/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authCode.value }),
    });
    
    if (!response.ok) throw new Error('Erro ao verificar código');
    
    const result = await response.json();
    console.log('Resultado da verificação:', result.token);

    // Salvar o token no localStorage
    localStorage.setItem('authToken', result.token);
    
    // Limpar campos após sucesso
    loginParam.value = '';
    authCode.value = '';
    showCodeVerification.value = false;
  } catch (error) {
    console.error('Erro:', error);
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
