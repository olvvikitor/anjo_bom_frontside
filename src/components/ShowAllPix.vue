<template>
  <div class="donations-container">
    <h2>Lista de Doações</h2>
    <table class="donations-table">
      <thead>
        <tr>
          <th>Valor</th>
          <th>Email</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Mensagem</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="donation in donations" :key="donation.id">
          <td>{{ donation.amount | currency }}</td>
          <td>{{ donation.email }}</td>
          <td>{{ donation.name }}</td>
          <td>{{ donation.phone }}</td>
          <td>{{ donation.message }}</td>
          <td>{{ formatDate(donation.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donations: [] // Lista de doações
    };
  },
  created() {
    this.fetchDonations();
  },
  methods: {
    async fetchDonations() {
      try {
        const response = await fetch('http://localhost:5000/admin/show-donates',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adiciona o token de autenticação
          },
        }
        );
     
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.donations = await response.json();
      } catch (error) {
        console.error('Erro ao buscar doações:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  filters: {
    currency(value) {
      if (!value) return '';
      return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    }
  }
};
</script>

<style scoped>
.donations-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.donations-table {
  width: 100%;
  border-collapse: collapse;
}

.donations-table th,
.donations-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.donations-table th {
  background-color: #f4f4f4;
  color: #2c3e50;
}

.donations-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.donations-table tr:hover {
  background-color: #f1f1f1;
}
</style>
