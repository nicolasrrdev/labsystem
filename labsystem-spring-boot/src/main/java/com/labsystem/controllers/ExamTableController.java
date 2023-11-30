package com.labsystem.controllers;

import com.labsystem.services.ExamTableService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ExamTableController {

    @Autowired
    private ExamTableService examTableService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/generateTable")
    public ResponseEntity<Object> generateTable(@RequestBody String json) {
        String query = examTableService.generateCreateTableQuery(json);

        jdbcTemplate.execute(query);

        JSONObject responseJson = new JSONObject();
        responseJson.put("query", query);

        // return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
        return new ResponseEntity<>("El examen ha sido creado correctamente.", HttpStatus.CREATED);
    }

    @PostMapping("/insertData/{tableName}")
    public ResponseEntity<Object> insertData(@PathVariable String tableName, @RequestBody String json) {
        String query = "INSERT INTO " + tableName + " (paciente_id";
        JSONObject jsonObject = new JSONObject(json);
        int i = 1;
        while (jsonObject.has("campo" + i + "_tipo")) {
            query += ", campo" + i + "_tipo";
            i++;
        }
        query += ") VALUES (" + jsonObject.getInt("paciente_id");
        int j = 1;
        while (jsonObject.has("campo" + j + "_tipo")) {
            String fieldName = "campo" + j + "_tipo";
            Object fieldValue = jsonObject.get(fieldName);
            if (fieldValue instanceof String) {
                query += ", '" + fieldValue + "'";
            } else {
                query += ", " + fieldValue;
            }
            j++;
        }
        query += ");";

        jdbcTemplate.execute(query);

        JSONObject responseJson = new JSONObject();
        responseJson.put("query", query);

        // return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
        return new ResponseEntity<>("Registro realizado con éxito.", HttpStatus.CREATED);
    }

    @GetMapping("/examTablesCount")
    public ResponseEntity<Object> getExamTablesCount() {
        String query = "SELECT COUNT(*) FROM information_schema.tables WHERE table_name LIKE 'examen%';";
        int count = jdbcTemplate.queryForObject(query, Integer.class);

        JSONObject responseJson = new JSONObject();
        responseJson.put("count", count);

        return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
    }

    @GetMapping("/examen/nombreExamen")
    public ResponseEntity<Object> getNombreExamen() {
        List<String> nombresExamenes = new ArrayList<>();
        List<String> nombresTablas = new ArrayList<>();
        int examNumber = 1;
        int examTablesCount = getExamTablesCount().getStatusCodeValue();
        while (examNumber <= examTablesCount) {
            String tableName = "examen" + examNumber;
            String query = "SELECT nombre_examen FROM " + tableName + " WHERE id=1";
            if (isTableExists(tableName)) {
                try {
                    String nombreExamen = jdbcTemplate.queryForObject(query, String.class);
                    nombresExamenes.add(nombreExamen);
                    nombresTablas.add(tableName);
                } catch (EmptyResultDataAccessException e) {
                }
            }
            examNumber++;
        }
        JSONObject responseJson = new JSONObject();
        responseJson.put("nombres_examenes", nombresExamenes);
        responseJson.put("nombres_tablas", nombresTablas);
        return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
    }

    @GetMapping("/exam/{tableName}")
    public ResponseEntity<Object> getTableData(@PathVariable String tableName) {
        if (!isTableExists(tableName)) {
            // Devuelve una respuesta de error si la tabla no existe
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Tabla no encontrada");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        String query = "SELECT * FROM " + tableName + " LIMIT 1";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);

        if (rows.isEmpty()) {
            // Si no hay filas en la tabla, devolver un objeto vacío
            return new ResponseEntity<>(new JSONObject().toMap(), HttpStatus.OK);
        }

        Map<String, Object> firstRow = rows.get(0);
        Map<String, Object> responseMap = new HashMap<>();
        for (String key : firstRow.keySet()) {
            if (key.startsWith("campo") && !key.endsWith("_tipo")) {
                responseMap.put(key, firstRow.get(key));
            }
        }

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @GetMapping("/exam/{tableName}/numFields")
    public ResponseEntity<Object> getNumFields(@PathVariable String tableName) {
        if (!isTableExists(tableName)) {
            // Devuelve una respuesta de error si la tabla no existe
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Tabla no encontrada");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        // Obtener los metadatos de la tabla para obtener el número de campos
        String query = "SELECT COUNT(*) AS numFields FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND COLUMN_NAME LIKE 'campo%' AND COLUMN_NAME NOT LIKE 'campo%_tipo'";
        Integer numFields = jdbcTemplate.queryForObject(query, Integer.class, tableName);

        // Crear el objeto de respuesta
        JSONObject responseJson = new JSONObject();
        responseJson.put("numFields", numFields);

        return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
    }

    @GetMapping("/examen/{tableName}/tiposCampos")
    public ResponseEntity<Object> getTiposCampos(@PathVariable String tableName) {
        if (!isTableExists(tableName)) {
            // Devuelve una respuesta de error si la tabla no existe
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Tabla no encontrada");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        String query = "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ? AND column_name LIKE 'campo%_tipo'";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, tableName);

        Map<String, Object> responseMap = new TreeMap<>();
        for (Map<String, Object> row : rows) {
            String columnName = (String) row.get("column_name");
            String dataType = (String) row.get("data_type");
            responseMap.put(columnName, dataType);
        }

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    private boolean isTableExists(String tableName) {
        String query = "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = ?";
        int count = jdbcTemplate.queryForObject(query, Integer.class, tableName);
        return count > 0;
    }

    @GetMapping("/exam/{tableName}/paciente/{pacienteId}")
    public ResponseEntity<Object> getPacienteRegistros(@PathVariable String tableName, @PathVariable int pacienteId) {
        if (!isTableExists(tableName)) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Examen no encontrado");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        String query = "SELECT * FROM " + tableName + " WHERE paciente_id = ?";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, pacienteId);

        if (rows.isEmpty()) {
            JSONObject errorJson = new JSONObject();
            // errorJson.put("error", "No se encontraron registros para el paciente con paciente_id = " + pacienteId);
            errorJson.put("error", "No se encontraron registros para este paciente");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        List<Map<String, Object>> pacienteRegistros = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            Map<String, Object> registroMap = new HashMap<>();
            for (String key : row.keySet()) {
                registroMap.put(key, row.get(key));
            }
            pacienteRegistros.add(registroMap);
        }

        return new ResponseEntity<>(pacienteRegistros, HttpStatus.OK);
    }

    @PostMapping("/exam/{tableName}/update/{id}")
    public ResponseEntity<Object> updateRecord(@PathVariable String tableName, @PathVariable int id, @RequestBody String json) {
        if (!isTableExists(tableName)) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Tabla no encontrada");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        if (id == 1) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "No se permite actualizar registros con id 1");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.BAD_REQUEST);
        }

        JSONObject jsonObject = new JSONObject(json);
        String updateQuery = "UPDATE " + tableName + " SET ";

        int i = 1;
        while (jsonObject.has("campo" + i + "_tipo")) {
            String fieldName = "campo" + i + "_tipo";
            Object fieldValue = jsonObject.get(fieldName);

            if (i > 1) {
                updateQuery += ", ";
            }

            updateQuery += fieldName + " = ";
            if (fieldValue instanceof String) {
                updateQuery += "'" + fieldValue + "'";
            } else {
                updateQuery += fieldValue;
            }

            i++;
        }

        updateQuery += ", fecha_registro = NOW()";

        updateQuery += " WHERE id = ?";

        int updatedRows = jdbcTemplate.update(updateQuery, id);

        if (updatedRows == 0) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Registro no encontrado con id " + id);
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", "Registro actualizado con éxito");

        return new ResponseEntity<>(responseJson.toMap(), HttpStatus.OK);
    }

    @GetMapping("/exam/{tableName}/record/{id}")
    public ResponseEntity<Object> getRecordById(@PathVariable String tableName, @PathVariable int id) {
        if (!isTableExists(tableName)) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Tabla no encontrada");
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

//        if (id == 1) {
//            JSONObject errorJson = new JSONObject();
//            errorJson.put("error", "No se permite obtener registros con id 1");
//            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.BAD_REQUEST);
//        }

        String query = "SELECT * FROM " + tableName + " WHERE id = ?";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, id);

        if (rows.isEmpty()) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", "Registro no encontrado con id " + id);
            return new ResponseEntity<>(errorJson.toMap(), HttpStatus.NOT_FOUND);
        }

        Map<String, Object> recordMap = rows.get(0);

        return new ResponseEntity<>(recordMap, HttpStatus.OK);
    }

}