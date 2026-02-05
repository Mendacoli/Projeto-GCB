# Sistema Interno de Gestão — Grupo GCB

Sistema web que modela um ambiente interno corporativo para gestão de colaboradores e solicitações internas, inspirado em necessidades reais de uma empresa de investimentos.

O projeto demonstra boas práticas de desenvolvimento, integração frontend/backend, regras de negócio e autenticação, utilizando tecnologias modernas amplamente usadas no mercado.

---

## O que o sistema faz

Permite que a empresa:

- Gerencie colaboradores internos
- Registre solicitações operacionais
- Controle o status das solicitações (Aberta, Em andamento, Concluída)
- Associe cada ação ao usuário autenticado
- Trabalhe com dados de forma segura e organizada

Exemplos reais de uso:
- Solicitações internas de RH
- Demandas operacionais entre equipes
- Registro e acompanhamento de processos internos

---

## Funcionalidades

- Autenticação por token
- CRUD completo de colaboradores
- CRUD completo de solicitações internas
- Controle de status das solicitações
- Associação de dados ao usuário logado
- Paginação no backend e frontend
- Interface corporativa e consistente

---

## Tecnologias Utilizadas

### Backend
- Python 3.11
- Django 5
- Django Rest Framework
- SQLite (desenvolvimento)
- Token Authentication
- CORS Headers

### Frontend
- JavaScript (ES6+)
- Next.js (App Router)
- React
- Tailwind CSS
- Fetch API

### Outros
- Git & GitHub
- VS Code
- PowerShell
- Postman / Curl

---

## Arquitetura

- Separação clara entre frontend e backend
- Comunicação via API REST
- Código organizado e legível
- Regras de negócio bem definidas
- Estrutura preparada para crescimento

---

## Escalabilidade

O sistema foi projetado para evolução futura, podendo receber módulos como:
- Aprovação hierárquica
- Dashboards e relatórios
- Integração com outros sistemas internos
- Migração para PostgreSQL, MySQL ou SQL Server

---

## Como executar

### Backend
```bash
cd backend
.\venv\Scripts\Activate.ps1
python manage.py migrate
python manage.py runserver


cd frontend
npm install
npm run dev
