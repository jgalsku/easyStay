import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      persona: Model,
      recepcionista: Model,
      reserva: Model,
      cliente: Model,
      pago: Model,
      hotel: Model,
      habitacion: Model,
    },

    seeds(server) {
      // Aquí puedes poblar tus tablas con datos de ejemplo.
      server.create('persona', {
        personaID: '1',
        personaNombre: 'Carlos',
        personaApellido: 'Pérez',
        personaEmail: 'carlos@example.com',
        personaTelefono: '987654321',
        tipoCuenta: 'cliente',
        password: 'password123'
      });
      server.create('hotel', {
        hotelID: '1',
        nombreHotel: 'Pacific Reef Hotel',
        numeroHabitaciones: 20,
        ubicacionHotel: 'Chile'
      });
      // Agrega más seeds para las demás tablas según sea necesario.
    },

    routes() {
      this.namespace = 'api';

      // Ruta para obtener los detalles de una persona
      this.get('/personas/:id', (schema, request) => {
        let id = request.params.id;
        return schema.personas.find(id);
      });

      // Ruta para obtener todos los hoteles
      this.get('/hoteles', (schema) => {
        return schema.hoteles.all();
      });

      // Ruta para registrar una nueva reserva
      this.post('/reservas', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.reservas.create(attrs);
      });

      // Otras rutas basadas en tus necesidades
      this.post('/personas', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.personas.create(attrs);
      });
      
      this.get('/reservas/:id', (schema, request) => {
        let id = request.params.id;
        return schema.reservas.find(id);
      });

      // Puedes añadir más rutas para manejar pagos, clientes, etc.
    },
  });

  return server;
}
