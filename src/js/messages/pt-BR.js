// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

module.exports = {
  Activity: {
    status: 'Status',
    name: 'Nome',
    time: 'Data',
    state: 'Estado',
    category: 'Categoria',
    resource: 'Recurso',
    filter: {
      error: 'Erro',
      warning: 'Alerta',
      ok: 'OK',
      unknown: 'Desconhecido',
      active: 'Ativo',
      cleared: 'Livre',
      running: 'Executando',
      completed: 'Completo',
      alerts: 'Alertas',
      tasks: 'Tarefas'
    }
  },
  Index: {
    name: 'Nome'
  },
  IndexFilters: {
    all: 'Todos',
    filters: '{quantity, plural,\n  =0 {Filtros}\n  =1 {um filtro}\n  other {# filtros}\n}'
  },
  IndexHeader: {
    search: 'Buscar'
  },
  Task: {
    unknown: 'Desconhecido'
  },
  LoginForm: {
    btn_label: 'Logar',
    username: 'Usuário',
    password: 'Senha',
    rememberMe: 'Lembrar Usuário'
  },
  Search: {
    placeHolder: 'Buscar'
  },
  Session: {
    logout: 'Deslogar'
  },
  LOGIN_INVALID_PASSWORD: 'Por Favor, informe Usuário e Senha.'
};
