package com.labsystem.services;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.EmptyResultDataAccessException;

@Service
public class ExamTableService {

    public int getNextExamNumber() {
        String query = "SELECT table_name " +
                "FROM information_schema.tables " +
                "WHERE table_name LIKE 'examen%' " +
                "ORDER BY table_name DESC " +
                "LIMIT 1";
        try {
            String lastTableName = jdbcTemplate.queryForObject(query, String.class);
            int lastTableNumber = Integer.parseInt(lastTableName.replace("examen", ""));
            return lastTableNumber + 1;
        } catch (EmptyResultDataAccessException e) {
            // No tables found, handle the case here
            return 1; // or any other default value you want to set
        }
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String generateCreateTableQuery(String json) {
        JSONObject jsonObject = new JSONObject(json);
        String examName = jsonObject.getString("nombreExamen");
        String examName2 = "examen" + getNextExamNumber();
        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("CREATE TABLE " + examName2 + " (id SERIAL PRIMARY KEY, paciente_id INTEGER REFERENCES pacientes(id), nombre_examen VARCHAR(50)");
        int i = 1;
        while (jsonObject.has("nombreCampo" + i)) {
            String fieldType = jsonObject.getString("tipoCampo" + i);
            if (!"Texto".equals(fieldType) && !"Numérico".equals(fieldType) && !"Fecha".equals(fieldType) && !"EnteroPositivo".equals(fieldType)) {
                throw new IllegalArgumentException("El tipo de campo '" + fieldType + "' no es válido. Debe ser 'Texto', 'Numérico', 'Fecha' o 'EnteroPositivo'.");
            }
            queryBuilder.append(", " + ("campo" + i) + " VARCHAR(50)");
            if ("Texto".equals(fieldType)) {
                queryBuilder.append(", " + ("campo" + i + "_tipo") + " VARCHAR(255)");
            } else if ("Numérico".equals(fieldType)) {
                queryBuilder.append(", " + ("campo" + i + "_tipo") + " NUMERIC");
            } else if ("Fecha".equals(fieldType)) {
                queryBuilder.append(", " + ("campo" + i + "_tipo") + " DATE");
            } else if ("EnteroPositivo".equals(fieldType)) {
                queryBuilder.append(", " + ("campo" + i + "_tipo") + " INTEGER CHECK (" + ("campo" + i + "_tipo") + " >= 0)");
            }
            i++;
        }
        queryBuilder.append(", fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP)" +
                ";");
        queryBuilder.append(" INSERT INTO " + examName2 + " (nombre_examen, ");
        int j = 1;
        while (jsonObject.has("nombreCampo" + j)) {
            queryBuilder.append(("campo" + j));
            j++;
            if (jsonObject.has("nombreCampo" + j)) {
                queryBuilder.append(", ");
            }
        }
        queryBuilder.append(")");
        queryBuilder.append(" VALUES " + " ('" + examName + "'");
        int k = 1;
        while (jsonObject.has("nombreCampo" + k)) {
            String fieldName = jsonObject.getString("nombreCampo" + k);
            queryBuilder.append(", '" + fieldName + "'");
            k++;
        }
        queryBuilder.append(");");
        return queryBuilder.toString();
    }

}
