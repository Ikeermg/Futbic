(function () {
  class UsuarioModel {
    constructor(usersKey, sessionKey) {
      this.usersKey = usersKey;
      this.sessionKey = sessionKey;
    }

    getUsuarios() {
      const saved = localStorage.getItem(this.usersKey);
      return saved ? JSON.parse(saved) : [];
    }

    saveUsuarios(usuarios) {
      localStorage.setItem(this.usersKey, JSON.stringify(usuarios));
    }

    getUsuarioActivo() {
      const saved = localStorage.getItem(this.sessionKey);
      return saved ? JSON.parse(saved) : null;
    }

    register(nombre, email, password, equipoFavorito) {
      const usuarios = this.getUsuarios();
      const normalizedEmail = email.trim().toLowerCase();
      const exists = usuarios.some((usuario) => usuario.email === normalizedEmail);

      if (exists) {
        return { success: false, message: "Ya existe un usuario con ese email." };
      }

      const usuario = {
        id: Date.now(),
        nombre: nombre.trim(),
        email: normalizedEmail,
        password,
        equipoFavorito
      };

      usuarios.push(usuario);
      this.saveUsuarios(usuarios);
      this.setUsuarioActivo(usuario);

      return { success: true, usuario };
    }

    login(email, password) {
      const normalizedEmail = email.trim().toLowerCase();
      const usuario = this.getUsuarios().find((item) => {
        return item.email === normalizedEmail && item.password === password;
      });

      if (!usuario) {
        return { success: false, message: "Email o contrasena incorrectos." };
      }

      this.setUsuarioActivo(usuario);
      return { success: true, usuario };
    }

    logout() {
      localStorage.removeItem(this.sessionKey);
    }

    setUsuarioActivo(usuario) {
      localStorage.setItem(this.sessionKey, JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        equipoFavorito: usuario.equipoFavorito || ""
      }));
    }
  }

  window.UsuarioModel = UsuarioModel;
})();
