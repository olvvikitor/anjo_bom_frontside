<template>
  <div class="events-list">
    <h1>Eventos</h1>
    <div v-if="events.length">
      <div v-for="event in events" :key="event._id" class="event-card">
        <h2>{{ event.titulo }}</h2>
        <p>{{ event.descricao }}</p>

        <div class="photos">
          <h3>Fotos:</h3>
          <div v-if="event.photos.length">
            <img v-for="(photo, index) in event.photos" :key="index" :src="photo" alt="Foto do Evento" class="event-photo" />
          </div>
          <p v-else>Nenhuma foto disponível.</p>
        </div>

        <div class="address">
          <h3>Endereço:</h3>
          <p>{{ event.address.rua }}, {{ event.address.numero }}, {{ event.address.bairro }}, {{ event.address.cidade }} - {{ event.address.estado }}, {{ event.address.cep }}</p>
        </div>

        <div class="dates">
          <p><strong>Data de Início:</strong> {{ formatDate(event.data_inicio) }}</p>
          <p><strong>Data de Fim:</strong> {{ formatDate(event.data_fim) }}</p>
        </div>

        <div class="event-actions">
          <button @click="handleUpdate(event._id)" class="update-button">Atualizar</button>
          <button @click="handleDelete(event._id)" class="delete-button">Excluir</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Não há eventos disponíveis.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [] // Inicialmente vazio; será preenchido com dados de eventos
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:5000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adiciona o token de autenticação
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Ajuste a URL das fotos conforme necessário
        this.events = data.map(event => ({
          ...event,
          photos: event.photos.map(photo => `http://localhost:5000/uploads/${photo}`)
        }));
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    async handleUpdate(eventId) {
      try {
        this.$router.push(`/admin/events/edit/${eventId}`); // Navegar para uma página de edição
      } catch (error) {
        console.error('Erro ao atualizar o evento:', error);
      }
    },
    async handleDelete(eventId) {
      try {
        const response = await fetch(`http://localhost:5000/admin/delete-evento${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adiciona o token de autenticação
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Atualize a lista de eventos após a exclusão
        this.fetchEvents();
      } catch (error) {
        console.error('Erro ao excluir o evento:', error);
      }
    }
  }
};
</script>

<style scoped>
.events-list {
  padding: 20px;
}

.event-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.event-card img.event-photo {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 10px;
  border-radius: 4px;
}

.photos {
  margin-bottom: 20px;
}

.address {
  margin-bottom: 20px;
}

.dates p {
  margin: 5px 0;
}

.event-actions {
  margin-top: 20px;
}

.event-actions button {
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.update-button {
  background-color: #4CAF50; /* Verde para atualizar */
}

.delete-button {
  background-color: #f44336; /* Vermelho para excluir */
}

.update-button:hover {
  background-color: #45a049;
}

.delete-button:hover {
  background-color: #e53935;
}
</style>
