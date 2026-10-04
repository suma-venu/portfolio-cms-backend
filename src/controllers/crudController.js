const pool = require("../config/database");

const getAll = (table) => async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    res.json(result.rows);
  } catch (error) {
    console.error(`GET ${table} error:`, error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getById = (table) => async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM ${table} WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`GET ${table}/id error:`, error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const create = (table, columns) => async (req, res) => {
  try {
    const values = columns.map((column) => req.body[column]);

    const placeholders = columns.map(
      (_, index) => `$${index + 1}`
    );

    const result = await pool.query(
      `INSERT INTO ${table} (${columns.join(", ")})
       VALUES (${placeholders.join(", ")})
       RETURNING *`,
      values
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(`POST ${table} error:`, error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const update = (table, columns) => async (req, res) => {
  try {
    const { id } = req.params;

    const values = columns.map((column) => req.body[column]);

    const setClause = columns.map(
      (column, index) => `${column} = $${index + 1}`
    );

    values.push(id);

    const result = await pool.query(
      `UPDATE ${table}
       SET ${setClause.join(", ")}
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`PUT ${table} error:`, error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const remove = (table) => async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Deleted successfully",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(`DELETE ${table} error:`, error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};