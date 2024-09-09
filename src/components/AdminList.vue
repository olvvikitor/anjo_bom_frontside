<template>
  <div class="admin-list">
    <h2>Lista de Administradores</h2>
    <ul v-if="admins.length">
      <li v-for="admin in admins" :key="admin._id" class="admin-item">
        <strong>Nome:</strong> {{ admin.name }}<br />
        <strong>Email:</strong> {{ admin.email }}<br />
        <strong>Criado em:</strong> {{ new Date(admin.created_at).toLocaleString() }}<br />
        <button 
          @click="deactivateAdmin(admin._id)" 
          class="deactivate-btn"
          :disabled="isLoading" 
        >
          Inativar
        </button>
      </li>
    </ul>
    <p v-else>Carregando...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admins: [], // Array para armazenar os administradores
      isLoading: false, // Variável para controlar o estado de carregamento
    }
  },
  created() {
    this.fetchAdmins()
  },
  methods: {
    async fetchAdmins() {
      try {
        const response = await fetch('http://localhost:5000/admin/show-all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adiciona o token de autenticação
          },
        })

        if (!response.ok) {
          throw new Error('Falha na requisição')
        }

        const data = await response.json()
        this.admins = data // Armazena os administradores no estado do componente
      } catch (error) {
        console.error('Erro ao buscar administradores:', error)
      }
    },
    async deactivateAdmin(adminId) {
      this.isLoading = true;  // Inicia o carregamento
      try {
        const response = await fetch(`http://localhost:5000/admin/revogue/${adminId}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adiciona o token de autenticação
          },
        });

        if (!response.ok) {
          throw new Error('Falha na requisição para inativar administrador');
        }

        // Atualiza a lista de administradores após a inativação
        await this.fetchAdmins();
      } catch (error) {
        console.error('Erro ao inativar administrador:', error);
      } finally {
        this.isLoading = false; // Finaliza o carregamento
      }
    }
  }
}
</script>

<style scoped>
.admin-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  border: 1px solid #ddd;
}

h2 {
  text-align: center;
  color: #333;
}

.admin-item {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
}

.admin-item strong {
  color: #555;
}

.deactivate-btn {
  display: block;
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.deactivate-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.deactivate-btn:hover {
  background-color: #c0392b;
}
</style>
