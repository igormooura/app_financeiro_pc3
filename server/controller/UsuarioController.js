const Usuario = require("../model/Usuario.js");
const Auth = require("../model/AuthPerfil.js");

exports.getAllPerfis = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users." });
  }
};

exports.getPerfilById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user." });
  }
};

exports.getPerfilByIdMain = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await Auth.findById(id);
    new_id = auth.usuarioId;
    const usuario = await Usuario.findById(new_id);

    if (!usuario) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user." });
  }
};

exports.updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await Auth.findById(id);
    new_id = auth.usuarioId;
    const { nome, apelido, email, genero, country, cpf, telefone } = req.body;
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      new_id,
      { nome, apelido, email, genero, country, cpf, telefone },
      { new: true, runValidators: true }
    );
    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
};

exports.deletePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await Usuario.findByIdAndDelete(id);
    if (!usuarioDeletado) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user." });
  }
};
