(function () {
  const userModel = new window.UsuarioModel(
    window.FutbicConfig.usersKey,
    window.FutbicConfig.sessionKey
  );
  const model = new window.PartidoModel(window.FutbicConfig.matchesKey);
  const viewModel = new window.PartidoViewModel(model);

  const registerForm = document.querySelector("#registerForm");
  const loginForm = document.querySelector("#loginForm");
  const registerMessage = document.querySelector("#registerMessage");
  const loginMessage = document.querySelector("#loginMessage");
  const userSession = document.querySelector("#userSession");
  const authSection = document.querySelector("#acceso");
  const activeUserName = document.querySelector("#activeUserName");
  const logoutButton = document.querySelector("#logoutButton");
  const appSection = document.querySelector("#appSection");
  const historySection = document.querySelector("#historial");
  const form = document.querySelector("#matchForm");
  const filterText = document.querySelector("#filterText");
  const matchesTable = document.querySelector("#matchesTable");
  const emptyState = document.querySelector("#emptyState");
  const localPreview = document.querySelector("#localPreview");
  const visitorPreview = document.querySelector("#visitorPreview");
  const fields = [
    "liga",
    "fecha",
    "hora",
    "equipoLocal",
    "equipoVisitante",
    "golesLocal",
    "golesVisitante",
    "lugar",
    "valoracion"
  ];

  let activeUser = userModel.getUsuarioActivo();

  function getLigaConfig(ligaKey = form.liga.value) {
    return window.FutbicConfig.ligas[ligaKey] || window.FutbicConfig.ligas.laliga;
  }

  function fillTeamSelects() {
    const liga = getLigaConfig();
    const matchSelects = [form.equipoLocal, form.equipoVisitante];

    matchSelects.forEach((select) => {
      const firstOptionText = select.id === "equipoLocal" ? "Selecciona equipo local" : "Selecciona equipo visitante";
      select.innerHTML = `<option value="">${firstOptionText}</option>`;

      liga.equipos.forEach((equipo) => {
        const option = document.createElement("option");
        option.value = equipo.nombre;
        option.textContent = equipo.nombre;
        select.appendChild(option);
      });
    });

  }

  function fillFavoriteTeamSelect() {
    registerForm.registerFavoriteTeam.innerHTML = '<option value="">Selecciona tu equipo</option>';

    Object.values(window.FutbicConfig.ligas).forEach((liga) => {
      const group = document.createElement("optgroup");
      group.label = liga.nombre;

      liga.equipos.forEach((equipo) => {
        const option = document.createElement("option");
        option.value = equipo.nombre;
        option.textContent = equipo.nombre;
        group.appendChild(option);
      });

      registerForm.registerFavoriteTeam.appendChild(group);
    });
  }

  function getEquipo(nombre) {
    return window.FutbicConfig.equipos.find((equipo) => equipo.nombre === nombre);
  }

  function getInitials(nombre) {
    return nombre
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }

  function getCrestMarkup(nombre) {
    const equipo = getEquipo(nombre);

    if (!equipo) {
      return `<span class="crest-fallback">${getInitials(nombre || "?")}</span>`;
    }

    return `
      <img
        class="team-crest"
        src="${equipo.escudo}"
        alt="Escudo de ${equipo.nombre}"
        onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'crest-fallback', textContent: '${getInitials(equipo.nombre)}' }))"
      >
    `;
  }

  function updateTeamPreview(select, preview, emptyText) {
    const equipo = getEquipo(select.value);

    if (!equipo) {
      preview.innerHTML = `<span class="crest-fallback">${emptyText[0]}</span><span>${emptyText}</span>`;
      return;
    }

    preview.innerHTML = `${getCrestMarkup(equipo.nombre)}<span>${equipo.nombre}</span>`;
  }

  function setMessage(element, message, type) {
    element.textContent = message;
    element.classList.remove("is-error", "is-success");

    if (type) {
      element.classList.add(type);
    }
  }

  function validateAccess(nombre, email, password, equipoFavorito = "ok") {
    if (nombre !== null && !nombre.trim()) {
      return "El nombre es obligatorio.";
    }

    if (!email.trim()) {
      return "El email es obligatorio.";
    }

    if (!email.includes("@")) {
      return "Introduce un email valido.";
    }

    if (!password || password.length < 4) {
      return "La contrasena debe tener al menos 4 caracteres.";
    }

    if (!equipoFavorito) {
      return "Selecciona tu equipo favorito.";
    }

    return "";
  }

  function getFormData() {
    return {
      fecha: form.fecha.value,
      hora: form.hora.value,
      liga: form.liga.value,
      ligaNombre: getLigaConfig().nombre,
      equipoLocal: form.equipoLocal.value,
      equipoVisitante: form.equipoVisitante.value,
      golesLocal: form.golesLocal.value,
      golesVisitante: form.golesVisitante.value,
      lugar: form.lugar.value,
      valoracion: form.valoracion.value,
      observaciones: form.observaciones.value
    };
  }

  function clearErrors() {
    fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);
      const error = document.querySelector(`#${field}Error`);

      input.closest(".field").classList.remove("has-error");
      error.textContent = "";
    });
  }

  function showErrors(errors) {
    clearErrors();

    Object.entries(errors).forEach(([field, message]) => {
      const input = document.querySelector(`#${field}`);
      const error = document.querySelector(`#${field}Error`);

      input.closest(".field").classList.add("has-error");
      error.textContent = message;
    });
  }

  function formatDate(dateValue) {
    return new Intl.DateTimeFormat("es-ES").format(new Date(`${dateValue}T00:00:00`));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderPartidos() {
    const partidos = viewModel.getPartidos(filterText.value);
    matchesTable.innerHTML = "";

    partidos.forEach((partido) => {
      const row = document.createElement("tr");
      const ganador = viewModel.getGanador(partido);
      const winnerClass = ganador === "Empate" ? "is-draw" : "is-winner";

      row.innerHTML = `
        <td>${formatDate(partido.fecha)}<br><small>${partido.hora}</small></td>
        <td>${partido.ligaNombre || getLigaConfig(partido.liga).nombre}</td>
        <td>
          <span class="match-name">
            ${getCrestMarkup(partido.equipoLocal)}
            ${partido.equipoLocal}
            <strong>vs</strong>
            ${getCrestMarkup(partido.equipoVisitante)}
            ${partido.equipoVisitante}
          </span>
          ${partido.observaciones ? `<span class="match-notes">Observaciones: ${escapeHtml(partido.observaciones)}</span>` : ""}
          <span class="match-notes">Valoracion: ${partido.valoracion || "-"} / 5</span>
        </td>
        <td>
          <strong>${partido.golesLocal} - ${partido.golesVisitante}</strong>
          <span class="result-badge ${winnerClass}">${ganador === "Empate" ? "Empate" : `Ganador: ${ganador}`}</span>
        </td>
        <td>${partido.lugar}</td>
        <td><button class="delete-button" type="button" data-id="${partido.id}">Eliminar</button></td>
      `;
      matchesTable.appendChild(row);
    });

    emptyState.classList.toggle("is-hidden", partidos.length > 0);
  }

  function renderEstadisticas() {
    const stats = viewModel.getEstadisticas(activeUser ? activeUser.equipoFavorito : "");

    document.querySelector("#totalPartidos").textContent = stats.totalPartidos;
    document.querySelector("#totalGoles").textContent = stats.totalGoles;
    document.querySelector("#promedioGoles").textContent = stats.promedioGoles;
    document.querySelector("#lugarHabitual").textContent = stats.lugarHabitual;
    document.querySelector("#equipoFavorito").textContent = stats.equipoFavorito;
    document.querySelector("#partidosFavorito").textContent = stats.partidosFavorito;
    document.querySelector("#equipoMasVisto").textContent = stats.equipoMasVisto;
    document.querySelector("#mayorGoleada").textContent = stats.mayorGoleada;
    document.querySelector("#valoracionMedia").textContent = stats.valoracionMedia === "-" ? "-" : `${stats.valoracionMedia}/5`;
    document.querySelector("#heroTotal").textContent = stats.totalPartidos;
    document.querySelector("#heroGoals").textContent = stats.totalGoles;
  }

  function renderApp() {
    renderUserState();
    renderPartidos();
    renderEstadisticas();
  }

  function renderUserState() {
    const isLogged = Boolean(activeUser);

    authSection.classList.toggle("is-hidden", isLogged);
    appSection.classList.toggle("is-disabled", !isLogged);
    historySection.classList.toggle("is-disabled", !isLogged);
    userSession.classList.toggle("is-hidden", !isLogged);
    activeUserName.textContent = isLogged ? `${activeUser.nombre} (${activeUser.email}) - ${activeUser.equipoFavorito || "Sin favorito"}` : "";

    if (isLogged) {
      viewModel.setUser(activeUser.id);
      return;
    }

    viewModel.setUser(null);
  }

  function startSession(usuario) {
    activeUser = usuario;
    filterText.value = "";
    clearErrors();
    form.reset();
    form.golesLocal.value = 0;
    form.golesVisitante.value = 0;
    fillTeamSelects();
    updateTeamPreview(form.equipoLocal, localPreview, "Equipo local");
    updateTeamPreview(form.equipoVisitante, visitorPreview, "Equipo visitante");
    renderApp();
  }

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = validateAccess(
      registerForm.registerName.value,
      registerForm.registerEmail.value,
      registerForm.registerPassword.value,
      registerForm.registerFavoriteTeam.value
    );

    if (message) {
      setMessage(registerMessage, message, "is-error");
      return;
    }

    const result = userModel.register(
      registerForm.registerName.value,
      registerForm.registerEmail.value,
      registerForm.registerPassword.value,
      registerForm.registerFavoriteTeam.value
    );

    if (!result.success) {
      setMessage(registerMessage, result.message, "is-error");
      return;
    }

    setMessage(registerMessage, "Cuenta creada correctamente.", "is-success");
    setMessage(loginMessage, "", "");
    registerForm.reset();
    startSession(result.usuario);
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = validateAccess(
      null,
      loginForm.loginEmail.value,
      loginForm.loginPassword.value
    );

    if (message) {
      setMessage(loginMessage, message, "is-error");
      return;
    }

    const result = userModel.login(loginForm.loginEmail.value, loginForm.loginPassword.value);

    if (!result.success) {
      setMessage(loginMessage, result.message, "is-error");
      return;
    }

    setMessage(loginMessage, "Sesion iniciada correctamente.", "is-success");
    setMessage(registerMessage, "", "");
    loginForm.reset();
    startSession(result.usuario);
  });

  logoutButton.addEventListener("click", () => {
    userModel.logout();
    activeUser = null;
    renderApp();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!activeUser) {
      return;
    }

    const result = viewModel.addPartido(getFormData());

    if (!result.success) {
      showErrors(result.errors);
      return;
    }

    clearErrors();
    const selectedLiga = form.liga.value;
    form.reset();
    form.liga.value = selectedLiga;
    form.golesLocal.value = 0;
    form.golesVisitante.value = 0;
    fillTeamSelects();
    renderApp();
  });

  form.addEventListener("reset", () => {
    clearErrors();
    setTimeout(() => {
      fillTeamSelects();
      updateTeamPreview(form.equipoLocal, localPreview, "Equipo local");
      updateTeamPreview(form.equipoVisitante, visitorPreview, "Equipo visitante");
    }, 0);
  });

  form.liga.addEventListener("change", () => {
    fillTeamSelects();
    updateTeamPreview(form.equipoLocal, localPreview, "Equipo local");
    updateTeamPreview(form.equipoVisitante, visitorPreview, "Equipo visitante");
  });

  form.equipoLocal.addEventListener("change", () => {
    updateTeamPreview(form.equipoLocal, localPreview, "Equipo local");
  });

  form.equipoVisitante.addEventListener("change", () => {
    updateTeamPreview(form.equipoVisitante, visitorPreview, "Equipo visitante");
  });

  filterText.addEventListener("input", renderPartidos);

  matchesTable.addEventListener("click", (event) => {
    if (!event.target.matches(".delete-button")) {
      return;
    }

    viewModel.deletePartido(Number(event.target.dataset.id));
    renderApp();
  });

  fillTeamSelects();
  fillFavoriteTeamSelect();
  updateTeamPreview(form.equipoLocal, localPreview, "Equipo local");
  updateTeamPreview(form.equipoVisitante, visitorPreview, "Equipo visitante");
  renderApp();
})();
