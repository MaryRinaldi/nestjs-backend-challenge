import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>API - Tracker Progetti High Tech</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            margin: auto; 
            max-width: 800px; 
            padding: 2rem; 
            background-color: #f4f7f6; 
            color: #333; 
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container { 
            text-align: center; 
            background-color: #ffffff; 
            padding: 2.5rem 3rem; 
            border-radius: 10px; 
            box-shadow: 0 6px 12px rgba(0,0,0,0.1); 
          }
          h1 { 
            color: #005f73; 
            font-size: 2rem;
          }
          p { 
            font-size: 1.1rem; 
            line-height: 1.6; 
          }
          a.button { 
            display: inline-block; 
            background-color: #0a9396; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            font-weight: bold; 
            margin-top: 25px; 
            transition: background-color 0.3s, transform 0.2s; 
          }
          a.button:hover { 
            background-color: #005f73;
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Benvenuto/a nell'API del Tracker di Progetti Ingegneristici</h1>
          <p>Questo è il punto di accesso del servizio backend. La documentazione completa e interattiva si trova al link qui sotto.</p>
          <a href="/api-docs" class="button">Vai alla Documentazione API</a>
        </div>
      </body>
      </html>
    `;
  }
}