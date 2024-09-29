import { createServer, Model, Response } from 'miragejs';
import hotelsData from './data/hotels.json';
import countriesData from './data/countries.json';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      // Define otros modelos aquí si es necesario
    },

    seeds(server) {
      server.create('user', {
        id: '1',
        email: 'usuario1@ejemplo.com',
        password: 'contraseña1',
        firstName: 'Juan',
        lastName: 'Pérez',
        fullName: 'Juan Pérez',
        phone: '1234567890',
        country: 'EEUU',
        isPhoneVerified: true,
        isEmailVerified: true,
      });
      server.create('user', {
        id: '2',
        email: 'usuario2@ejemplo.com',
        password: 'contraseña2',
        firstName: 'Ana',
        lastName: 'Pérez',
        fullName: 'Ana Pérez',
        phone: '0987654321',
        country: 'Reino Unido',
        isPhoneVerified: false,
        isEmailVerified: true,
      });
    },

    routes() {
      this.namespace = 'api';

      // Añadir un estado de usuario conectado al servidor
      let loggedInUser = null;

      this.passthrough('http://localhost:4000/*');

      this.get('/users/auth-user', () => {
        if (loggedInUser) {
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                isAuthenticated: true,
                userDetails: {
                  id: loggedInUser.id,
                  firstName: loggedInUser.firstName,
                  lastName: loggedInUser.lastName,
                  fullName: loggedInUser.fullName,
                  email: loggedInUser.email,
                  phone: loggedInUser.phone,
                  country: loggedInUser.country,
                  isPhoneVerified: loggedInUser.isPhoneVerified,
                  isEmailVerified: loggedInUser.isEmailVerified,
                },
              },
            }
          );
        } else {
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                isAuthenticated: false,
                userDetails: {},
              },
            }
          );
        }
      });

      this.post('/users/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email: attrs.email });

        if (user && user.password === attrs.password) {
          loggedInUser = user;
          return new Response(
            200,
            {},
            {
              data: {
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBKb2huIiwiaWQiOjEsImlhdCI6MTcwNzU0NTQ5MSwiZXhwIjoxNzA3NTQ5MDkxfQ.dxweIMZGiCuiViov1EfLtu3UwanUMp7TjL85hMDW4rc',
              },
              errors: [],
            }
          );
        } else {
          return new Response(
            404,
            {},
            {
              errors: ['Usuario no encontrado o credenciales inválidas'],
              data: {},
            }
          );
        }
      });

      this.post('/users/logout', (_schema, _request) => {
        loggedInUser = null;
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              status: 'Usuario desconectado exitosamente',
            },
          }
        );
      });

      this.put('/users/register', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const existingUser = schema.users.findBy({ email: attrs.email });

        if (existingUser) {
          return new Response(
            409,
            {},
            { errors: ['El usuario ya existe con ese correo electrónico'] }
          );
        } else {
          // Crear un nuevo usuario
          const newUser = schema.users.create({
            firstName: attrs.firstName,
            lastName: attrs.lastName,
            email: attrs.email,
            phone: attrs.phone,
            password: attrs.password,
          });
          return new Response(
            200,
            {},
            {
              errors: [],
              user: newUser.attrs,
            }
          );
        }
      });

      this.patch('/users/update-profile', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email: loggedInUser.email });

        if (user) {
          user.update(attrs);
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                status: 'Perfil actualizado exitosamente',
              },
            }
          );
        } else {
          return new Response(
            404,
            {},
            {
              errors: ['Usuario no encontrado'],
              data: {},
            }
          );
        }
      });

      this.get('/users/bookings', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  bookingId: 'BKG123',
                  bookingDate: '2024-01-10',
                  hotelName: 'Resort Frente al Mar',
                  checkInDate: '2024-01-20',
                  checkOutDate: '2024-01-25',
                  totalFare: '₹14,500',
                },
                {
                  bookingId: 'BKG124',
                  bookingDate: '2024-01-03',
                  hotelName: 'Retiro en la Montaña',
                  checkInDate: '2024-02-15',
                  checkOutDate: '2024-02-20',
                  totalFare: '₹5,890',
                },
                {
                  bookingId: 'BKG125',
                  bookingDate: '2024-01-11',
                  hotelName: 'Hotel Central Ciudad',
                  checkInDate: '2024-03-01',
                  checkOutDate: '2024-03-05',
                  totalFare: '₹21,700',
                },
              ],
            },
          }
        );
      });

      this.get('/users/payment-methods', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  id: '1',
                  cardType: 'Visa',
                  cardNumber: '**** **** **** 1234',
                  expiryDate: '08/26',
                },
                {
                  id: '2',
                  cardType: 'MasterCard',
                  cardNumber: '**** **** **** 5678',
                  expiryDate: '07/24',
                },
                {
                  id: '3',
                  cardType: 'American Express',
                  cardNumber: '**** **** **** 9012',
                  expiryDate: '05/25',
                },
              ],
            },
          }
        );
      });

      this.get('/hotel/:hotelId/booking/enquiry', (_schema, request) => {
        let hotelId = request.params.hotelId;
        const result = hotelsData.find((hotel) => {
          return Number(hotel.hotelCode) === Number(hotelId);
        });
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              name: result.title,
              cancellationPolicy: 'Cancelación gratuita 1 día antes de la estadía',
              checkInTime: '12:00 PM',
              checkOutTime: '10:00 AM',
              currentNightRate: result.price,
              maxGuestsAllowed: 5,
              maxRoomsAllowedPerGuest: 3,
            },
          }
        );
      });

      // Resto del código continúa de la misma forma.
    },
  });

  return server;
}
