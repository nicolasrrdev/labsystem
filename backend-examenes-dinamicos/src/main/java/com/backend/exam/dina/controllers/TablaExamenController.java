package com.backend.exam.dina.controllers;
import com.backend.exam.dina.models.Paciente;
import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.models.TablaExamenCampo;
import com.backend.exam.dina.repositories.TablaExamenRepository;
import com.backend.exam.dina.services.PacienteService;
import com.backend.exam.dina.services.TablaExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/tabla_examen")
public class TablaExamenController {
    private final TablaExamenService tablaExamenService;
    @Value("${examFields}")
    private int examFields;
    @Autowired
    public TablaExamenController(TablaExamenService tablaExamenService) {
        this.tablaExamenService = tablaExamenService;
    }
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private TablaExamenRepository tablaExamenRepository;

    @PostMapping("/post/{pacienteId}")
    public ResponseEntity<String> insertarTablaExamen(@RequestBody List<String> valores, @PathVariable Integer pacienteId) {
        if (valores.size() != examFields) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Debe proporcionar " + examFields + " valores");
        }
        Paciente paciente = pacienteService.obtenerPacientePorId(pacienteId);
        if (paciente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Paciente no encontrado");
        }
        LocalDateTime currentDateTime = LocalDateTime.now();
        TablaExamen tablaExamen = new TablaExamen();
        tablaExamen.setPaciente(paciente);
        tablaExamen.setTimestamp(currentDateTime);
        List<TablaExamenCampo> campos = new ArrayList<>();
        for (String valor : valores) {
            TablaExamenCampo campo = new TablaExamenCampo();
            campo.setCampo(valor);
            campo.setTablaExamen(tablaExamen);
            campos.add(campo);
        }
        tablaExamen.setCampos(campos);
        tablaExamenService.insertarTablaExamen(tablaExamen);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registro exitoso");
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> obtenerTodosRegistros() {
        List<TablaExamen> tablaExamenes = tablaExamenService.obtenerTodosTablaExamen();
        if (tablaExamenes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("mensaje", "No se encontraron registros"));
        }
        List<LinkedHashMap<String, String>> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        for (TablaExamen tablaExamen : tablaExamenes) {
            LinkedHashMap<String, String> examenData = new LinkedHashMap<>();
            examenData.put("id", String.valueOf(tablaExamen.getId()));
            examenData.put("timestamp", tablaExamen.getTimestamp().format(formatter));
            examenData.put("paciente_id", String.valueOf(tablaExamen.getPaciente().getId()));
            result.add(examenData);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
    }
    @GetMapping("/get/timestamp/{pacienteId}")
    public ResponseEntity<List<String>> obtenerRegistrosPorPaciente(@PathVariable Integer pacienteId) {
        List<TablaExamen> tablaExamenes = tablaExamenService.obtenerTablaExamenPorPacienteId(pacienteId);
        if (tablaExamenes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonList("No se encontraron registros para el paciente con el ID proporcionado"));
        }
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<String> timestamps = tablaExamenes.stream()
                .map(tablaExamen -> tablaExamen.getTimestamp().format(formatter))
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK)
                .body(timestamps);
    }
    @GetMapping("/_campos/get/{tablaExamenId}")
    public ResponseEntity<?> consultarTablaExamen(@PathVariable Integer tablaExamenId) {
        TablaExamen tablaExamen = tablaExamenService.obtenerTablaExamenPorId(tablaExamenId);
        if (tablaExamen == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró el registro con el ID suministrado");
        }
        List<TablaExamenCampo> campos = tablaExamen.getCampos();
        campos.sort(Comparator.comparingInt(TablaExamenCampo::getId));
        List<Map<String, Object>> camposData = new ArrayList<>();
        for (TablaExamenCampo campo : campos) {
            Map<String, Object> campoData = new LinkedHashMap<>();
            campoData.put("id", campo.getId());
            campoData.put("campo", campo.getCampo());
            campoData.put("tabla_examen_id", campo.getTablaExamen().getId());
            camposData.add(campoData);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(camposData);
    }
    @GetMapping("/_campos/get/all")
    public ResponseEntity<?> obtenerTodosCampos() {
        List<TablaExamenCampo> campos = tablaExamenRepository.findAllCampos();
        if (campos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron registros en tabla_examen");
        }
        List<Map<String, Object>> camposData = new ArrayList<>();
        for (TablaExamenCampo campo : campos) {
            Map<String, Object> campoData = new LinkedHashMap<>();
            campoData.put("id", campo.getId());
            campoData.put("campo", campo.getCampo());
            campoData.put("tabla_examen_id", campo.getTablaExamen().getId());
            camposData.add(campoData);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(camposData);
    }
    @GetMapping("/_campos/get/all/{pacienteId}")
    public ResponseEntity<?> obtenerCamposPorPaciente(@PathVariable Integer pacienteId) {
        List<TablaExamenCampo> campos = tablaExamenRepository.findByPacienteIdWithCampos(pacienteId);
        if (campos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron registros para el paciente proporcionado");
        }
        List<Map<String, Object>> camposData = new ArrayList<>();
        for (TablaExamenCampo campo : campos) {
            Map<String, Object> campoData = new LinkedHashMap<>();
            campoData.put("id", campo.getId());
            campoData.put("campo", campo.getCampo());
            campoData.put("tabla_examen_id", campo.getTablaExamen().getId());
            camposData.add(campoData);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(camposData);
    }

    @PutMapping("/put/{tablaExamenId}")
    public ResponseEntity<String> actualizarTablaExamen(@PathVariable Integer tablaExamenId,
                                                        @RequestBody List<String> nuevosValores) {
        if (nuevosValores.size() != examFields) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Debe proporcionar " + examFields + " valores");
        }
        TablaExamen tablaExamen = tablaExamenService.obtenerTablaExamenPorId(tablaExamenId);
        if (tablaExamen == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Registro no encontrado");
        }
        List<TablaExamenCampo> campos = tablaExamen.getCampos();
        if (campos.size() != nuevosValores.size()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("La cantidad de valores proporcionados no coincide con la cantidad de campos");
        }
        for (int i = 0; i < campos.size(); i++) {
            campos.get(i).setCampo(nuevosValores.get(i));
        }
        tablaExamen.setTimestamp(LocalDateTime.now());
        tablaExamenService.actualizarTablaExamen(tablaExamen);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Actualización exitosa");
    }

    @DeleteMapping("/delete/{tablaExamenId}")
    public ResponseEntity<String> eliminarTablaExamen(@PathVariable Integer tablaExamenId) {
        TablaExamen tablaExamen = tablaExamenService.obtenerTablaExamenPorId(tablaExamenId);
        if (tablaExamen == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Registro no encontrado");
        }
        tablaExamenService.eliminarTablaExamen(tablaExamen);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Eliminación exitosa");
    }
}